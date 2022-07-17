const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPostsByUserId,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPostsByUserId);

module.exports = router;
