import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Customers from '../Customers';
import Organizations from '../../Organizations/Organizations';


Meteor.publish('customers', () => {
  return Customers.find({});
});

Meteor.publish('users', () => {
  return Meteor.users.find();
});
