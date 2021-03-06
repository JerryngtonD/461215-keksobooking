'use strict';
(function () {

  window.currentChoosenFeatures = [];
  window.notChangePins = [];

  function getIntersectionElems(first, second) {
    var intersectionPins = [];
    if (first.length === 0 && second.length !== 0) {
      return second;
    } else if (first.length !== 0 && second.length === 0) {
      return first;
    } else if (first.length === 0 && second.length === 0) {
      return intersectionPins;
    } else {
      for (var i = 0; i < first.length; i++) {
        for (var j = 0; j < second.length; j++) {
          if (JSON.stringify(first[i]) === JSON.stringify(second[j])) {
            intersectionPins.push(first[i]);
            break;
          }
        }
      }
    }
    return intersectionPins;
  }


  var compareTypeDwelling = function () {
    var typeDwelling = document.querySelector('#housing-type');
    var comparedSetObjects = [];
    for (var i = 0; i < window.userInfo.userObjects.length; i++) {
      if (typeDwelling.options[typeDwelling.selectedIndex].value.toString() === window.userInfo.userObjects[i].offer.type.toString()) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      }
    }
    return comparedSetObjects;
  };

  var comparePriceDwelling = function () {
    var price = document.querySelector('#housing-price');
    var filterPrice = price.options[price.selectedIndex].value;
    var comparedSetObjects = [];
    for (var i = 0; i < window.userInfo.userObjects.length; i++) {
      if (filterPrice === 'middle' && (window.userInfo.userObjects[i].offer.price >= 10000 && window.userInfo.userObjects[i].offer.price <= 50000)) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterPrice === 'low' && window.userInfo.userObjects[i].offer.price < 10000) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterPrice === 'high' && window.userInfo.userObjects[i].offer.price >= 50000) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterPrice === 'any') {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      }
    }
    return comparedSetObjects;
  };

  var compareRoomsDwelling = function () {
    var rooms = document.querySelector('#housing-rooms');
    var filterRooms = rooms.value;
    var comparedSetObjects = [];
    for (var i = 0; i < window.userInfo.userObjects.length; i++) {

      if (filterRooms === '1' && window.userInfo.userObjects[i].offer.rooms === 1) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterRooms === '2' && window.userInfo.userObjects[i].offer.rooms === 2) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterRooms === '3' && window.userInfo.userObjects[i].offer.rooms === 3) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterRooms === 'any') {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      }
    }
    return comparedSetObjects;
  };

  var compareGuestsDwelling = function () {
    var guests = document.querySelector('#housing-guests');
    var filterGuests = guests.value;
    var comparedSetObjects = [];
    for (var i = 0; i < window.userInfo.userObjects.length; i++) {

      if (filterGuests === '1' && window.userInfo.userObjects[i].offer.guests === 1) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterGuests === '2' && window.userInfo.userObjects[i].offer.guests === 2) {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      } else if (filterGuests === 'any') {
        comparedSetObjects.push(window.userInfo.userObjects[i]);
      }
    }
    return comparedSetObjects;
  };

  /*  var compareFeature = function (feature) {
    var comparedSetObject = [];
    if (window.currentChoosenFeatures.length !== 0) {
      for (var i = 0; i < window.userInfo.userObjects.length; i++) {
        if ((window.userInfo.userObjects[i].offer.features).includes(feature)) {
          comparedSetObject.push(window.userInfo.userObjects[i]);
          window.notChangePins.push(window.userInfo.userObjects[i].offer.title);
        }
      }
    }
    return comparedSetObject;
  };*/


  /*
  var compareFeature = function (feature) {
    var comparedSetObject = [];
    if (window.currentChoosenFeatures.length !== 0) {
      for (var i = 0; i < window.userInfo.userObjects.length; i++) {
        if ((window.userInfo.userObjects[i].offer.features).includes(feature)) {
          comparedSetObject.push(window.userInfo.userObjects[i]);
          window.notChangePins.push(window.userInfo.userObjects[i].offer.title);
        } else if (window.notChangePins.includes(window.userInfo.userObjects[i].offer.title)) {
          comparedSetObject.push(window.userInfo.userObjects[i]);
        } else {
          var indexElemToRemove = window.notChangePins.indexOf(window.userInfo.userObjects[i].offer.title);
          window.notChangePins.splice(indexElemToRemove, 1);
        }
      }
    }
    return comparedSetObject;
  };
*/


  var compareFeature = function (feature) {
    var comparedSetObject = [];
    if (window.currentChoosenFeatures.length !== 0) {
      for (var i = 0; i < window.userInfo.userObjects.length; i++) {
        if ((window.userInfo.userObjects[i].offer.features).includes(feature)) {
          comparedSetObject.push(window.userInfo.userObjects[i]);
          window.notChangePins.push(window.userInfo.userObjects[i].offer.title);
        }
      }
    }
    return comparedSetObject;
  };


  var compareSetFeatures = function () {
    if (window.currentChoosenFeatures.length !== 0) {
      var tempArr = [];
      for (var j = 0; j < window.currentChoosenFeatures.length; j++) {
        tempArr = getIntersectionElems(tempArr, compareFeature(window.currentChoosenFeatures[j]));
      }
      return tempArr;
    } else {
      return [];
    }
  };

  var rerender = function () {

    var popupClose = document.querySelector('.map__card');
    if (popupClose) {
      popupClose.remove();
    }

    var needToDeleteNodes = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < needToDeleteNodes.length; i++) {
      needToDeleteNodes[i].parentNode.removeChild(needToDeleteNodes[i]);
    }

    var compareType = compareTypeDwelling();
    var comparePrice = comparePriceDwelling();
    var compareRooms = compareRoomsDwelling();
    var compareGuests = compareGuestsDwelling();
    var Feature = compareSetFeatures();


    var comparedPins = getIntersectionElems(compareType, comparePrice);
    comparedPins = getIntersectionElems(comparedPins, compareRooms);
    comparedPins = getIntersectionElems(comparedPins, compareGuests);
    comparedPins = getIntersectionElems(comparedPins, Feature);

    window.renderSentPins(comparedPins);
    var allHiddenPins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < allHiddenPins.length; j++) {
      allHiddenPins[j].classList.remove('hidden');
    }
  };

  var update = function () {
    window.debounce(rerender);
  };

  var typeDwelling = document.querySelector('#housing-type');
  typeDwelling.addEventListener('change', function () {
    update();
  });

  var price = document.querySelector('#housing-price');
  price.addEventListener('change', function () {
    update();
  });

  var rooms = document.querySelector('#housing-rooms');
  rooms.addEventListener('change', function () {
    update();
  });

  var guests = document.querySelector('#housing-guests');
  guests.addEventListener('change', function () {
    update();
  });

  function filterOnFeature(objectFeature) {
    objectFeature.addEventListener('click', function (event) {
      if (event.target.hasAttribute('isActive')) {
        event.target.removeAttribute('isActive');
        var indexElemToDel = window.currentChoosenFeatures.indexOf(event.target.value);
        window.currentChoosenFeatures.splice(indexElemToDel, 1);
      } else {
        event.target.setAttribute('isActive', 'yes');
        window.currentChoosenFeatures.push(event.target.value);
      }
      update();

    });
  }

  var wifiFeature = document.querySelector('#filter-wifi');
  var dishWasherFeature = document.querySelector('#filter-dishwasher');
  var parkingFeature = document.querySelector('#filter-parking');
  var washer = document.querySelector('#filter-washer');
  var elevator = document.querySelector('#filter-elevator');
  var conditioner = document.querySelector('#filter-conditioner');

  filterOnFeature(wifiFeature);
  filterOnFeature(dishWasherFeature);
  filterOnFeature(parkingFeature);
  filterOnFeature(washer);
  filterOnFeature(elevator);
  filterOnFeature(conditioner);


})();
