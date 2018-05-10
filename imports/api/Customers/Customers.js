import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Customers = new Mongo.Collection("customers");

export default Customers;