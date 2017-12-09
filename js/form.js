'use strict';
(function () {


  var timeInField = document.querySelector('#timein');
  var timeOutField = document.querySelector('#timeout');
  timeInField.addEventListener('change', function () {
    timeOutField.options.selectedIndex = timeInField.options.selectedIndex;
  });

  timeOutField.addEventListener('change', function () {
    timeInField.options.selectedIndex = timeOutField.options.selectedIndex;
  });

  var selectedTypeHabitation = document.querySelector('#type');
  if (selectedTypeHabitation.value === 'flat') {
    document.querySelector('#price').setAttribute('min', 1000);
  }
  selectedTypeHabitation.addEventListener('change', function () {
    var minPrice = document.querySelector('#price');
    if (selectedTypeHabitation.value === 'flat') {
      minPrice.setAttribute('min', 1000);
    } else if (selectedTypeHabitation.value === 'bungalo') {
      minPrice.setAttribute('min', 0);
    } else if (selectedTypeHabitation.value === 'house') {
      minPrice.setAttribute('min', 5000);
    } else if (selectedTypeHabitation.value === 'palace') {
      minPrice.setAttribute('min', 10000);
    }
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
})();
