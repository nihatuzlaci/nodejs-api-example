const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  privateProfile,
  login,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/auth");

router.get("/", [verifyToken], getUsers);

router.post("/login", login);
router.post("/", createUser);

router.put("/private-profile/:id", privateProfile);

module.exports = router;
