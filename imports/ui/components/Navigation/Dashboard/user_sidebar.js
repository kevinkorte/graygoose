import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './user_sidebar.html';

Template.user_sidebar.helpers({
  getUserInitials() {
    let userId = Meteor.userId();
    let user = Meteor.users.findOne(userId);
    if ( user ) {
      if ( user.profile.name.first) {
        let first = user.profile.name.first;
        let last = user.profile.name.last;
        let f = first.charAt(0);
        let l = last.charAt(0);
        return f + l;
      }
    } else {
      return null;
    }
  },
  getUserName() {
    let userId = Meteor.userId();
    let user = Meteor.users.findOne(userId);
    if ( user ) {
      if ( user.profile.name.first) {
        return user.profile.name.first + ' ' + user.profile.name.last;
      }
    }
  },
  getPrimaryUserEmail() {
    let userId = Meteor.userId();
    let user = Meteor.users.findOne(userId);
    if ( user ) {
      if ( user.emails[0].address ) {
        return user.emails[0].address;
      }
    }
  },
  getUserRoleBadge() {
    let userId = Meteor.userId();
    let user = Meteor.users.findOne(userId);
    if ( user ) {
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