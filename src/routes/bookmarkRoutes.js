const express = require("express");

const router = express.Router();

const {
  getBookmarks,
  getBookmarkById,
  toggleBookmark,
} = require("../controllers/bookmarkController");

const { verifyToken } = require("../middlewares/auth");

router.get("/user/:userId", verifyToken, getBookmarks);
router.get("/:id", verifyToken, getBookmarkById);
router.get("/:id/:userId", verifyToken, toggleBookmark);

module.exports = router;
