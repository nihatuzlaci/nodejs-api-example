const Like = require("../models/Like");

const toggleLikePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    const post = await Like.findOne({ post: postId, user: userId });
    if (post) {
      post.user = undefined;
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Like removed",
      });
    }

    const like = await Like.findOneAndUpdate(
      { post: postId },
      { post: postId, user: userId },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: like,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getLikesByPostId = async (req, res) => {
  try {
    const likes = await Like.find({ post: req.params.postId }).populate([
      "post",
      "user",
    ]);
    res.status(200).json({
      success: true,
      data: likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const getUserLikeByPostId = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const isLikeExist = await Like.exists({ user: userId, post: postId });

    if (isLikeExist) {
      return res.status(200).json({
        success: true,
        isLiked: true,
      });
    }

    return res.status(200).json({
      success: true,
      isLiked: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports = {
  toggleLikePost,
  getLikesByPostId,
  getUserLikeByPostId,
};
