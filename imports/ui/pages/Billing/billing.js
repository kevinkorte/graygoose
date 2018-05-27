import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './billing.html';
import '../../components/Payments/payments_view.js';
import '../../components/Payments/payments_status.js';
import '../../components/Payments/payments_source';

Template.billing.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('user.payments');
  })

})