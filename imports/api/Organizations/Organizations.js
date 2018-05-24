import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Organizations = new Mongo.Collection("organizations");

const Schemas = {};

Schemas.Organizations = new SimpleSchema({
  users: {
    type: Array,
  },
  'users.$': {
    type: Object
  }
});

Organizations.attachSchema(Schemas.Organizations);

export default Organizations;