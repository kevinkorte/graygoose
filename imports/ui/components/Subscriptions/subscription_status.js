import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './subscription_status.html';

Template.subscription_status.onRendered(() => {
    Tracker.autorun(() => {
      Meteor.subscribe('user.subscription');
    })
  
});

Template.subscription_status.helpers({
  getSubscriptionStatus() {
  }
})