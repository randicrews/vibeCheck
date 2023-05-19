const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    require: true,
  },
  post: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
