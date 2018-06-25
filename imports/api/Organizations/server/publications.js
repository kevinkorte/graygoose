import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Organizations from '../Organizations';

Meteor.publish('org', (org) => {
  // check(orgId, String);
    return Organizations.find({_id: org});

});

Meteor.publish('org.users', function (orgId) {
  // console.log('orgId', orgId);
  //this is for production
  return Meteor.users.find({organizationId: orgId});
  // return Meteor.users.find();
})