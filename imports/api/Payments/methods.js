import {
  Meteor
} from 'meteor/meteor';
import Payments from './Payments';

Meteor.methods({
  savePaymentSucceededEvent(payment) {
    try {
      Payments.insert({
        payment
      });
    } catch (e) {
      throw new Meteor.Error('save-payment-error', "Error");
    }
  }
});