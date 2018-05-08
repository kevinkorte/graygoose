import "../../ui/pages/main.js";

FlowRouter.route('/signup', {
  name: "signup",
  action: function () {
    BlazeLayout.render("main");
  }
});

FlowRouter.route('/signup', {
  name: "onboard",
  action: function () {
    console.log("success");
  }
})