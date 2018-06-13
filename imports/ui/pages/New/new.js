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
    $('#placeName').val(place.name);
    $('#formattedAddress').val(place.formatted_address);
    $('#formattedPhoneNumber').val(place.formatted_phone_number);
    $('#website').val(place.website);
    $('#lat').val(place.geometry.location.lat());
    $('#lng').val(place.geometry.location.lng());
    console.log(place);
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17
    });
    map.setCenter(place.geometry.location);
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    marker.addListener('dragend', (event) => {
      $('#lat').val(event.latLng.lat());
      $('#lng').val(event.latLng.lng());
    })
  })
})