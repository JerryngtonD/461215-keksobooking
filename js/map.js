'use strict';

(function () {

  window.pinsActions.setActivePins(true);

  var form = document.querySelector('.notice__form--disabled');
  var disabledAreas = form.querySelectorAll('fieldset');
  for (var j = 0; j < disabledAreas.length; j++) {
    disabledAreas[j].setAttribute('disabled', true);
  }

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('click', function () {
    document.querySelector('.map').classList.remove('map--faded');
    for (var idx = 0; idx < disabledAreas.length; idx++) {
      disabledAreas[idx].removeAttribute('disabled');
    }
    window.pinsActions.setActivePins(false);
    form.classList.remove('notice__form--disabled');
  });


  var pinsOnMap = document.querySelectorAll('.map__pin--main');
  var adressId = document.querySelector('#address');
  // На случай, если двигать придется редактировать пины с адресами
  // var pinsOnMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var pinIndex = 0; pinIndex < pinsOnMap.length; pinIndex++) {
    pinsOnMap[pinIndex].addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var currentPin = evt.target.closest('.map__pin');
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if ((currentPin.offsetTop - shift.y) > 100 && (currentPin.offsetTop - shift.y) < 500) {
          currentPin.style.top = (currentPin.offsetTop - shift.y) + 'px';
        }
        currentPin.style.left = (currentPin.offsetLeft - shift.x) + 'px';

        adressId.value = 'x:' + (parseInt(currentPin.style.left, 10) + 31) + ', ' + 'y:' + (parseInt(currentPin.style.top, 10) + 84);
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
