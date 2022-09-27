const express = require("express");

const router = express.Router();

const {
  getCommentsByPostId,
  createComment,
} = require("../controllers/commentController");

const { verifyToken } = require("../middlewares/auth");

router.get("/:id", verifyToken, getCommentsByPostId);
router.post("/:id/:userId", verifyToken, createComment);

module.exports = router;
