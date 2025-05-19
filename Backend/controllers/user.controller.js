import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import Blacklist from "../models/blacklist.model.js";
export const register = async (req, res) => {
  // Validate request input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Create a new user
    const newUser = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
    });

    // Generate token for the new user
    const token = newUser.generateToken();


    // Send success response
    return res.status(201).
      cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Registered successfully",
        success: true,
        user: {
          id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
        token,
      });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    // Use findOne instead of find to get a single user document
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = user.generateToken();

    // Send success response

    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      }).json({
        message: "Login successful",
        success: true,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token,
      });

  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: error.message,
    });

  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Add the token to the blacklist
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      await Blacklist.create({ token });
    } else {
      return res.status(400).json({
        message: "No token provided",
        success: false,
      });
    }



    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}