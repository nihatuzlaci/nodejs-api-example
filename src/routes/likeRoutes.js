const express = require("express");

const router = express.Router();

const {
  toggleLikePost,
  getLikesByPostId,
  getUserLikeByPostId,
} = require("../controllers/likeController");

const { verifyToken } = require("../middlewares/auth");

router.get("/:postId/:userId", verifyToken, toggleLikePost);
router.get("/:postId", verifyToken, getLikesByPostId);
router.get("/check-like/:userId/:postId", verifyToken, getUserLikeByPostId);

module.exports = router;
