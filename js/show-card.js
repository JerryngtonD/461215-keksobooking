'use strict';


window.showCard = function (obj, currentPin) {

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
        currentPin.classList.remove('map__pin--active');
      }
    });
  });
};
