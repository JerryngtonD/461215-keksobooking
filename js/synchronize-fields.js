'use strict';
(function () {
  window.sinchronizeField = function (elementFrom, elementTo, elementsFromValue, elementsToValue, functionSinchronize) {
    if (typeof functionSinchronize === 'function') {
      functionSinchronize(elementFrom, elementTo, elementsFromValue, elementsToValue);
    }
  };
})();
