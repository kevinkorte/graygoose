import {
  Meteor
} from "meteor/meteor";
import Customers from "./Customers";

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  async createStripeCustomer(email, token) {
    let customer = await stripe.customers.create({
        email: email,
        source: token
      })
      .then(customer => {
        Customers.insert({
          customer
        });
      })
      .catch((e) => {
        console.error(e);
        throw new Meteor.Error('stripe-customer-error', "Well that's unexpected. There was an error setting up your account.");
      });
    return customer;
  },
});