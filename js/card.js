'use strict';
(function () {
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
    for (var p = 0; p < window.userInfo.userObjects.length; p++) {
      if (window.userInfo.userObjects[p].author.avatar === linkElement) {
        certainObj = window.userInfo.userObjects[p];
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
})();
