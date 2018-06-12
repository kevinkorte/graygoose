import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import flatpickr from "flatpickr";

import './new.html';

Template.new.onRendered(() => {
  let startDate = $('#start').flatpickr({
    minDate: 'today',
    altInput: true,
    enableTime: true,
    onChange: function(selectedDates, dateStr, instance) {
      endDate.set('minDate', Date.parse(selectedDates[0]));
      Session.set('startDate', selectedDates[0]);
    }
  });
  let endDate = $('#end').flatpickr({
    minDate: 'today',
    altInput: true,
    enableTime: true,
    onChange: function(selectedDates, dateStr, instance) {
      startDate.set('maxDate', Date.parse(selectedDates[0]));
    }
  });
  let input = document.getElementById('address');
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace();
    console.log(place);
  })
})