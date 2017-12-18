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


  var selectedRoomCount = document.querySelector('#room_number');
  selectedRoomCount.addEventListener('change', function () {
    var capacity = document.querySelector('#capacity');
    var previousCapacity = parseInt(capacity.value, 10);
    var selectedRooms = parseInt(selectedRoomCount.options[selectedRoomCount.selectedIndex].value, 10);
    if (selectedRooms === 1) {
      if (previousCapacity === 1) {
        capacity.value = 1;
      } else {
        previousCapacity = 1;
        capacity.value = previousCapacity;
      }
    } else if (selectedRooms === 2) {
      if (previousCapacity === 1) {
        capacity.value = 1;
      } else if (previousCapacity === 2) {
        capacity.value = 2;
      } else {
        previousCapacity = Math.floor(Math.random() * 2) + 1;
        capacity.value = previousCapacity;
      }
    } else if (selectedRooms === 3) {
      if (parseInt(previousCapacity, 10) === 1) {
        capacity.value = 1;
      } else if (parseInt(previousCapacity, 10) === 2) {
        capacity.value = 2;
      } else if (parseInt(previousCapacity, 10) === 3) {
        capacity.value = 3;
      } else {
        previousCapacity = Math.floor(Math.random() * 3) + 1;
        capacity.value = previousCapacity;
      }
    } else if (selectedRooms === 100) {
      previousCapacity = 0;
      capacity.value = previousCapacity;
    }
  });


  var Price = document.querySelector('#price');

  Price.addEventListener('invalid', function () {
    if (Price.validity.rangeUnderflow) {
      Price.setCustomValidity('Минимальная стоимость ниже заявленной');
    } else {
      Price.setCustomValidity('');
    }
    if (Price.validity.rangeOverflow) {
      Price.setCustomValidity('Превышена максимальная стоимость');
    } else {
      Price.setCustomValidity('');
    }
  });

  function checkConnectionRoomsToCapacity(roomsCount, capacity) {
    if (roomsCount === 1 && capacity !== 1) {
      return false;
    } else if (roomsCount === 2 && (capacity !== 1 || capacity !== 2)) {
      return false;
    } else if (roomsCount === 3 && capacity === 0) {
      return false;
    } else if (roomsCount === 100 && capacity !== 0) {
      return false;
    } else {
      return true;
    }
  }

  var capacity = document.querySelector('#capacity');
  capacity.addEventListener('change', function () {
    var selectedRooms = parseInt(selectedRoomCount.options[selectedRoomCount.selectedIndex].value, 10);
    var capacityRooms = parseInt(capacity.value, 10);
    if (checkConnectionRoomsToCapacity(selectedRooms, capacityRooms) === false) {
      capacity.setCustomValidity('Нарушена численность людей');
    } else {
      capacity.setCustomValidity('');
    }
    selectedRoomCount.addEventListener('change', function () {
      var newSelectedRooms = parseInt(selectedRoomCount.options[selectedRoomCount.selectedIndex].value, 10);
      if (checkConnectionRoomsToCapacity(newSelectedRooms, capacityRooms) === false) {
        capacity.setCustomValidity('Нарушена численность людей');
      } else {
        capacity.setCustomValidity('');
      }
    });
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
