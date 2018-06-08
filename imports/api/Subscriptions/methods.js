import {
  Meteor
} from 'meteor/meteor';
import Subscriptions from './Subscriptions';
import Organization from '../Organizations/Organizations';

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
  },
  updateSubscriptionQuantity(organizationId) {
    try {
      let org;
      let sub;
      let quantity;
      quantity = Meteor.users.find({organizationId: organizationId}).count();
      if (quantity) {
        org = Organization.findOne(organizationId);
        if (org) {
          sub = Subscriptions.find({'subscription.id': org.stripeSubscriptionId}).fetch();
          if (sub) {
            stripe.subscriptionItems.update(sub[0].subscription.items.data[0].id, {
              quantity: quantity //org.users.length
            },
            function(error,subItem) {
              if (error) {
                console.log('error', error);
              } else {
              }
            })
          }
        }
      }
    } catch (e) {
      throw new Meteor.Error('update-quantity-error', e);
    }
  }
});