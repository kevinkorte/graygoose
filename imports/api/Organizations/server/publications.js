import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Organizations from '../Organizations';

Meteor.publish('org', () => {
  let user = Meteor.user();
  if (user) {
    return Organizations.find({_id: user.organizationId});
  }
})