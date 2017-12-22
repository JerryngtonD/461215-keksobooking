'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var addActiveState = function (pinObj) {
    pinObj.classList.add('map__pin--active');
  };

  var removeActiveState = function (pinObj) {
    pinObj.classList.remove('map__pin--active');
  };

  var findElemOnLink = function (object) {
    var certainObject;
    var aboutElement = object.getAttribute('data-key');
    for (var p = 0; p < window.pinsOnMap.length; p++) {
      if (p === parseInt(aboutElement, 10)) {
        certainObject = window.pinsOnMap[p];
        break;
      }
    }
    return certainObject;
  };

  window.clickOnPinEvent = function () {
    var pinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var currentPin = 0;
    for (var pinIndex = 0; pinIndex < pinItems.length; pinIndex++) {
      pinItems[pinIndex].addEventListener('click', function (clickedPin) {
        if (currentPin === 0) {
          currentPin = clickedPin.currentTarget;
          addActiveState(currentPin);
          window.showCard(findElemOnLink(currentPin), currentPin);
          document.addEventListener('keydown', function (eventEsc) {
            if (eventEsc.keyCode === ESCAPE_KEY_CODE) {
              document.querySelector('.map__card').style.display = 'none';
              removeActiveState(currentPin);
            }
          });
          var popup = document.querySelector('.popup__close');
          popup.addEventListener('focus', function () {
            document.addEventListener('keydown', function (exit) {
              if (exit.keyCode === ENTER_KEY_CODE) {
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
          window.showCard(findElemOnLink(currentPin), currentPin);
          var popupClose = document.querySelector('.popup__close');
          popupClose.addEventListener('click', function () {
            document.querySelector('.map__card').style.display = 'none';
            removeActiveState(currentPin);
          });
        }
      });


      pinItems[pinIndex].addEventListener('focus', function (focusedPin) {
        document.addEventListener('keydown', function (activatedKey) {
          if (activatedKey.keyCode === ENTER_KEY_CODE) {
            if (currentPin === 0) {
              currentPin = focusedPin.target;
              addActiveState(currentPin);
              window.showCard(findElemOnLink(currentPin), currentPin);
              document.addEventListener('keydown', function (eventEsc) {
                if (eventEsc.keyCode === ESCAPE_KEY_CODE) {
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
              window.showCard(findElemOnLink(currentPin), currentPin);
              document.querySelectorAll('.map__card')[0].remove();
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

  };

})();
