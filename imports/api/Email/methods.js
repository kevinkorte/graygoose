import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'
import { SSR } from 'meteor/meteorhacks:ssr';
import { Accounts } from 'meteor/accounts-base';

import './templates';

Meteor.methods({
  sendVerificationEmail(userId) {
    try {
      // SSR.compileTemplate('verificationHTML', Assets.getText('email_verification.html'));

      // Email.send({
      //   to: 'kevthedev15@gmail.com',
      //   from: 'hello@realtap.com',
      //   subject: "Welcome to RealTap - Email Verification Confirmation",
      //   html: SSR.render('verificationHTML'),
      // });
      Accounts.sendVerificationEmail(userId)
    } catch (e) {
      console.log(e);
    }
  },
  sendTestEmail() {
    console.log('send test email');
    try {
      Email.send({
        to: 'kevthedev15@gmail.com',
        from: 'hello@realtap.com',
        subject: "Welcome to RealTap - Email Verification Confirmation",
        text: 'Test',
      });
    } catch (e) {
      console.log(e);
    }
  }
})