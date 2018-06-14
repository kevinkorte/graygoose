import { Meteor } from 'meteor/meteor';
import Organizations from './Organizations';

Meteor.methods({
  createNewOrganization() {
    try {
      let id = Organizations.insert({});
      Organizations.update(id, { $set: { ownerId: Meteor.userId() }, $push: { 'users': Meteor.userId() }} );
      return id;
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('create-organization-error', "Error");
    }
  },
  setOwnerOnOrganization(userId, organizationId) {
    try {
      Roles.addUsersToRoles(userId, ['owner', 'admin'], organizationId);
      Meteor.users.update(userId, {
        $set: {
          organizationId: organizationId
        }
      });
      Organizations.update(organizationId, { $set: { owner: userId } } );
    } catch (e) {
      throw new Meteor.Error('set-owner-role-error', "Error");
    }
  },
  updateOrganizationWithStrip(organizationId, customer, subscription) {
    try {
      Organizations.update(organizationId, { $set: {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id
      } } );
    } catch (e) {
      console.log(e);
      throw new Meteor.Error('update-organization-error', "Error")
    }
  }
})