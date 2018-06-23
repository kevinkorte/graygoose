import {
  Meteor
} from 'meteor/meteor';
import {
  Template
} from 'meteor/templating';

import './payments_source.html';
import Cards from '../../../api/Cards/Cards';

const stripe = Stripe(Meteor.settings.public.stripe_test_pk);
const elements = stripe.elements();

Template.payments_source.onRendered(() => {
  const style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
    },
  };
  window.card = elements.create('card', {style});

  card.addEventListener('change', ({error}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Create a token or display an error when the form is submitted.
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $('#modal-body').addClass('modal-waiting');

    const {token, error} = await stripe.createToken(card);

    if (error) {
      // Inform the customer that there was an error
      const errorElement = document.getElementById('card-errors');
      errorElement.textContent = error.message;
    } else {
      // Send the token to your server
      // stripeTokenHandler(token);
      stripeTokenHandler(token);
    }
  });

  const stripeTokenHandler = (token) => {
    // Insert the token ID into the form so it gets submitted to the server
      Meteor.call('updateSource', token, function(error, response) {
        if ( error ) {
          console.log(error.reason);
        } else {
          $('#payment-modal').modal('hide');
          $('#modal-body').removeClass('modal-waiting');
        }
      });
    // form.submit(function(event) {
    //   event.preventDefault();
    //   let target = event.target;
    //   let token = target.stripeToken.value;
    //   Meteor.call('updateSource', token, function(error, response) {
    //     if ( error ) {
    //       console.log(error.reason);
    //     } else {
    //       $('#payment-modal').modal('hide');
    //       $('#modal-body').removeClass('modal-waiting');
    //     }
    //   });
    // });
  }

  $('#payment-modal').on('show.bs.modal', function (e) {
    card.mount('#card-element');
  });
  $('#payment-modal').on('hidden.bs.modal', function (e) {
    card.unmount('#card-element');
  });

})

Template.payments_source.helpers({
  card() {
    return Cards.find({});
  }
})