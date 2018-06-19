import { Meteor } from 'meteor/meteor';
import Showings from './Showings';

Meteor.methods({
  createNewShowing(showing) {
    console.log(showing);
    Showings.insert({
      category: showing.category,
      start: showing.start,
      end: showing.end,
      address: showing.address,
      placeName: showing.placeName,
      formattedAddress: showing.formattedAddress,
      formattedPhone: showing.formattedPhoneNumber,
      website: showing.website,
      lat: showing.lat,
      lng: showing.lng,
    }, (err, res) => {
      console.log(err, res);
    })
  }
})