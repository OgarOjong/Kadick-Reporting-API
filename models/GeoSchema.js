const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const geoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
});
const GeoSchema = mongoose.model("GeoSchema", geoSchema);
module.exports = GeoSchema;
