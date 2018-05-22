import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import Organizations from '../../api/Organizations/Organizations';
import './adminNav.html';

Template.adminNav.onRendered(() => {
  Tracker.autorun(function() { 
    Meteor.subscribe('org'); 
  });
})

Template.adminNav.helpers({
  org() {
    return Organizations.find();
  }
})