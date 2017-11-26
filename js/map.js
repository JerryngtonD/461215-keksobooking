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
  var str = 'img/avatars/user{{xx}}.png';
  return str.replace(re, number);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var itemsLengt = 8;
var rangeImageNumber = getNumberImages(itemsLengt);


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
  'Неуютное бунгало по колено в воде',
];

for (var i = 0; i < itemsLengt; i++) {
  var numberImageLink = rangeImageNumber.splice(Math.floor(Math.random() * rangeImageNumber.length), 1);
  var imageLink = getImageLink(numberImageLink);
  var title = titles.splice(Math.floor(Math.random() * titles.length), 1);
  var x = getRandomInt(rangeOfCoordinatesX.from, rangeOfCoordinatesX.to);
  var y = getRandomInt(rangeOfCoordinatesY.from, rangeOfCoordinatesY.to);

  var location = {};
  location.x = x;
  location.y = y;
}
