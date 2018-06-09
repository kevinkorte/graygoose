import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.from = 'hello@realtap.com';
Accounts.emailTemplates.siteName = 'RealTap';
Accounts.emailTemplates.verifyEmail = {
  subject() {
    "Welcome! Email verification for RealTap"
  },
  html(user, url) {
    SSR.compileTemplate('verificationHTML', Assets.getText('email_verification.html'));
    return SSR.render('verificationHTML', user, url);
  }
}