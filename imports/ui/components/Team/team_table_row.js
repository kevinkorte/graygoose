import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './team_table_row.html';

Template.team_table_row.onRendered(() => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  Meteor.subscribe('org.users', {orgId: Meteor.user().organizationId});
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
        return 'member'
      }
    }
  },
  hasNotRegistered() {
    return true;
  }
});

Template.team_table_row.events({
  'click #revokeInvite'(event) {
    let id = $(event.target).data('id');
    Meteor.call('revokeUserInvite', id, (error) => {
      if (error) {
        console.log(error);
      } else {
        Meteor.call('updateSubscriptionQuantity', Meteor.user().organizationId);
      }
    })
  }
})