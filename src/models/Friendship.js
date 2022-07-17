const mongoose = require("mongoose");

const FriendshipSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "decline",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Friendship", FriendshipSchema);
