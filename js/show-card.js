'use strict';
(function () {
  var ENTER_KEY_CODE = 13;

  window.showCard = function (object, currentPin) {
    var currentObjTemplate = document.querySelector('template').content.firstElementChild.cloneNode(true);
    currentObjTemplate.querySelector('h3').textContent = object.offer.title;
    currentObjTemplate.querySelector('small').textContent = object.offer.adress;
    currentObjTemplate.querySelector('.popup__price').innerHTML = object.offer.price + '&#x20bd;/ночь';

    if (object.offer.type === 'flat') {
      currentObjTemplate.querySelector('h4').textContent = 'Квартира';
    } else if (object.offer.type === 'bungalo') {
      currentObjTemplate.querySelector('h4').textContent = 'Бунгало';
    } else {
      currentObjTemplate.querySelector('h4').textContent = 'Дом';
    }

    currentObjTemplate.querySelectorAll('p')[2].textContent = object.offer.rooms + ' комнаты для ' +
      object.offer.guests + ' гостей';

    currentObjTemplate.querySelectorAll('p')[3].textContent = 'Заезд после ' + object.offer.checkin + ',' + ' выезд до ' +
      object.offer.checkout;

    var fragmentObjFeatures = document.createDocumentFragment();
    for (var itemObjIndex = 0; itemObjIndex < object.offer.features.length; itemObjIndex++) {
      var liObjElem = document.createElement('li');
      liObjElem.classList.add('feature');
      liObjElem.classList.add('feature--' + object.offer.features[itemObjIndex]);
      fragmentObjFeatures.appendChild(liObjElem);
    }
    currentObjTemplate.querySelector('.popup__features').innerHTML = '';
    currentObjTemplate.querySelector('.popup__features').appendChild(fragmentObjFeatures);


    currentObjTemplate.querySelectorAll('p')[4].textContent = object.offer.description;

    var beforeInsertObjElement = document.querySelector('.map__filters-container');
    currentObjTemplate.querySelector('.popup__avatar').src = object.author;


    document.querySelector('.map').insertBefore(currentObjTemplate, beforeInsertObjElement);

    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('focus', function () {
      document.addEventListener('keydown', function (exit) {
        if (exit.keyCode === ENTER_KEY_CODE) {
          document.querySelector('.map__card').style.display = 'none';
          currentPin.classList.remove('map__pin--active');
        }
      });
    });
  };
})();
