'use strict';

// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },

  isVerified: { type: Boolean },
  verifyToken: { type: String },
  verifyExpires: { type: Date },
  verifyChanges: { type: Object },
  resetToken: { type: String },
  resetExpires: { type: Date },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;