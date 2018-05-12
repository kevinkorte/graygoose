import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Payments from '../Payments';

Meteor.publish('user.payments', () => {
  console.log('check');
  return Payments.find({});
})