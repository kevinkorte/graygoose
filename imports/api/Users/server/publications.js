import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('this.user', function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('org.users', function (orgId) {
  //this is for production
  // return Meteor.users.find({organizationId: orgId});
  return Meteor.users.find();
})