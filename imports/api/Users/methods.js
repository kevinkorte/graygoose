import {
  Meteor
} from 'meteor/meteor';
Meteor.methods({
  checkAndCreateAccount(email, password) {
    let user = Accounts.findUserByEmail(email);
    if (!user) {
      return;
    } else {
      throw new Meteor.Error("user-exists", "User email already exists");
    }
  }
});