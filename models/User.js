const mongoose = require("mongoose");
const Report = require("../models/Report");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  userCode: {
    type: String,
    required: true,
    max: 10,
  },
  email: {
    type: String,
    min: 6,
    max: 255,
    required: true,
  },
  phoneNumber: {
    type: String,
    min: 11,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 50,
    required: true,
  },
  lastSeen: {
    type: String,
    default: "EMPTY",
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
