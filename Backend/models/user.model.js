import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: [5, "Email must be at least 5 characters long."],
    match: [
      /^\S+@\S+\.\S+$/,
      "Please provide a valid email address.",
    ], // Email validation
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String, 
  },
});

// Method to generate a JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn:"7d",
  });
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or being modified
  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
