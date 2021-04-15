const mongoose = require("mongoose");
const User = require("../models/User");
// const GeoSchema = require("../models/GeoSchema");
const { Schema } = mongoose;

const Geoschema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});

const reportSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
  fmLocation: {
    type: String,
  },
  obtainedLocation: {
    type: String,
    required: true,
  },

  obtainLocString: {
    type: String,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
