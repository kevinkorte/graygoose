import { Accounts } from 'meteor/accounts-base';

import '../../ui/layouts/App_home.html';
import "../../ui/pages/main.js";
import '../../ui/pages/adminNav.js';
import '../../ui/pages/Dashboard/dashboard';
import '../../ui/pages/Team/team';
import '../../ui/pages/Billing/billing';
import '../../ui/pages/New/new';
import '../../ui/pages/Single/single';
import '../../ui/pages/login';
import '../../ui/pages/resetPassword';
import '../../ui/pages/setNewPassword';


FlowRouter.route('/signup', {
  triggersEnter: function (context, params) {
    $('body').addClass('signup');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('signup');
  },
  name: "signup",
  action: function () {
    BlazeLayout.render("main");
  }
});

FlowRouter.route('/login', {
  triggersEnter: function (context, params) {
    $('body').addClass('login');
    $('html').addClass('login');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('login');
    $('html').removeClass('login');
  },
  name: 'login',
  action: function() {
    BlazeLayout.render('login');
  }
});

FlowRouter.route('/reset-password', {
  triggersEnter: function (context, params) {
    $('body').addClass('login');
    $('html').addClass('login');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('login');
    $('html').removeClass('login');
  },
  name: 'resetPassword',
  action: function() {
    BlazeLayout.render('resetPassword');
  }
});


FlowRouter.route('/dashboard', {
  name: "dashboard",
  triggersEnter: function (context, params) {
    $('body').addClass('light-background');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('light-background');
  },
  action: function () {
    BlazeLayout.render("App.home", { template: 'dashboard' });
  }
});

FlowRouter.route('/dashboard/billing', {
  name: "billing",
  triggersEnter: function (context, params) {
    $('body').addClass('light-background');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('light-background');
  },
  action: function () {
    BlazeLayout.render("App.home", {
      template: "billing"
    });
  }
});

FlowRouter.route('/dashboard/team', {
  name: 'team',
  triggersEnter: function (context, params) {
    $('body').addClass('light-background');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('light-background');
  },
  action: function () {
    BlazeLayout.render("App.home", {
      template: "team"
    });
  }
})

FlowRouter.route('/new', {
  name: 'new',
  triggersEnter: function (context, params) {
    $('body').addClass('light-background');
  },
  triggersExit: function (context, params) {
    $('body').removeClass('light-background');
  },
  action: function () {
    BlazeLayout.render("App.home", {
      template: "new"
    });
  }
});

FlowRouter.route('/:user/:_id', {
  name: 'single',
  action: function () {
    BlazeLayout.render("App.home", {
      template: "single"
    });
  }
});

FlowRouter.route('/set-new-password', {
  name: 'setNewPassword',
  action: function() {
    BlazeLayout.render('setNewPassword');
  }
});

Accounts.onEmailVerificationLink( function(token, done) {
  Accounts.verifyEmail(token, (error) => {
    if (error) {
      console.log(error);
    } else {
      done();
      FlowRouter.go('dashboard');
    }
  });
});

Accounts.onResetPasswordLink( ( token, done ) => {
  FlowRouter.go('setNewPassword');
  Template.setNewPassword.events({
    'submit #js-password-reset-form'(event) {
      event.preventDefault();
      const password = event.target.password.value;
      const confirmPassword = event.target.confirmPassword.value;
      if ( password != confirmPassword ) {
        Bert.alert('Passwords do not match', 'danger');
      } else {
        Accounts.resetPassword(token, password, (error) => {
          if ( error ) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Password successfully reset', 'success');
            FlowRouter.go('dashboard');
            done();
          }
        });
      }
    }
  });
});