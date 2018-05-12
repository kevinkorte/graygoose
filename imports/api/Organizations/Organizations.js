import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Organizations = new Mongo.Collection("organizations");

export default Organizations;