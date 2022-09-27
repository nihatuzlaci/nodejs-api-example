const express = require("express");

const router = express.Router();

const {
  createPost,
  getPosts,
  getPostsByUserId,
  deletePost,
} = require("../controllers/postController");

const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getPostsByUserId);
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
