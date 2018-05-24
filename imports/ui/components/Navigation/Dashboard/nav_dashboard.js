import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './nav_dashboard.html';

Template.nav_dashboard.helpers({
  canSeeAdminMenu() {
    let user = Meteor.user();
    if (user) {
      let orgId = user.organizationId;
      if (Roles.userIsInRole(user._id, 'admin', user.organizationId)) {
        return true;
      } else {
        return false;
      }
    }
  }
})