import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  createNewOwnerAccount(email, token) {
    try {
      _createStripeCustomer(email, token)
        .then(customer => _subscribeCustomerToPlan(customer.id))
        .catch((error) => {
          console.log(error);
          // throw new Meteor.Error("error", "ERROR!");
        });
    } catch (e) {
      console.log(e);
      throw new Meteor.Error(500, "ERROR!");
    }

  }
});

async function _createStripeCustomer(email, token) {
  let customer = await stripe.customers.create({
    email: email,
    source: token
  }).catch((err) => {
    return Promise.reject(new Meteor.Error("create-customer", "We encountered an error."));
  });
  return customer;
}

async function _subscribeCustomerToPlan(id) {
  let sub = await stripe.subscriptions.create({
    customer: id,
    items: [{
      plan: 'plan_CotsWo9dXPL5eZ!'
    }],
    trial_from_plan: true
  }).catch((err) => {
    return Promise.reject(new Meteor.Error("subscribe-customer-to-plan", "We encountered an error."));
  });
}