'use strict';
(function () {
  var TYPES_OF_DWELLING = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_PRICE_OF_DWELLING = [1000, 0, 5000, 10000];
  var STARTED_MIN_PRICE = 1000;

  var sinchronizeTime = function (timeIn, timeOut) {
    timeOut.options.selectedIndex = timeIn.options.selectedIndex;
  };

  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');

  timeInField.addEventListener('change', function () {
    window.sinchronizeField(timeInField, timeOutField, null, null, sinchronizeTime);
  });

  timeOutField.addEventListener('change', function () {
    timeInField.options.selectedIndex = timeOutField.options.selectedIndex;
  });


  var address = document.querySelector('#address');
  address.addEventListener('keydown', function (evt) {
    evt.preventDefault();
  });

  function sinchronizeTypeToPrice(elementTo, elementFrom, Places, Prices) {
    for (var i = 0; i < Places.length; i++) {
      if (elementTo.value === Places[i]) {
        elementFrom.setAttribute('min', Prices[i]);
      }
    }
  }

  var selectedTypeHabitation = document.querySelector('#type');
  var price = document.querySelector('#price');
  if (selectedTypeHabitation.value === 'flat') {
    document.querySelector('#price').setAttribute('min', STARTED_MIN_PRICE);
  }


  selectedTypeHabitation.addEventListener('change', function () {
    window.sinchronizeField(selectedTypeHabitation, price, TYPES_OF_DWELLING, MIN_PRICE_OF_DWELLING, sinchronizeTypeToPrice);
  });

  function resetFieldsHidden(someSelect) {
    var properties = someSelect.options;
    for (var i = 0; i < properties.length; i++) {
      properties[i].removeAttribute('hidden');
    }
  }

  var selectedRoomCount = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  capacity.options[0].setAttribute('hidden', true);
  capacity.options[1].setAttribute('hidden', true);
  capacity.options[3].setAttribute('hidden', true);
  selectedRoomCount.addEventListener('change', function () {
    var currentRoomCounter = parseInt(selectedRoomCount.value, 10);
    if (currentRoomCounter === 1) {
      if (parseInt(capacity.value, 10) !== 1) {
        capacity.selectedIndex = 2;
      }
      resetFieldsHidden(capacity);
      capacity.options[0].setAttribute('hidden', true);
      capacity.options[1].setAttribute('hidden', true);
      capacity.options[3].setAttribute('hidden', true);
    } else if (currentRoomCounter === 2) {
      if (parseInt(capacity.value, 10) === 0 || parseInt(capacity.value, 10) === 3) {
        capacity.selectedIndex = 2;
      }
      resetFieldsHidden(capacity);
      capacity.options[0].setAttribute('hidden', true);
      capacity.options[3].setAttribute('hidden', true);
    } else if (currentRoomCounter === 3) {
      if (parseInt(capacity.value, 10) === 0) {
        capacity.selectedIndex = 2;
      }
      resetFieldsHidden(capacity);
      capacity.options[3].setAttribute('hidden', true);
    } else if (currentRoomCounter === 100) {
      if (parseInt(capacity.value, 10) !== 3) {
        capacity.selectedIndex = 3;
      }
      resetFieldsHidden(capacity);
      capacity.options[0].setAttribute('hidden', true);
      capacity.options[1].setAttribute('hidden', true);
      capacity.options[2].setAttribute('hidden', true);
    }
  });

  var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function (evt) {
    if (address.value.length === 0) {
      evt.preventDefault();
    } else {
      address.setCustomValidity('');
      window.backend.save(new FormData(form), function () {
        form.reset();
      }, window.errorHandler);
      evt.preventDefault();
    }
  });

})();
