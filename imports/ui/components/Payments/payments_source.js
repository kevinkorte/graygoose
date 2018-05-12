import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';

import './payments_source.html';
import Cards from '../../../api/Cards/Cards';

Template.payments_source.helpers({
  card() {
    return Cards.find({});
  }
})