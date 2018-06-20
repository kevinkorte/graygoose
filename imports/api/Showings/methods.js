import { Meteor } from 'meteor/meteor';
import Showings from './Showings';
import Followers from '../Followers/Followers';

Meteor.methods({
  createNewShowing(showing) {
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
      if (err) {
        console.log(err);
      } else {
        let followers = showing.followers;
        followers.forEach(function(followerId) {
          let follower = Followers.findOne(followerId);
          let showing = Showings.findOne(res);
          if (follower) {
            Showings.update(res, {
              $addToSet: {
                followers: {
                  id: follower._id,
                  name: follower.name,
                  phoneNumber: follower.phoneNumber,
                  email: follower.email
                }
              }
            })
          } else {
            let user = Meteor.users.findOne(followerId);
            console.log('user', user);
            Showings.update(res, {
              $addToSet: {
                followers: {
                  id: user._id,
                  name: user.profile.name.first + ' ' + user.profile.name.last,
                  phoneNumber: user.phoneNumber,
                  email: user.emails[0].address
                }
              }
            })
          }
        })
      }
    })
  }
})