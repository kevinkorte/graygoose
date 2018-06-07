import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './team.html';
import '../../components/Navigation/Dashboard/nav_dashboard';
import '../../components/Navigation/Dashboard/user_sidebar';
import '../../components/Team/team_table';
import '../../components/Team/team_options';
import '../../components/Team/new_team_modal';

Template.team.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('user.payments');
  })
})