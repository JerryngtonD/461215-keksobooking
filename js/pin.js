'use strict';
(function () {


  var mapSimilarPins = document.querySelectorAll('.map__pin');
  window.pinsActions = {
    setActivePins: function changeVisiblePins(switchFlag) {
      for (var pinIdx = 0; pinIdx < mapSimilarPins.length; pinIdx++) {
        if (mapSimilarPins[pinIdx].classList.contains('map__pin--main') && pinIdx === mapSimilarPins.length - 1) {
          continue;
        } else if (mapSimilarPins[pinIdx].classList.contains('map__pin--main')) {
          continue;
        } else {
          if (switchFlag) {
            mapSimilarPins[pinIdx].style.display = 'none';
          } else {
            mapSimilarPins[pinIdx].style.display = 'block';
          }
        }
      }
    }
  };
})();
