import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import validate from 'jquery-validation';
import 'jquery-mask-plugin';
import 'jquery-validation/dist/additional-methods.js';
import './newFollower.html';

Template.newFollower.onCreated(() => {

})

Template.newFollower.onRendered(() => {
  $('#followerPhone').mask('(000) 000 - 0000', {
    placeholder: "(   )   -    "
  });

  $('#addNewFollower').validate({
    rules: {
      followerName: {
        required: true
      },
      followerPhone: {
        phoneUS: true
      },
      followerEmail: {
        email: true
      }
    },
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    submitHandler: function(form) {
      event.preventDefault();
      const name = $('#followerName').val();
      const phone = $('#followerPhone').val();
      const email = $('#followerEmail').val();
      console.log(name, phone, email);
      Meteor.call('addNewFollower', name, phone, email, (error) => {
        if (error) {
          console.log(error);
        } else {
          //Close the modal here
        }
      })
    }
  })

})