import { Meteor } from 'meteor/meteor';
import Followers from '../Followers';

Meteor.publish('followers', () => {
  return Followers.find({});
})