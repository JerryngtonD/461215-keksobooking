'use strict';
(function () {
  var MIN_TOP_COORDINATE = 100;
  var MAX_BOTTOM_COORDINATE = 500;

  window.pinsActions.setActivePins(true);
  var form = document.querySelector('.notice__form--disabled');
  var disabledAreas = form.querySelectorAll('fieldset');
  for (var j = 0; j < disabledAreas.length; j++) {
    disabledAreas[j].setAttribute('disabled', true);
  }

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('click', function () {
    document.querySelector('.map').classList.remove('map--faded');

    var allHiddenPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < allHiddenPins.length; i++) {
      allHiddenPins[i].classList.remove('hidden');
    }

    for (var idx = 0; idx < disabledAreas.length; idx++) {
      disabledAreas[idx].removeAttribute('disabled');
    }
    window.pinsActions.setActivePins(false);
    form.classList.remove('notice__form--disabled');
  });

  var pinsOnMap = document.querySelectorAll('.map__pin--main');
  var addressId = document.querySelector('#address');
  for (var pinIndex = 0; pinIndex < pinsOnMap.length; pinIndex++) {
    pinsOnMap[pinIndex].addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var currentPin = evt.target.closest('.map__pin');

      var StartCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var Shift = {
          x: StartCoords.x - moveEvt.clientX,
          y: StartCoords.y - moveEvt.clientY
        };

        StartCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if ((currentPin.offsetTop - Shift.y) >= MIN_TOP_COORDINATE && (currentPin.offsetTop - Shift.y) <= MAX_BOTTOM_COORDINATE) {
          currentPin.style.top = (currentPin.offsetTop - Shift.y) + 'px';
        }
        currentPin.style.left = (currentPin.offsetLeft - Shift.x) + 'px';

        addressId.value = 'x:' + (parseInt(currentPin.style.left, 10)) + ', ' + 'y:' + (parseInt(currentPin.style.top, 10));
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
})();
