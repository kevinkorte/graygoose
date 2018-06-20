import { Mongo } from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Followers = new Mongo.Collection("followers");

const Schemas = {};

Schemas.Followers = new SimpleSchema({
  name: {
    type: String
  },
  phoneNumber: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  belongsTo: {
    type: String,
    autoValue: function() {
      console.log('called autovalue');
      if (this.isInsert) {
        return Meteor.userId();
      }
    }
  }
});

Followers.attachSchema(Schemas.Followers);

export default Followers;