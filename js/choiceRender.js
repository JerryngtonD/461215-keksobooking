'use strict';
(function () {

  function renderPinItem(objIndex, pins) {
    var simplePinTemplate = document.querySelector('template').content.lastElementChild.cloneNode(true);
    simplePinTemplate.classList.add('hidden');


    var pinWidth = 46;
    var pinHeight = 46 + 18;
    // var style = 'left:' + locationCoordinates[0] + 'px' + '; ' + 'top:' + locationCoordinates[0] + 'px' + ';';
    simplePinTemplate.style.left = (pins[objIndex].location.x + pinWidth / 2) + 'px';
    simplePinTemplate.style.top = (pins[objIndex].location.y + pinHeight) + 'px';
    simplePinTemplate.firstChild.src = pins[objIndex].author;

    simplePinTemplate.setAttribute('data-key', objIndex);
    return simplePinTemplate;
  }

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
