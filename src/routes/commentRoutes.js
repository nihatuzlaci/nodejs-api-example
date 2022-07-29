const express = require("express");

const router = express.Router();

const {
  getCommentsByPostId,
  createComment,
} = require("../controllers/commentController");

router.get("/:id", getCommentsByPostId);
router.post("/:id/:userId", createComment);

module.exports = router;
