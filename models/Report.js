const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  locationID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  reportType: {
    type: String,
    require: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
