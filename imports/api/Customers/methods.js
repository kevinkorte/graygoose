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
      .catch((e) => {
        console.error(e);
        throw new Meteor.Error('stripe-customer-error', "Well that's unexpected. There was an error setting up your account.");
      });
    return customer;
  },
  saveStripeCustomer(customer) {
    console.log('save stripe customer', customer)
    try {
      Customers.insert({
        customer
      });
    } catch (e) {
      throw new Meteor.Error('save-stripe-customer-error', "Well that's unexpected. There was an error setting up your account.");
    }
  },
  updateLocalUserAccountWithStripeId(userId, customer) {
    try {
      Meteor.users.update({
        _id: userId
      }, {
        $set: {
          stripeCustomerId: customer.id
        }
      });
    } catch (e) {
      throw new Meteor.Error('update-user-account-w-stripe-id', "Well that's unexpected. There was an error setting up your account.");
    }
  }
});