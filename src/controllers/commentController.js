const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const createComment = async (req, res) => {
  try {
    const [post, user] = await Promise.all([
      Post.findOne({ _id: req.params.id }),
      User.findOne({ _id: req.params.userId }),
    ]);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const comment = await Comment.create({ ...req.body, user, post });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id });

    if (!comments.length) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
