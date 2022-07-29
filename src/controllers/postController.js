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

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Post.exists({ _id: id });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "Post does not exist",
      });
    }

    await Post.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
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
  deletePost,
};
