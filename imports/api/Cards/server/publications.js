import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Cards from '../Cards';

Meteor.publish('user.card', (orgId) => {
  console.log('return card');
  return Cards.find({});
})