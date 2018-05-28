import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './dashboard.html';
import '../../components/Navigation/Dashboard/nav_dashboard';
import '../../components/Dashboard/card';

Template.dashboard.onRendered(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('this.user');
  })
});