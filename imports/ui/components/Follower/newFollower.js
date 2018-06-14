import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import validate from 'jquery-validation';
import 'jquery-mask-plugin';
import 'jquery-validation/dist/additional-methods.js';
import './newFollower.html';

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
    submitHandler: function(form) {
      console.log(form);
      event.preventDefault();
    }
  })

})