import { Template } from 'meteor/templating';

import './login.html';

Template.login.onRendered(() => {
  $(document).ready(function() {
    let movementStrength = 25;
    let height = movementStrength / $(window).height();
    let width = movementStrength / $(window).width();
    $(".login-wrapper").mousemove(function(e){
      let pageX = e.pageX - ($(window).width() / 2);
      let pageY = e.pageY - ($(window).height() / 2);
      let newvalueX = width * pageX * -1 - 25;
      let newvalueY = height * pageY * -1 - 50;
      $('.login-wrapper').css("background-position", newvalueX+"px     "+newvalueY+"px");
    });
    });
})