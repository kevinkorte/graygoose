import {
  Meteor
} from 'meteor/meteor';
import {
  Accounts
} from 'meteor/accounts-base'

Meteor.startup(() => {
  // code to run on server at startup
});

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  doesCustomerExistsByEmail(email, password) {
    let customer = Accounts.findUserByEmail(email);
    if (!customer) {
      console.log(email, password);
      let userId = Accounts.createUser({
        email: email,
        password: password
      });
      return userId;
    } else {
      throw new Meteor.Error("user-exists", "User email already exists");
    }
  },
  async createNewOwnerAccount(userId, email, token) {
    try {
      _createStripeCustomer(email, token)
        .then(customer => _subscribeCustomerToPlan(customer.id))
        .then(subscription => _saveSubscription(subscription))
    } catch (exception) {
      console.error(exception);
      throw new Meteor.Error('accounts-error', "We'll that's unexpected. There was an error setting up your account.");
    }
  },
});

async function _createStripeCustomer(email, token) {
  let customer = await stripe.customers.create({
    email: email,
    source: token
  });
}

async function _subscribeCustomerToPlan(id) {
  let subscription = await stripe.subscriptions.create({
    customer: id,
    items: [{
      plan: 'plan_CotsWo9dXPL5eZ'
    }],
    trial_from_plan: true
  });
}