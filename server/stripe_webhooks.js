import bodyParser from 'body-parser';
import {
  Picker
} from 'meteor/meteorhacks:picker';

Picker.middleware(bodyParser.json());

Picker.route('/stripe', (params, request, response, next) => {
  const webhook = new Promise((resolve, reject) => {
    switch (request.body.type) {
      case 'invoice.payment_succeeded':
        Meteor.call('savePaymentSucceededEvent', request.body, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            resolve("200 OK invoice.payment_succeeded");
          }
        });
        break;
      case 'customer.source.created':
        Meteor.call('saveNewCardSource', request.body, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            resolve("200 OK customer.source.created");
          }
        });
        break;
    }
  })
  webhook.then((result) => {
    response.statusCode = 200;
    response.end(result);
  })
})