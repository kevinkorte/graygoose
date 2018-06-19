import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Showings from '../Showings';

Meteor.publish('allShowings', () => {
  return Showings.find({});
})