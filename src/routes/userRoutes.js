const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  privateProfile,
  login,
  resetPassword,
  forgotPassword,
} = require("../controllers/userController");

const { verifyToken } = require("../middlewares/auth");

router.get("/", [verifyToken], getUsers);

router.post("/login", login);
router.post("/", createUser);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

router.put("/private-profile/:id", [verifyToken], privateProfile);

module.exports = router;
