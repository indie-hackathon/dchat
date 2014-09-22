'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User');
//   _ = require('lodash');

/**
 * List of friends
 */
exports.all = function(req, res) {
  User.findOne({
    username: req.user.username
  }).exec(function(err, user) {
    res.json(user.friends);
  });
};

/**
 * Add friend
 */
exports.add = function(req, res, next) {
  var friend_name = req.body.friend_name.toLowerCase().replace(/^@/, '');

  User.findOne({
    username: friend_name
  }).exec(function(err, user) {
    var status = 0,
      recordToSave = {
        username: friend_name
      };

    if (err) return next(err);

    if (user) {
      status = 1;
      recordToSave.image = user.twitter.profile_image_url;
      recordToSave.active = true;
    } else {
      status = 0;
      recordToSave.image = 'http://placehold.it/88x88';
      recordToSave.active = false;
    }

    User.update({
      username: req.user.username
    }, {
      $push: {
        'friends': recordToSave
      }
    }, function(err) {
      if (err) return res.send('contact addMsg error: ' + err);
    });

    res.json({
      'status': status
    });
  });
};
