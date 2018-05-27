import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './team_table_row.html';

Template.team_table_row.onRendered(() => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
})

Template.team_table_row.helpers({
  getUser(id) {
    return Meteor.users.findOne(id);
  },
  getUserRoleBadge(userId) {
    let user;
    user = Meteor.users.findOne(userId);
    if (user) {
      if (Roles.userIsInRole(userId, 'owner', user.organizationId)) {
        return 'owner'
      } else if (Roles.userIsInRole(userId, 'admin', user.organizationId)) {
        return 'admin'
      } else {
        return 'team member'
      }
    }


  }
})