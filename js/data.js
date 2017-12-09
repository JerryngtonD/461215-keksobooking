'use strict';
(function () {
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

  window.userInfo = {
    allFeatures: [
      'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
    ],

    itemsLength: 8,
    rangeImageNumber: getNumberImages(8),


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
  for (var i = 0; i < window.userInfo.itemsLength; i++) {
    var userObject = {};

    userObject.author = {'avatar': getImageLink(window.userInfo.rangeImageNumber.splice(Math.floor(Math.random() * window.userInfo.rangeImageNumber.length), 1))};
    userObject.offer = {
      'title': window.userInfo.titles.splice(Math.floor(Math.random() * window.userInfo.titles.length), 1),
      'adress': getRandomInt(window.userInfo.rangeOfCoordinatesX.from, window.userInfo.rangeOfCoordinatesX.to) + ', '
                + getRandomInt(window.userInfo.rangeOfCoordinatesY.from, window.userInfo.rangeOfCoordinatesY.to),
      'price': getRandomInt(1000, 1000000),
      'type': window.userInfo.types[Math.floor(Math.random() * window.userInfo.types.length)],
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, getRandomInt(1, 5) * window.userInfo.peoplePerRoom),
      'checkin': window.userInfo.inTimes[Math.floor(Math.random() * window.userInfo.inTimes.length)],
      'checkout': window.userInfo.outTimes[Math.floor(Math.random() * window.userInfo.outTimes.length)],
      'features': getMeRandomElements(Object.assign([], window.userInfo.allFeatures), Math.floor(Math.random() * window.userInfo.allFeatures.length)),
      'description': '',
      'photos': []
    };

    window.userInfo.userObjects.push(userObject);
  }
})();
