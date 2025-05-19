import { validationResult } from "express-validator";
import { createCaption } from "../services/caption.service.js";
import Caption from "../models/caption.schema.js";
import Blacklist from "../models/blacklist.model.js";

export const registerCaption = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehical } = req.body;

  try {
    // Check if the caption already exists
    const existingCaption = await Caption.findOne({ email });
    if (existingCaption) {
      return res.status(409).json({ message: "Caption already exists" });
    }

    // Create a new caption
    const caption = await createCaption({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      plate: vehical.plate,
      capacity: vehical.capacity,
      color: vehical.color,
      vehicalType: vehical.vehicalType,
    });

    // Check if the caption was created successfully
    if (!caption) {
      return res.status(500).json({ message: "Error creating caption" });
    }

    // Generate token
    const token = await caption.generateAuthToken();

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    // Send the response
    return res.status(201).json({
      message: "Caption registered successfully",
      caption: {
        id: caption._id,
        fullname: {
          firstname: caption.firstname,
          lastname: caption.lastname,
        },
        email: caption.email,
        plate: caption.plate,
        capacity: caption.capacity,
        color: caption.color,
        vehicalType: caption.vehicalType,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const loginCaption = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the caption by email
    const caption = await Caption.findOne({ email }).select("+password");
    if (!caption) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await caption.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = await caption.generateAuthToken();

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    // Send the response
    return res.status(200).json({
      message: "Caption logged in successfully",
      caption: {
        id: caption._id,
        fullname: {
          firstname: caption.fullname.firstname,
          lastname: caption.fullname.lastname,
        },
        email: caption.email,
        plate: caption.plate,
        capacity: caption.capacity,
        color: caption.color,
        vehicalType: caption.vehicalType,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export const getCaptionProfile = async (req, res) => {
  try {
    const caption = await Caption.findById(req.caption._id);
    if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    return res.status(200).json({
      caption: {
        id: caption._id,
        fullname: {
          firstname: caption.fullname.firstname,
          lastname: caption.fullname.lastname,
        },
        email: caption.email,
        plate: caption.plate,
        capacity: caption.capacity,
        color: caption.color,
        vehicalType: caption.vehicalType,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export const logoutCaption = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log(token);

    // Clear the token from the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });


    if (token) {
      await Blacklist.create({ token });
    } else {
      return res.status(400).json({
        message: "No token provided",
        success: false,
      });
    }

    return res.status(200).json({ message: "Caption logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}