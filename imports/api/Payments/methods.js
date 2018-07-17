import {
  Meteor
} from 'meteor/meteor';
import Payments from './Payments';

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  savePaymentSucceededEvent(payment) {
    console.log(payment);
    try {
      Payments.insert({
        payment
      });
    } catch (e) {
      throw new Meteor.Error('save-payment-error', "Well that's unexpected. We encountered an error");
    }
  },
  async retrievePaymentEvent(id) {
    try {
      let event = stripe.events.retrieve(id, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(event);
          console.log(result);
          return result;
        }
      })
    } catch (e) {
      throw new Meteor.Error('retrieve-payment-event', "Well that's unexpected. We encountered an error");
    }
  }
});