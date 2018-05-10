import {
  Meteor
} from 'meteor/meteor';
import {
  Accounts
} from 'meteor/accounts-base';
import '../imports/startup/server';


Meteor.startup(() => {
  // code to run on server at startup
});

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  checkAndCreateAccount(email, password) {
    let customer = Accounts.findUserByEmail(email);
    // if (!customer) {
    //   console.log(email, password);
    let userId = Accounts.createUser({
      email: email,
      password: password
    });
    return userId;
    // } else {
    //   throw new Meteor.Error("user-exists", "User email already exists");
    // }
  },
  async createNewStripeAccount(userId, email, token) {
    let customer = await stripe.customers.create({
        email: email,
        source: token
      })
      .catch((e) => {
        throw new Meteor.Error('accounts-error', "Well that's unexpected. There was an error setting up your account.");
      });
    return customer;
  },

});

async function _createStripeCustomer(email, token) {
  let customer = await stripe.customers.create({
      email: email,
      source: token
    })
    .catch((e) => {
      console.log('create stripe customer error', e);
    });
  return customer;
}

async function _subscribeCustomerToPlan(id) {
  let subscription = await stripe.subscriptions.create({
      customer: id,
      items: [{
        plan: 'plan_CotsWo9dXPL5eZ!'
      }],
      trial_from_plan: true
    })
    .catch((e) => {
      console.log('subscribe error', e);
      throw new Error("ERRRRRRRRR");
    });
}