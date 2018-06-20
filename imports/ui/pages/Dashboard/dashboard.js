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