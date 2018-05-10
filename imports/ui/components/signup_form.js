import {
  Meteor
} from "meteor/meteor";
import {
  Template
} from "meteor/templating";

import "./signup_form.html";
import Customers from "../../api/Customers/Customers";

const stripe = Stripe(Meteor.settings.public.stripe_test_pk);
const elements = stripe.elements();

Template.signup_form.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('customers');
    Meteor.subscribe('users');
  })

})


Template.signup_form.onRendered(() => {

  // Custom styling can be passed to options when creating an Element.
  const style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
    },
  };

  // Create an instance of the card Element.
  const card = elements.create('card', {
    style
  });

  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');

  card.addEventListener('change', ({
    error
  }) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });

  const form = document.getElementById('signup');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      token,
      error
    } = await stripe.createToken(card);

    if (error) {
      // Inform the customer that there was an error.
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(token);
    }
  });

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
    const email = $('#exampleInputEmail1').val();
    const password = $("#exampleInputPassword1").val();
    token = $("#stripeToken").val();
    Meteor.call('checkAndCreateAccount', email, password, (error, userId) => {
      if (error) {
        console.error(error);
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
                    Meteor.call
                  }
                })
              }
            })
            // Meteor.call('subscribeCustomerToPlan', customer.id, (error) => {
            //   if (error) {
            //     console.error(error);
            //   }
            // })
          }
        });
      }
    });

  }


})

Template.signup_form.events({

});

Template.signup_form.helpers({
  customers() {
    return Customers.find({});
  },
  users() {
    return Meteor.users.find({});
  }
})