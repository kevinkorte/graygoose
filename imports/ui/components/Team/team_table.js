import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import Organizations from '../../../api/Organizations/Organizations';

import './team_table.html';
import './team_table_row.js';
import '../Navigation/Dashboard/nav_admin';

Template.team_table.onRendered(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('org');
  })
})

Template.team_table.helpers({
  getAllTeamMembers() {
    let user;
    user = Meteor.user();
    if (user) {
      let org;
      org = Organizations.findOne(user.organizationId);
      if (org) {
        return org.users;
      }
    }
  }
})