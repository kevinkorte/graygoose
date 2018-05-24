import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('this.user', function() {
  return Meteor.users.find(this.userId);
});