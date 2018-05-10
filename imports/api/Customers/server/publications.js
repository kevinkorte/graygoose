import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Customers from '../Customers';


Meteor.publish('customers', () => {
  return Customers.find({});
});

Meteor.publish('users', () => {
  return Meteor.users.find();
});