const { createToken } = require("../middlewares/auth");
const User = require("../models/User");
const { sendMail } = require("../helpers/mail");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const userData = {
      ...user._doc,
      token: createToken(user),
    };

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const isUserExists = await User.findOne({ email: req.body.email });

    if (isUserExists) {
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });
    }

    const user = await User.create(req.body);

    const userData = {
      ...user._doc,
    };

    res.status(201).json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

const privateProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        isPrivateProfile: req.body.isPrivate,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interval server error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  login,
  privateProfile,
};
