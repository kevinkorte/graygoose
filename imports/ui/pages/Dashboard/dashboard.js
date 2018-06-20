import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import Showings from '../../../api/Showings/Showings';

import './dashboard.html';
import '../../components/Navigation/Dashboard/nav_dashboard';
import '../../components/Dashboard/card';

Template.dashboard.onRendered(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('this.user');
    Meteor.subscribe('allShowings');
  })
});

Template.dashboard.helpers({
  hasNoShowing() {
    let showing = Showings.find({});
    if (showing > 0) {
      return true;
    } else {
      return false;
    }
  },
  showings() {
    return Showings.find({});
  }
})