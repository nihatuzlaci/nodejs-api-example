const express = require("express");

const router = express.Router();

const {
  toggleLikePost,
  getLikesByPostId,
  getUserLikeByPostId,
} = require("../controllers/likeController");

router.get("/:postId/:userId", toggleLikePost);
router.get("/:postId", getLikesByPostId);
router.get("/check-like/:userId/:postId", getUserLikeByPostId);

module.exports = router;
