import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './single.html';

Template.single.onRendered(() => {
  var uluru = {lat: 47.738783, lng: -122.338176};
  var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 17, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});
})