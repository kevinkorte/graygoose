import {
  Meteor
} from "meteor/meteor";
import {
  Template
} from "meteor/templating";
import {
  Accounts
} from 'meteor/accounts-base'

import zxcvbn from 'zxcvbn';
import validate from 'jquery-validation';

import "./signup_form.html";
import Customers from "../../api/Customers/Customers";
import Subscriptions from "../../api/Subscriptions/Subscriptions";
import { format } from "path";

const stripe = Stripe(Meteor.settings.public.stripe_test_pk);
const elements = stripe.elements();

Template.signup_form.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('customers');
    Meteor.subscribe('users');
    Meteor.subscribe('subs');
  })

})


Template.signup_form.onRendered(() => {

  

  // Custom styling can be passed to options when creating an Element.
  const style = {
    base: {
      // Add your base input styles here. For example:
      // fontSize: '16px',
      // color: "#32325d",
    },
  };

  // Create an instance of the card Element.
  const card = elements.create('card', {
    style
  });

  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
      $('#signup-submit-btn').attr('disabled', 'disabled');
    } else {
      displayError.textContent = '';
      $('#signup-submit-btn').removeAttr('disabled', 'disabled');
    }
  });


  $('#signup').validate({
    rules: {
      firstName: {
        required: true
      },
      lastName: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    submitHandler: function(form) {
      event.preventDefault();

      console.log('SUBMIT', form);
      console.log('EVENT', event);
      test();

      async function test() {
        const {token,error} = await stripe.createToken(card);
        if (error) {
          // Inform the customer that there was an error.
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = error.message;
        } else {
          // Send the token to your server.
          stripeTokenHandler(token);
        }
      }

  const stripeTokenHandler = (token) => {
    // Insert the token ID into the form so it gets submitted to the server
    const form = document.getElementById('signup');
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('id', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    const email = $('#email').val();
    const password = $("#password").val();
    const firstname = $('#first-name').val();
    const lastname = $('#last-name').val();
    token = $("#stripeToken").val();
    Meteor.call('checkAndCreateAccount', email, password, (error, userId) => {
      if (error) {
        console.error(error);
      } else {
        Accounts.createUser({
          email: email,
          password: password,
          profile: {
            name: {
              first: firstname,
              last: lastname
            }
          }
        }, (error) => {
          if (error) {
            console.log(error);
          } else {
            let userId = Meteor.userId();
                Meteor.call('createNewOrganization', (error, organizationId) => {
                  if (error) {
                    console.log(error);
                  } else {
                    Meteor.call('setOwnerOnOrganization', userId, organizationId, (error) => {
                      if (error) {
                        console.log(error);
                      } else {
                        Meteor.call('createStripeCustomer', email, token, (error, customer) => {
                          if (error) {
                            console.error("error", error);
                          } else {
                            Meteor.call('saveStripeCustomer', customer, (error, result) => {
                              if (error) {
                                console.log(error);
                              } else {
                                Meteor.call('updateLocalUserAccountWithStripeId', userId, customer, (error) => {
                                  if (error) {
                                    console.log(error);
                                  } else {
                                    Meteor.call('subscribeCustomerToPlan', customer.id, (error, subscription) => {
                                      if (error) {
                                        console.log(error)
                                      } else {
                                        console.log(result);
                                        Meteor.call('saveSubscription', subscription, (error) => {
                                          if (error) {
                                            console.log(error);
                                          } else {
                                            Meteor.call('updateLocalUserAccountWithStripeSub', userId, subscription, (error) => {
                                              if (error) {
                                                console.log(error);
                                              } else {
                                                Meteor.call('updateOrganizationWithStrip', organizationId, customer, subscription, (error) => {
                                                  if (error) {
                                                    console.log(error);
                                                  } else {
                                                    FlowRouter.go("dashboard");
                                                  }
                                                } )
                                              }
                                            })
                                          }
                                        })
                                      }
                                    })
                                  }
                                })
                              }
                            })
                          }
                        });
                      }
                    })
                  }
                })
              
            
          }
        });
      }
    });
  }
  }
});

})

Template.signup_form.events({
  'keyup #password'(event) {
    let helper = zxcvbn(event.target.value);
    $('#password-suggestion').text(helper.feedback.warning);
    if (helper.score == 0) {
      $('#strength').removeClass('strength-1 strength-2 strength-3 strength-4').addClass('strength-0');
    } else if (helper.score == 1) {
      $('#strength').removeClass('strength-0 strength-2 strength-3 strength-4').addClass('strength-1');
    } else if (helper.score == 2) {
      $('#strength').removeClass('strength-0 strength-1 strength-3 strength-4').addClass('strength-2');
    } else if (helper.score == 3) {
      $('#strength').removeClass('strength-0 strength-1 strength-2 strength-4').addClass('strength-3');
    } else if (helper.score == 4) {
      $('#strength').removeClass('strength-0 strength-1 strength-2 strength-3').addClass('strength-4');
    }
  }
});

Template.signup_form.helpers({
  customers() {
    return Customers.find({});
  },
  users() {
    return Meteor.users.find({});
  },
  subs() {
    return Subscriptions.find();
  }
})