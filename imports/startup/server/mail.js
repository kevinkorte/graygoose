import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function() {
  process.env.MAIL_URL = Meteor.settings.private.emailSMTP;
});

Accounts.emailTemplates.siteName = "RealTAP";
Accounts.emailTemplates.from = 'RealTAP <realtap@realtap.net>';

Accounts.emailTemplates.resetPassword.text = (user, url) => {
  return 'Hello ' + user.profile.name.first + '\n\n'
  + 'To reset your password, simply click the link below. \n\n'
  + url 
}