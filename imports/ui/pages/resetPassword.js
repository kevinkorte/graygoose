import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

import './resetPassword.html';

Template.resetPassword.onRendered(() => {
  $(document).ready(function() {
    let movementStrength = 25;
    let height = movementStrength / $(window).height();
    let width = movementStrength / $(window).width();
    $(".login-wrapper").mousemove(function(e){
      let pageX = e.pageX - ($(window).width() / 2);
      let pageY = e.pageY - ($(window).height() / 2);
      let newvalueX = width * pageX * -1 - 25;
      let newvalueY = height * pageY * -1 - 50;
      $('.login-wrapper').css("background-position", newvalueX+"px     "+newvalueY+"px");
    });
    });
});


Template.resetPassword.helpers({
  ifError() {
    if (Session.get('error')) {
      return true;
    } else {
      return;
    }
  },
  ifSuccess() {
    if (Session.get('success')) {
      return true;
    } else {
      return;
    }
  },
  readError() {
    return Session.get('error');
  },
  readSuccess() {
    return Session.get('success');
  }
});

Template.resetPassword.events({
  'submit .resetPassword'(event) {
    event.preventDefault();
    Session.set('error', null);
    Session.set('success', null);
    let email = event.target.email.value;
    Meteor.call('sendResetPasswordEmail', email, (error) => {
      if (error) {
        Session.set('error', error.reason);
      } else {
        Session.set('success', 'Success! Check your email for a link to reset your password.')
      }
    })
  }
})