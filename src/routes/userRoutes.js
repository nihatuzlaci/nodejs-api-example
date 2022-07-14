const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  login,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/auth");

router.post("/login", login);
router.get("/", [verifyToken], getUsers);
router.post("/", createUser);

module.exports = router;
