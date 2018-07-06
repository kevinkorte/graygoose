
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
  },
  makeUserAdmin(user) {
    try {
      Roles.addUsersToRoles(user._id, 'admin', user.organizationId);
      Roles.removeUsersFromRoles(user._id, 'member', user.organizationId);
    } catch (e) {
      throw new Meteor.Error('make-user-admin-error', "Error");
    }
  },
  removeUserAdmin(user) {
    try {
      Roles.addUsersToRoles(user._id, 'member', user.organizationId);
      Roles.removeUsersFromRoles(user._id, 'admin', user.organizationId);
    } catch (e) {
      throw new Meteor.Error('remove-user-admin-error', "Error");
    }
  },
  sendResetPasswordEmail(email) {
    check(email, String);
    console.log(email);
    try {
      let user = Accounts.findUserByEmail(email);
      Accounts.sendResetPasswordEmail(user._id, email);
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('send-reset-password-email', "There was an error trying to send you a password reset email. Check that your email address is correct.");
    }
  }
});