import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Cards from '../Cards';

Meteor.publish('user.card', () => {
  return Cards.find({});
})