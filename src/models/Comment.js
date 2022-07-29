const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user : {
      type : mongoose.Types.ObjectId,
      ref:'User',
      required:true
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
