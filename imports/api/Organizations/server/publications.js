import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Organizations from '../Organizations';

Meteor.publish('org', () => {
  return Organizations.find({});
})