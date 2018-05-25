import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import Organizations from '../../../api/Organizations/Organizations';

import './team_table.html';

Template.team_table.onRendered(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('org');
  })
})

Template.team_table.helpers({
  getAllTeamMembers() {
    let userId = Meteor.userId();
    let user = Meteor.users.findOne(userId);
    if (user) {
      let org = Organizations.findOne(user.organizationId);
      return org.users;
    }
  }
})