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
        console.log('subscribe error', e);
        throw new Meteor.Error('accounts-error', "Well that's unexpected. There was an error setting up your account.");
      });
  }
});