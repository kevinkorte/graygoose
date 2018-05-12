import {
  Meteor
} from 'meteor/meteor';
import Cards from './Cards';
Meteor.methods({
  saveNewCardSource(card) {
    try {
      Cards.insert({
        card
      });
    } catch (e) {
      throw new Meteor.Error('save-stripe-card-error', "Error");
    }
  }
})