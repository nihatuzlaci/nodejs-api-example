const Bookmark = require("../models/Bookmark");
const User = require("../models/User");

const getBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookmarks = await Bookmark.find({ user: userId });

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;

    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
      return res.status(404).json({
        success: true,
        message: "There is no bookmark with that id",
      });
    }

    res.status(200).json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const bookmark = await Bookmark.findOne({ post: id, user: userId });

    if (!bookmark) {
      await Bookmark.create({ post: id, user: userId });
      console.log("2", bookmark);
    }

    if (bookmark) {
      console.log("3", bookmark);
      await bookmark.delete();
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getBookmarks,
  getBookmarkById,
  toggleBookmark,
};
