import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import flatpickr from "flatpickr";
import Organizations from '../../../api/Organizations/Organizations';
import Followers from '../../../api/Followers/Followers';

import './new.html';
import '../../components/Follower/newFollower.js';

Template.new.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('followers');
  })
})

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
  });
  $(document).ready(function() {
    $('#followers').select2({
      placeholder: 'Select followers'
    });
  });

  $('#newShowing').validate({
    rules: {
      start: {
        required: true
      },
      end: {
        required: true
      },
      address: {
        required: true
      }
    },
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    submitHandler: function(form) {
      event.preventDefault();
      const category = $('#category').val();
      const start = $('#start').val();
      const end = $('#end').val();
      const address = $('#address').val();
      const placeName = $('#placeName').val();
      const formattedAddress = $('#formattedAddress').val();
      const formattedPhoneNumber = $('#formattedPhoneNumber').val();
      const website = $('#website').val();
      const lat = $('#lat').val();
      const lng = $('#lng').val();
      const followers = $('#followers').val();
      const personOne = $('#personOne').val();
      const personTwo = $('#personTwo').val();
      const theirAddress = $('#theirAddress').val();
      

    }
  });

});

Template.new.helpers({
  getMyFollowers() {
    let user;
    user = Meteor.user();
    if (user != undefined && user.organizationId) {
      let followersArray = [];
      let org = Organizations.findOne(user.organizationId);
      let colleagueArray = org.users;
      // let array = [{"_id": "123", "name": "Kevin"}];
      let array = [];
      colleagueArray.forEach((colleague) => {
        let user = Meteor.users.findOne(colleague);
        array.push({"_id": user._id, "name": user.profile.name.first});
      });
      let followers = Followers.find({});
      followers.forEach((follower) => {
        array.push({"_id": follower._id, "name": follower.name});
      })
      return array;
    }
  },
  getFollower(id) {
    let user = Meteor.users.findOne(id);
    return user;
  },
  getTestFollower() {
    return Followers.find({});
  }
});

Template.new.events({
  'click #showing-btn'(event) {
    $('#open-house-btn').removeClass('active');
    $('.hide-on-open-house').removeClass('d-none');
    $('#category').val('showing');
  },
  'click #open-house-btn'(event) {
    $('#showing-btn').removeClass('active');
    $('.hide-on-open-house').addClass('d-none');
    $('#category').val('open house');
  },
})