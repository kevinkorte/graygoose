import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Subscriptions = new Mongo.Collection("subscriptions");

export default Subscriptions;