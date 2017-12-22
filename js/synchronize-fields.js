'use strict';
(function () {
  window.synchronizeField = function (elementFrom, elementTo, elementsFromValue, elementsToValue, functionSynchronize) {
    if (typeof functionSynchronize === 'function') {
      functionSynchronize(elementFrom, elementTo, elementsFromValue, elementsToValue);
    }
  };
})();
