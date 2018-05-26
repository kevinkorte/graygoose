import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './team_table_row.html';

Template.team_table_row.helpers({
  getUser(id) {
    return Meteor.users.findOne(id);
  },
  role() {
    console.log('get role');
  }
})