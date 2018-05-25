import '../../ui/layouts/App_home.html';
import "../../ui/pages/main.js";
import '../../ui/pages/adminNav.js';
import '../../ui/pages/billing.js';
import '../../ui/pages/Dashboard/dashboard';
import '../../ui/pages/Team/team';


FlowRouter.route('/signup', {
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