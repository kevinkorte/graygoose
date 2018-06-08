
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

import stripePackage from 'stripe';
const stripe = stripePackage(Meteor.settings.private.stripe_test_sk);

import Organization from '../Organizations/Organizations';

Meteor.methods({
  checkAndCreateAccount(email, password) {
    let user = Accounts.findUserByEmail(email);
    if (!user) {
      return;
    } else {
      throw new Meteor.Error("user-exists", "User email already exists");
    }
  },
  enrollNewUser(email, firstName, lastName, organizationId) {
    check(email, String);
    check(organizationId, String);
    check(firstName, String);
    check(lastName, String);
    let userId = new Promise((resolve, reject) => {
      let id = Accounts.createUser({
        email: email
      });
      resolve(id);
    });
    userId.then((id) => {
      Meteor.users.update(id, { $set: {
        'profile.name.first': firstName,
        'profile.name.last': lastName,
        organizationId: organizationId
      }});
      Organization.update(organizationId, { $push: { users: id } } );
      Meteor.call('updateSubscriptionQuantity', organizationId);
    })
  },
  revokeUserInvite(id) {
    try {
      Meteor.users.remove(id);
    } catch (e) {
      throw new Meteor.Error('revoke-user-error', "Error");
    }
  }
});