import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import Showings from '../../../api/Showings/Showings';

import './single.html';

Template.single.onCreated(function() {
  this.getShowingId = () => FlowRouter.getParam('_id');
  this.getFounderId = () => FlowRouter.getParam('user');
  this.autorun(() => {
    this.subscribe('singleShowing', this.getShowingId());
    this.subscribe('founding.user', this.getFounderId());
  })
})

Template.single.onRendered(function() {
  
  GoogleMaps.load({key: 'AIzaSyApmcx3wYJTdoVMjbWtpf3QWu17FnsUodU', libraries: 'places'});
  this.getShowingId = () => FlowRouter.getParam('_id');
   // We can use the `ready` callback to interact with the map API once the map is ready.
   GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      animation: google.maps.Animation.DROP
    });
  });
});

Template.single.helpers({
  showing() {
    return Showings.findOne();
  },
  userName(userId) {
    console.log({userId});
    console.log(Meteor.users.findOne(userId));
    let user;
    user = Meteor.users.findOne(userId);
    if (user) {
      console.log(user);
      return user.profile.name.first;
    }
  },
  exampleMapOptions: function() {
    if (GoogleMaps.loaded()) {
      let showing;
      showing = Showings.findOne(FlowRouter.getParam('_id'));
      if (showing.lat && showing.lng) {
        return {
          center: new google.maps.LatLng(showing.lat, showing.lng),
          zoom: 17
        }
      }
    }
  }
})