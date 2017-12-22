'use strict';
(function () {
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 64;

  var renderPinItem = function (objIndex, pins) {
    var simplePinTemplate = document.querySelector('template').content.lastElementChild.cloneNode(true);
    simplePinTemplate.classList.add('hidden');


    simplePinTemplate.style.left = (pins[objIndex].location.x + PIN_WIDTH / 2) + 'px';
    simplePinTemplate.style.top = (pins[objIndex].location.y + PIN_HEIGHT) + 'px';
    simplePinTemplate.firstChild.src = pins[objIndex].author;

    simplePinTemplate.setAttribute('data-key', objIndex);
    return simplePinTemplate;
  };

  window.renderSentPins = function (pinObjects) {
    window.pinsOnMap = pinObjects;
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < pinObjects.length; index++) {
      fragment.appendChild(renderPinItem(index, pinObjects));
    }
    mapPins.appendChild(fragment);
    window.clickOnPinEvent();
  };
})();
