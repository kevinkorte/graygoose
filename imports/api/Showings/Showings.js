import { Mongo } from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Showings = new Mongo.Collection("showings");

export default Showings;