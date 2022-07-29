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

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not correct",
      });
    }

    // const randomHexString = crypto.randomBytes(15).toString("hex");
    // const resetPasswordToken = crypto
    //   .createHash("SHA256")
    //   .update(randomHexString)
    //   .digest("hex");

    const code = Math.floor(100000 + Math.random() * 900000);

    //  user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    user.resetPasswordCode = code;

    await user.save();

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Reset Password",
      text: "Hello!",
      html: `"<p>Reset password code : <b>${code}</b></p> "`,
    };

    sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Check your inbox we sent you an e-mail to reset your password",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordCode: req.body.resetPasswordCode,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Reset password code wrong or Reset password expired",
      });
    }
    const password = Math.floor(100000 + Math.random() * 900000);

    user.password = password;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "New Password",
      text: "Hello!",
      html: `"<p>Your new password : <b>${password}</b></p> "`,
    };

    sendMail(mailOptions);

    res.status(200).json({
      success: false,
      message: "Your new password sent your e-mail address",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  login,
  privateProfile,
  forgotPassword,
  resetPassword,
};
