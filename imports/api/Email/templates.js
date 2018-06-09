import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.from = 'hello@realtap.com';
Accounts.emailTemplates.siteName = 'RealTap';
Accounts.emailTemplates.verifyEmail = {
  subject(user) {
    return 'Welcome ${user.profile.name.first}! Email verification for RealTap';
  },
  html(user, url) {
    SSR.compileTemplate('verificationHTML', Assets.getText('email_verification.html'));
    const data = Object.assign({url: url}, user);
    return SSR.render('verificationHTML', data);
  }
}