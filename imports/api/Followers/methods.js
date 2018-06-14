import { Meteor } from 'meteor/meteor';
import Followers from './Followers';

Meteor.methods({
  addNewFollower(name, phone, email) {
    Followers.insert({
      name: name,
      phoneNumber: phone,
      email: email
    });
  }
})