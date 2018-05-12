import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';
import moment from 'moment';
import tz from 'moment-timezone';

import './payments_view.html';
import Payments from '../../../api/Payments/Payments';

Template.payments_view.onCreated(() => {
  Meteor.subscribe('user.payments');
});

Template.payments_view.helpers({
  payments() {
    return Payments.find({});
  },
  formatDate(timestamp) {
    let tz = moment.tz.guess();
    return moment.unix(timestamp).tz(tz).format("M/D/YY");
  },
  formatPrice(amount) {
    let cents = amount / 100;
    return cents.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
})