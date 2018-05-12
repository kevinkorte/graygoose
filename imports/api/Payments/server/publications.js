import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Payments from '../Payments';

Meteor.publish('users.payments', () => {
  return Payments.find({});
})