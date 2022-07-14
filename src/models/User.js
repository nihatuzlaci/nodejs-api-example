const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isPrivateProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
    resetPasswordCode: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();

  bcrypt.genSalt(10, (error, salt) => {
    if (error) next(error);
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) next(error);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
