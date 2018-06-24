import {
  Meteor
} from 'meteor/meteor';
import Cards from './Cards';

import stripePackage from 'stripe';
stripe = stripePackage(Meteor.settings.private.stripe_test_sk);


Meteor.methods({
  saveNewCardSource(card) {
    try {
      Cards.insert({
        card
      });
    } catch (e) {
      throw new Meteor.Error('save-stripe-card-error', "Error");
    }
  },
  updateSource(token) {
    console.log('called update source');
    console.log(token);
    let user = Meteor.users.findOne(Meteor.userId());
    let cus = user.stripeCustomerId;
    if ( cus ) {
      stripe.customers.update(cus, {
        source: token.id
      }, function(err, customer) {
        // asynchronously called
      });
    } else {
      //can't find customer id
    }
  }
})