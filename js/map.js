'use strict';

function getNumberImages(numberOfLinks) {
  var linkImages = [];
  for (var j = 1; j <= numberOfLinks; j++) {
    linkImages.push('0' + j);
  }
  return linkImages;
}

function getImageLink(number) {
  var re = /xx/gi;
  var str = 'img/avatars/userxx.png';
  return str.replace(re, number);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getMeRandomElements = function (sourceArray, neededElements) {
  var result = [];
  for (var i = 0; i < neededElements; i++) {
    var insertElement = sourceArray.splice(Math.floor(Math.random() * sourceArray.length), 1);
    result.push(insertElement);
  }
  return result;
};

var allFeatures = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
];

var itemsLength = 8;
var rangeImageNumber = getNumberImages(itemsLength);


var rangeOfCoordinatesX = {
  'from': 300,
  'to': 900
};

var rangeOfCoordinatesY = {
  'from': 100,
  'to': 500
};

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'flat',
  'house',
  'bungalo'
];

var inTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var outTimes = [
  '12:00',
  '13:00',
  '14:00'
];
var peoplePerRoom = 10;

var userObjects = [];
for (var i = 0; i < itemsLength; i++) {
  var userObject = {};

  userObject.author = {'avatar': getImageLink(rangeImageNumber.splice(Math.floor(Math.random() * rangeImageNumber.length), 1))};
  userObject.offer = {
    'title': titles.splice(Math.floor(Math.random() * titles.length), 1),
    'adress': getRandomInt(rangeOfCoordinatesX.from, rangeOfCoordinatesX.to) + ', ' + getRandomInt(rangeOfCoordinatesY.from, rangeOfCoordinatesY.to),
    'price': getRandomInt(1000, 1000000),
    'type': types[Math.floor(Math.random() * types.length)],
    'rooms': getRandomInt(1, 5),
    'guests': getRandomInt(1, getRandomInt(1, 5) * peoplePerRoom),
    'checkin': inTimes[Math.floor(Math.random() * inTimes.length)],
    'checkout': outTimes[Math.floor(Math.random() * outTimes.length)],
    'features': getMeRandomElements(Object.assign([], allFeatures), Math.floor(Math.random() * allFeatures.length)),
    'description': '',
    'photos': []
  };

  userObjects.push(userObject);
}

function renderPinItem(objIndex) {
  var simplePinTemplate = document.querySelector('template').content.lastElementChild.cloneNode(true);
  var locationCoordinates = userObjects[objIndex].offer.adress.split(',');

  var pinWidth = 46;
  var pinHeight = 46 + 18;
  // var style = 'left:' + locationCoordinates[0] + 'px' + '; ' + 'top:' + locationCoordinates[0] + 'px' + ';';
  simplePinTemplate.style.left = (parseInt(locationCoordinates[0], 10) + pinWidth / 2) + 'px';
  simplePinTemplate.style.top = (parseInt(locationCoordinates[1], 10) + pinHeight) + 'px';
  simplePinTemplate.firstChild.src = userObjects[objIndex].author.avatar;

  return simplePinTemplate;
}

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var index = 0; index < userObjects.length; index++) {
  fragment.appendChild(renderPinItem(index));
}
mapPins.appendChild(fragment);

var form = document.querySelector('.notice__form--disabled');
var disabledAreas = form.querySelectorAll('fieldset');
for (var j = 0; j < disabledAreas.length; j++) {
  disabledAreas[j].setAttribute('disabled', true);
}

var mapSimilarPins = document.querySelectorAll('.map__pin');
function changeVisiblePins(switchFlag) {
  for (var pinIdx = 0; pinIdx < mapSimilarPins.length; pinIdx++) {
    if (mapSimilarPins[pinIdx].classList.contains('map__pin--main') && pinIdx === mapSimilarPins.length - 1) {
      continue;
    } else if (mapSimilarPins[pinIdx].classList.contains('map__pin--main')) {
      continue;
    } else {
      if (switchFlag) {
        mapSimilarPins[pinIdx].style.display = 'none';
      } else {
        mapSimilarPins[pinIdx].style.display = 'block';
      }
    }
  }
}
changeVisiblePins(true);

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('click', function () {
  document.querySelector('.map').classList.remove('map--faded');
  for (var idx = 0; idx < disabledAreas.length; idx++) {
    disabledAreas[idx].setAttribute('disabled', false);
  }
  changeVisiblePins(false);
  form.classList.remove('notice__form--disabled');
});

var addActiveState = function (pinObj) {
  pinObj.classList.add('map__pin--active');
};

var removeActiveState = function (pinObj) {
  pinObj.classList.remove('map__pin--active');
};

function changePopupDescription(obj) {
  var currentObjTemplate = document.querySelector('template').content.firstElementChild.cloneNode(true);
  currentObjTemplate.querySelector('h3').innerHTML = obj.offer.title;
  currentObjTemplate.querySelector('small').innerHTML = obj.offer.adress;
  currentObjTemplate.querySelector('.popup__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';

  if (obj.offer.type === 'flat') {
    currentObjTemplate.querySelector('h4').innerHTML = 'Квартира';
  } else if (obj.offer.type === 'bungalo') {
    currentObjTemplate.querySelector('h4').innerHTML = 'Бунгало';
  } else {
    currentObjTemplate.querySelector('h4').innerHTML = 'Дом';
  }

  currentObjTemplate.querySelectorAll('p')[2].innerHTML = obj.offer.rooms + ' комнаты для ' +
    obj.offer.guests + ' гостей';

  currentObjTemplate.querySelectorAll('p')[3].innerHTML = 'Заезд после ' + obj.offer.checkin + ',' + ' выезд до ' +
    obj.offer.checkout;

  var fragmentObjFeatures = document.createDocumentFragment();
  for (var itemObjIndex = 0; itemObjIndex < obj.offer.features.length; itemObjIndex++) {
    var liObjElem = document.createElement('li');
    liObjElem.classList.add('feature');
    liObjElem.classList.add('feature--' + obj.offer.features[itemObjIndex]);
    fragmentObjFeatures.appendChild(liObjElem);
  }
  currentObjTemplate.querySelector('.popup__features').innerHTML = '';
  currentObjTemplate.querySelector('.popup__features').appendChild(fragmentObjFeatures);


  currentObjTemplate.querySelectorAll('p')[4].innerHTML = obj.offer.description;

  var beforeInsertObjElement = document.querySelector('.map__filters-container');
  currentObjTemplate.querySelector('.popup__avatar').src = obj.author.avatar;


  document.querySelector('.map').insertBefore(currentObjTemplate, beforeInsertObjElement);
  // document.querySelectorAll('.map__card')[0].remove();

  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', function (exit) {
      if (exit.keyCode === 13) {
        document.querySelector('.map__card').style.display = 'none';
        removeActiveState(currentPin);
      }
    });
  });

}

function findElemOnLink(obj) {
  var certainObj;
  var linkElement = obj.firstElementChild.getAttribute('src');
  for (var p = 0; p < userObjects.length; p++) {
    if (userObjects[p].author.avatar === linkElement) {
      certainObj = userObjects[p];
      break;
    }
  }
  return certainObj;
}

var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var currentPin = 0;
for (var pinIndex = 0; pinIndex < pinItems.length; pinIndex++) {
  pinItems[pinIndex].addEventListener('click', function (clickedPin) {
    if (currentPin === 0) {
      currentPin = clickedPin.currentTarget;
      addActiveState(currentPin);
      changePopupDescription(findElemOnLink(currentPin));
      document.addEventListener('keydown', function (eventEsc) {
        if (eventEsc.keyCode === 27) {
          document.querySelector('.map__card').style.display = 'none';
          removeActiveState(currentPin);
        }
      });
      var popup = document.querySelector('.popup__close');
      popup.addEventListener('focus', function () {
        document.addEventListener('keydown', function (exit) {
          if (exit.keyCode === 13) {
            document.querySelector('.map__card').style.display = 'none';
            removeActiveState(currentPin);
          }
        });
      });

      popup.addEventListener('click', function () {
        document.querySelector('.map__card').style.display = 'none';
        removeActiveState(currentPin);
      });

    } else {
      removeActiveState(currentPin);
      currentPin = clickedPin.currentTarget;
      addActiveState(currentPin);
      document.querySelectorAll('.map__card')[0].remove();
      changePopupDescription(findElemOnLink(currentPin));
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        document.querySelector('.map__card').style.display = 'none';
        removeActiveState(currentPin);
      });
    }
  });


  pinItems[pinIndex].addEventListener('focus', function (focusedPin) {
    document.addEventListener('keydown', function (activatedKey) {
      if (activatedKey.keyCode === 13) {
        if (currentPin === 0) {
          currentPin = focusedPin.target;
          addActiveState(currentPin);
          changePopupDescription(findElemOnLink(currentPin));
          document.addEventListener('keydown', function (eventEsc) {
            if (eventEsc.keyCode === 27) {
              document.querySelector('.map__card').style.display = 'none';
              removeActiveState(currentPin);
            }
          });

          var popupClose = document.querySelector('.popup__close');
          popupClose.addEventListener('click', function () {
            document.querySelector('.map__card').style.display = 'none';
            removeActiveState(currentPin);
          });
        } else {
          removeActiveState(currentPin);
          currentPin = focusedPin.target;
          addActiveState(currentPin);
          document.querySelectorAll('.map__card')[0].remove();
          changePopupDescription(findElemOnLink(currentPin));
          var popup = document.querySelector('.popup__close');
          popup.addEventListener('click', function () {
            document.querySelector('.map__card').style.display = 'none';
            removeActiveState(currentPin);
          });
        }
      }
    });
  });

}

