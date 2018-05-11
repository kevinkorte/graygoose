import {
  Meteor
} from 'meteor/meteor';
import Subscriptions from './Subscriptions';

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  async subscribeCustomerToPlan(id) {
    let subscription = await stripe.subscriptions.create({
        customer: id,
        items: [{
          plan: 'plan_CotsWo9dXPL5eZ'
        }],
        trial_from_plan: true
      })
      .catch((e) => {
        throw new Meteor.Error('accounts-error', "Well that's unexpected. There was an error setting up your account.");
      });
    return subscription;
  },
  saveSubscription(subscription) {
    try {
      Subscriptions.insert({
        subscription
      });
    } catch (e) {
      throw new Meteor.Error('save-stripe-customer-error', "Well that's unexpected. There was an error setting up your account.");
    }
  },
  updateLocalUserAccountWithStripeSub(userId, subscription) {
    try {
      Meteor.users.update({
        _id: userId
      }, {
        $set: {
          stripeSubscriptionId: subscription.id
        }
      });
    } catch (e) {
      throw new Meteor.Error('update-user-account-w-stripe-sub', "Well that's unexpected. There was an error setting up your account.");
    }
  }
});