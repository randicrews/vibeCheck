const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phys: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  reports: {
    type: Number,
    required: true,
  },
  reportType: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
