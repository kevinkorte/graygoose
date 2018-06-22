import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import Showings from '../../../api/Showings/Showings';

import './dashboard.html';
import '../../components/Navigation/Dashboard/nav_dashboard';
import '../../components/Dashboard/card';

Template.dashboard.onCreated( function() {
  this.autorun(() => {
    this.subscribe('this.user');
    this.subscribe('allShowings');
  })
});

Template.dashboard.onRendered(() => {

});


Template.dashboard.helpers({
  hasNoShowing() {
    let showing = 0;
    showing = Showings.find({});
    if (showing.count() > 0) {
      return false;
    } else {
      return true;
    }
  },
  showings() {
    return Showings.find({});
  }
})