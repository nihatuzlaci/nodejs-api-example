const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPostsByUserId,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.get("/:id", getPostsByUserId);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
