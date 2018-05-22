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

Meteor.publish('user.subscription', () => {
  console.log(this.userId);
  let user = Meteor.users.findOne(this.userId);
  console.log(user);
  let subId = user.stripeSubscriptionId;
  return Subscriptions.find({ 'subscription.id': subId });
})