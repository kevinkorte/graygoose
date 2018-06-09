import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';


import './team_table_row.html';

Template.team_table_row.onRendered(() => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  Meteor.subscribe('org.users', {orgId: Meteor.user().organizationId});
})

Template.team_table_row.helpers({
  getUser(id) {
    return Meteor.users.findOne(id);
  },
  getUserRoleBadge(userId) {
    let user;
    user = Meteor.users.findOne(userId);
    if (user) {
      if (Roles.userIsInRole(userId, 'owner', user.organizationId)) {
        return 'owner'
      } else if (Roles.userIsInRole(userId, 'admin', user.organizationId)) {
        return 'admin'
      } else {
        return 'member'
      }
    }
  },
  hasNotRegistered(id) {
    let user;
    user = Meteor.users.findOne(id);
    if (_.isEmpty(user.services)) {
      return true;
    } else {
      return false;
    }
  },
  isOwner(id) {
    let user;
    user = Meteor.users.findOne(id);
    if (user) {
      if (Roles.userIsInRole(id, 'owner', user.organizationId)) {
        return true;
      } else {
        return false;
      }
    }
  },
  isAdmin(id) {
    let user;
    user = Meteor.users.findOne(id);
    if (user) {
      if (Roles.userIsInRole(id, 'admin', user.organizationId)) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.team_table_row.events({
  'click #revokeInvite'(event) {
    let id = $(event.target).data('id');
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Meteor.call('revokeUserInvite', id, (error) => {
          if (error) {
            console.log(error);
          } else {
            Meteor.call('updateSubscriptionQuantity', Meteor.user().organizationId, (error) => {
              if (error) {
                console.log(error);
              } else {
                swal("Invitation has been removed!", {
                  icon: "success",
                  timer: 3000,
                });
              }
            });
          }
        })
      } else {
      }
    });
  },
  'click #makeAdmin'(event) {
    let id = $(event.target).data('id');
    let user;
    user = Meteor.users.findOne(id);
    if (user) {
      Meteor.call('makeUserAdmin', user, (error) => {
        if (error) {
          console.log(error);
        }
      })
    }
  },
  'click #removeAdmin'(event) {
    let id = $(event.target).data('id');
    let user;
    user = Meteor.users.findOne(id);
    if (user) {
      Meteor.call('removeUserAdmin', user, (error) => {
        if (error) {
          console.log(error);
        }
      })
    }
  }
})