import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Showings from '../Showings';

Meteor.publish('allShowings', () => {
  console.log('all showings');
  return Showings.find({});
});

Meteor.publish('singleShowing', function(id) {
  console.log('id = ',id);
  return Showings.find({_id: id});
});