import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import './card.html';
import { isMoment } from 'moment';

Template.card.helpers({
  date(date) {
    let timestamp = moment(date);
    let timezone = moment.tz.guess();
    return timestamp.tz(timezone).format('M/D/YY');
  },
  time(date) {
    let timestamp = moment(date);
    let timezone = moment.tz.guess();
    return timestamp.tz(timezone).format('h:mm a');
  }
})