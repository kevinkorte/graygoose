import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('this.user', function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('founding.user', function(id) {
  return Meteor.users.find(id);
});