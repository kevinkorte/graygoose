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
    }
  }
})