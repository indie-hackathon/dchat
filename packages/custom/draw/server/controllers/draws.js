'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Draw = mongoose.model('Draw'),
  User = mongoose.model('User');
  // _ = require('lodash');

/**
 * Find draws by friend
 */
exports.list = function(req, res, next, friend) {
  Draw.load(friend, function(err, draw) {
    if (err) return next(err);
    if (!draw) return next(new Error('Failed to load draw ' + friend));
    req.draw = draw;
    next();
  });
};

exports.create = function(req, res) {
  var content = req.body.content;
  var friend_username = req.body.to;

  User.findOne({
    username: friend_username
  }).exec(function(err, friend) {
    var draw = new Draw({
      'content': content,
      'to': friend,
      'from': req.user
    });

    draw.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the draw'
        });
      }
      res.json(draw);
    });
  });
};

exports.all = function() {};

exports.remove = function() {};
