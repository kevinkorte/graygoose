import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

Meteor.methods({
  createNewOwnerAccount(email, token) {
    console.log('called new owner method');
    _createStripeCustomer(email, token)
    .then((customer) => {
      console.log('cus',customer);
    })
    .catch(( error ) => {
      //deal with an error here
    });
  }
});

async function _createStripeCustomer(email) {
  let customer = await stripe.customers.create(
    {
      email: email,
      source: token
    }
  );
  return customer;
}


