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
  selectedRoomCount.options[1].setAttribute('hidden', true);
  selectedRoomCount.options[2].setAttribute('hidden', true);
  selectedRoomCount.options[3].setAttribute('hidden', true);
  var capacity = document.querySelector('#capacity');
  capacity.addEventListener('click', function () {
    var currentCapacity = parseInt(capacity.value, 10);
    if (currentCapacity === 1) {
      resetFieldsHidden(selectedRoomCount);
      selectedRoomCount.selectedIndex = 0;
      selectedRoomCount.options[1].setAttribute('hidden', true);
      selectedRoomCount.options[2].setAttribute('hidden', true);
      selectedRoomCount.options[3].setAttribute('hidden', true);
    } else if (currentCapacity === 2) {
      resetFieldsHidden(selectedRoomCount);
      selectedRoomCount.selectedIndex = 0;
      selectedRoomCount.options[2].setAttribute('hidden', true);
      selectedRoomCount.options[3].setAttribute('hidden', true);
    } else if (currentCapacity === 3) {
      resetFieldsHidden(selectedRoomCount);
      selectedRoomCount.selectedIndex = 0;
      selectedRoomCount.options[3].setAttribute('hidden', true);
    } else if (currentCapacity === 0) {
      resetFieldsHidden(selectedRoomCount);
      selectedRoomCount.selectedIndex = 3;
      selectedRoomCount.options[0].setAttribute('hidden', true);
      selectedRoomCount.options[1].setAttribute('hidden', true);
      selectedRoomCount.options[2].setAttribute('hidden', true);
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
