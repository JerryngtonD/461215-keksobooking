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

})();
