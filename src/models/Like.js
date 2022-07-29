const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
