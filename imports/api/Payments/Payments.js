import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Payments = new Mongo.Collection("payments");

export default Payments;