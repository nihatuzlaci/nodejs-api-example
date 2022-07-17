const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const getPostsByUserId = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).populate("user");

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
};
