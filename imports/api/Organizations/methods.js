import {
  Meteor
} from 'meteor/meteor';
import Organizations from './Organizations';

Meteor.methods({
  createNewOrganization() {
    try {
      Organizations.insert({});
    } catch (e) {
      throw new Meteor.Error('create-organization-error', "Error");
    }
  },
  setOwnerOnOrganization(userId, organizationId) {
    try {
      Roles.addUsersToRoles(userId, ['owner', 'admin'], organizationId);
    } catch (e) {
      throw new Meteor.Error('set-owner-role-error', "Error");
    }
  }
})