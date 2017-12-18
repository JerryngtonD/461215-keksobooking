'use strict';
(function () {

  window.userInfo = {
    userObjects: []
  };

  var successHandler = function (wizards) {
    for (var i = 0; i < wizards.length; i++) {
      var UserObject = {};
      UserObject.author = wizards[i].author.avatar;
      UserObject.offer = {
        'title': wizards[i].offer.title,
        'adress': wizards[i].offer.address,
        'price': wizards[i].offer.price,
        'type': wizards[i].offer.type,
        'rooms': wizards[i].offer.rooms,
        'guests': wizards[i].offer.guests,
        'checkin': wizards[i].offer.checkin,
        'checkout': wizards[i].offer.checkout,
        'features': wizards[i].offer.features,
        'description': wizards[i].offer.description,
        'photos': wizards[i].offer.photos
      };

      UserObject.location = {
        'x': wizards[i].location.x,
        'y': wizards[i].location.y
      };

      window.userInfo.userObjects.push(UserObject);
    }
    window.pinsOnMap = window.userInfo.userObjects;
    window.renderSentPins(window.userInfo.userObjects);
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.display = 'flex';
    node.style.justifyContent = 'space-around';
    node.style.backgroundColor = 'white';
    var firstInnerContent = document.createElement('div');
    firstInnerContent.innerHTML = 'Ошибка:';
    firstInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
    firstInnerContent.style.fontSize = '30px';
    var secondInnerContent = document.createElement('div');
    node.appendChild(firstInnerContent);
    node.appendChild(secondInnerContent);
    secondInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
    secondInnerContent.style.fontSize = '30px';

    secondInnerContent.innerHTML = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(successHandler, window.errorHandler);
})();
