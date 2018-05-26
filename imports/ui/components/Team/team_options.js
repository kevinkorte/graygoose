import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './team_options.html';
import Organizations from '../../../api/Organizations/Organizations';

Template.team_options.helpers({
  getCountOfTeam() {
    let user;
    user = Meteor.user();
    if (user) {
      let org;
      org = Organizations.findOne(user.organizationId);
      if (org) {
        return org.users.length;
      }
    }
  },
  getPluralIfNeeded() {
    let user;
    user = Meteor.user();
    if (user) {
      let org;
      org = Organizations.findOne(user.organizationId);
      if (org) {
        if (org.users.length == 1) {
          return ' member'
        } else {
          return ' members'
        }
      }
    }
  }
})