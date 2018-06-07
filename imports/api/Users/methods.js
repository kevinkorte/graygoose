
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

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
  enrollNewUser(email, organizationId) {
    console.log(email);
    console.log(organizationId);
    check(email, String);
    check(organizationId, String);
    let userId = new Promise((resolve, reject) => {
      let id = Accounts.createUser({
        email: email
      });
      resolve(id);
    });
    userId.then((id) => {
      console.log('org id', organizationId);
      console.log(id);
      Organization.update(organizationId, { $push: { users: id } } );
    })
  }
});