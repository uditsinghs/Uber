import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

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
    return res.status(201).json({
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
