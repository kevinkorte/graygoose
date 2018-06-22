import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import Showings from '../../../api/Showings/Showings';

import './single.html';

Template.single.onCreated(function() {
  this.getShowingId = () => FlowRouter.getParam('_id');

  this.autorun(() => {
    this.subscribe('singleShowing', this.getShowingId());
  })
})

Template.single.onRendered(() => {

  var uluru = {lat: 47.738783, lng: -122.338176};
  var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 17, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});
});

Template.single.helpers({
  showing() {
    return Showings.findOne();
  },
  userName(userId) {
    let user;
    user = Meteor.users.findOne(userId);
    if (user) {
      return user.profile.name.first;
    }
  }
})