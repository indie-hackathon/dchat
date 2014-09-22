'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Draw Schema
 */
var DrawSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false
  },
  content: {
    type: Array,
    required: true
  },
  from: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

/**
 * Validations
 */
DrawSchema.path('from').validate(function(from) {
  return !!from;
}, 'Author cannot be blank');

DrawSchema.path('to').validate(function(to) {
  return !!to;
}, 'Dest cannot be blank');

DrawSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
DrawSchema.statics.load = function(id, cb) {
  var self = this;
  this.findOne({
    username: id
  }).populate('to', 'username').exec(function() {
    self.findOne({
      username: id
    }).populate('from', 'username').exec(cb);
  });
};

mongoose.model('Draw', DrawSchema);
