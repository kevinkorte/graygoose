import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './subscription_status.html';
import Subscriptions from '../../../api/Subscriptions/Subscriptions';

Template.subscription_status.onRendered(() => {
    Tracker.autorun(() => {
      Meteor.subscribe('user.subscription');
    })
  
});

Template.subscription_status.helpers({
  getSubscriptionStatus() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub = Subscriptions.findOne();
      return sub.subscription.status;
    }

  },
  getSubscriptionStatusText() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub = Subscriptions.findOne();
      return sub.subscription.status;
    }

  }
})