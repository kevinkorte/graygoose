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
      throw new Meteor.Error('create-organization-error', "Well that's unexpected. There was an error setting up your account.");
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
      throw new Meteor.Error('set-owner-role-error', "Well that's unexpected. We encountered an error");
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
      throw new Meteor.Error('update-organization-error', "Well that's unexpected. We encountered an error")
    }
  }
})