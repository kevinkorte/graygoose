import {
  Mongo
} from "meteor/mongo";

import SimpleSchema from 'simpl-schema';

const Cards = new Mongo.Collection("cards");

export default Cards;