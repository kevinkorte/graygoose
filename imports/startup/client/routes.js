import '../../ui/pages/main.html';

FlowRouter.route('/signup', {
  name: "signup",
  action: function () {
    BlazeLayout.render("main");
  }
})