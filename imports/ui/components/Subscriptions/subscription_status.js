import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import moment from 'moment';

import './subscription_status.html';
import Subscriptions from '../../../api/Subscriptions/Subscriptions';
import Organization from '../../../api/Organizations/Organizations';
import Cards from '../../../api/Cards/Cards';

Template.subscription_status.onCreated( function() {
  let user;
  user = Meteor.users.findOne(Meteor.userId());
  if (typeof user != undefined) {
    console.log("USER", user);
    console.log("TYPE OF", typeof user);
    console.log('ORG ID =======', Meteor.user());
    this.autorun(() => {
      this.subscribe('this.subscription');
      this.subscribe('org.users', {});
    })
  }
  
});

Template.subscription_status.onRendered( function() {
  console.log('Org Id', Meteor.user());
})

Template.subscription_status.helpers({
  getSubscriptionStatus() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub = Subscriptions.findOne();
      return sub.subscription.status;
    }

  },
  getSubscriptionStatusText() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub = Subscriptions.findOne();
      return sub.subscription.status;
    }
  },
  getSubscriptionRenewalDate() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub = Subscriptions.findOne();
      // return sub.subscription.current_period_end;
      let time = moment.unix(sub.subscription.current_period_end)
      return moment(time).format("M/D/YY");
    }
  },
  getCountOfTeam() {
    let user;
    user = Meteor.user();
    if (user) {

      return Meteor.users.find({ organizationId: user.organizationId }).count();
    }
  },
  getPaymentBrand() {
    let user;
    let org;
    let card;
    user = Meteor.user();
    if (user) {
      org = Organization.findOne(user.organizationId);
      if (org) {
        card = Cards.find({'card.data.object.customer': org.stripeCustomerId}).fetch();
        return card[0].card.data.object.brand;
      }
    }
  },
  getPaymentLast4() {
    let user;
    let org;
    let card;
    user = Meteor.user();
    if (user) {
      org = Organization.findOne(user.organizationId);
      if (org) {
        card = Cards.find({'card.data.object.customer': org.stripeCustomerId}).fetch();
        return card[0].card.data.object.last4;
      }
    }
  }
})