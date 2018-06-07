import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import validate from 'jquery-validation';

import './new_team_modal.html';

Template.new_team_modal.onRendered(() => {

  $('#newUserForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    submitHandler: function(form) {
      event.preventDefault();
      const email = $('#email').val();
      const organizationId = Meteor.user().organizationId;
      Meteor.call('enrollNewUser', email, organizationId, (error) => {
        if (error) {
          console.log(error);
        }
      })
    }
  })

})