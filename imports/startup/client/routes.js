import '../../ui/layouts/App_home.html';
import "../../ui/pages/main.js";
import '../../ui/pages/adminNav.js';
import '../../ui/pages/billing.html';


FlowRouter.route('/signup', {
  name: "signup",
  action: function () {
    BlazeLayout.render("main");
  }
});

FlowRouter.route('/dashboard', {
  name: "dashboard",
  action: function () {
    BlazeLayout.render("App.home");
  }
});

FlowRouter.route('/dashboard/billing', {
  name: "billing",
  action: function () {
    BlazeLayout.render("App.home", {
      template: "billing"
    });
  }
})