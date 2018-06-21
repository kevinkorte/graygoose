import { Accounts } from 'meteor/accounts-base';

import '../../ui/layouts/App_home.html';
import "../../ui/pages/main.js";
import '../../ui/pages/adminNav.js';
import '../../ui/pages/Dashboard/dashboard';
import '../../ui/pages/Team/team';
import '../../ui/pages/Billing/billing';
import '../../ui/pages/New/new';
import '../../ui/pages/Single/single';

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

FlowRouter.route('/:user/:id', {
  name: 'single',
  action: function () {
    BlazeLayout.render("App.home", {
      template: "single"
    });
  }
})