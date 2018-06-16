import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';

const Showings = new Mongo.Collection("showings");

const Schemas = {};

Schemas.Showings = new SimpleSchema({
  category: {
    type: String,
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  address: {
    type: String
  },
  placeName: {
    type: String,
    optional: true
  },
  formattedAddress: {
    type: String,
    optional: true
  },
  formattedPhone: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  },
  followers: {
    type: Array,
    optional: true
  },
  "followers.$": {
    type: Object
  },
  "followers.$.id": {
    type: String
  },
  "followers.$.name": {
    type: String,
    optional: true
  },
  "followers.$.phoneNumber": {
    type: String,
    optional: true
  },
  "followers.$.email": {
    type: String,
    optional: true
  }
});

export default Showings;