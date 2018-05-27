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

Meteor.publish('user.subscription', function() {
  let user;
  user = Meteor.users.findOne(this.userId);
  if (user) {
    let subId = user.stripeSubscriptionId;
    return Subscriptions.find({ 'subscription.id': subId });
  }
})