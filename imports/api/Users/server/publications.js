import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('this.user', function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('org.users', function (orgId) {
  console.log(orgId);
  // check(orgId, String);
  // console.log(Meteor.users.find({organizationId: orgId}));
  return Meteor.users.find({organizationId: orgId});
})