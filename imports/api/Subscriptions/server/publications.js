import {
  Meteor
} from 'meteor/meteor';
import {
  check
} from 'meteor/check';
import Subscriptions from '../Subscriptions';

Meteor.publish('subs', () => {
  return Subscriptions.find();
});