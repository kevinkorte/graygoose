import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';

import './subscription_status.html';
import Subscriptions from '../../../api/Subscriptions/Subscriptions';
import Organization from '../../../api/Organizations/Organizations';
import Cards from '../../../api/Cards/Cards';

Template.subscription_status.onCreated( function() {
  

    

    this.autorun(() => {
  let user = Meteor.user();
  if (user != undefined) {
    this.subscribe('org.users', {orgId: user.organizationId});
    this.subscribe('org', {orgId: user.organizationId});
    this.subscribe('user.subscription');
    this.subscribe('user.card', {orgId: user.organizationId});
  }
      
      
    })

  
});

Template.subscription_status.onRendered( function() {
  console.log('Org Id', Meteor.user());
})

Template.subscription_status.helpers({
  getSubscriptionStatus() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub;
      sub = Subscriptions.findOne();
      if (sub) {
        return sub.subscription.status;
      }
    }
  },
  getSubscriptionStatusText() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub;
      sub = Subscriptions.findOne();
      if (sub) {
        return sub.subscription.status;
      }
    }
  },
  getSubscriptionRenewalDate() {
    let user;
    user = Meteor.user();
    if (user) {
      let sub;
      sub = Subscriptions.findOne();
      if (sub) {
      // return sub.subscription.current_period_end;
      let time = moment.unix(sub.subscription.current_period_end)
      return moment(time).format("M/D/YY");
      }
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
        console.log(org);
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