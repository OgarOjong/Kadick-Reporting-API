const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  visitCategory: {
    type: String,
    enum: ["Prospect", "Agent", "Return"],
  },
  remark: {
    type: String,
    required: true,
  },
  agentCode: {
    type: String,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  image: {
    types: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  fmlocation: {
    type: String,
  },
  obtainedLocation: {
    type: String,
  },
  obtainLocString: {
    type: String,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
