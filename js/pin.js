'use strict';
(function () {
  function renderPinItem(objIndex) {
    var simplePinTemplate = document.querySelector('template').content.lastElementChild.cloneNode(true);
    var locationCoordinates = window.userInfo.userObjects[objIndex].offer.adress.split(',');

    var pinWidth = 46;
    var pinHeight = 46 + 18;
    // var style = 'left:' + locationCoordinates[0] + 'px' + '; ' + 'top:' + locationCoordinates[0] + 'px' + ';';
    simplePinTemplate.style.left = (parseInt(locationCoordinates[0], 10) + pinWidth / 2) + 'px';
    simplePinTemplate.style.top = (parseInt(locationCoordinates[1], 10) + pinHeight) + 'px';
    simplePinTemplate.firstChild.src = window.userInfo.userObjects[objIndex].author.avatar;

    return simplePinTemplate;
  }

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var index = 0; index < window.userInfo.userObjects.length; index++) {
    fragment.appendChild(renderPinItem(index));
  }
  mapPins.appendChild(fragment);

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