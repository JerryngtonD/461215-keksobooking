'use strict';
(function () {

  window.userInfo = {
    allFeatures: [
      'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
    ],

    itemsLength: 10,


    rangeOfCoordinatesX: {
      'from': 300,
      'to': 900
    },

    rangeOfCoordinatesY: {
      'from': 100,
      'to': 500
    },

    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],

    types: [
      'flat',
      'house',
      'bungalo'
    ],

    inTimes: [
      '12:00',
      '13:00',
      '14:00'
    ],

    outTimes: [
      '12:00',
      '13:00',
      '14:00'
    ],

    peoplePerRoom: 10,
    userObjects: []
  };

  var successHandler = function (wizards) {
    for (var i = 0; i < wizards.length; i++) {
      var userObject = {};
      userObject.author = wizards[i].author.avatar;
      userObject.offer = {
        'title': wizards[i].offer.title,
        'adress': wizards[i].offer.address,
        'price': wizards[i].offer.price,
        'type': wizards[i].offer.type,
        'rooms': wizards[i].offer.rooms,
        'guests': wizards[i].offer.guests,
        'checkin': wizards[i].offer.checkin,
        'checkout': wizards[i].offer.checkout,
        'features': wizards[i].offer.features,
        'description': wizards[i].offer.description,
        'photos': wizards[i].offer.photos
      };

      userObject.location = {
        'x': wizards[i].location.x,
        'y': wizards[i].location.y
      };

      window.userInfo.userObjects.push(userObject);
    }
  };


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.display = 'flex';
    node.style.justifyContent = 'space-around';
    node.style.backgroundColor = 'white';
    var firstInnerContent = document.createElement('div');
    firstInnerContent.innerHTML = 'Ошибка:';
    firstInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
    firstInnerContent.style.fontSize = '30px';
    var secondInnerContent = document.createElement('div');
    node.appendChild(firstInnerContent);
    node.appendChild(secondInnerContent);
    secondInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
    secondInnerContent.style.fontSize = '30px';

    secondInnerContent.innerHTML = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
