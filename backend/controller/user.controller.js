import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import upload from "../middleware/upload.middleware.js";

export const Register = async (req, res, next) => {
  // Use the multer middleware for file upload
  upload.single("profileImage")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Store the image path if uploaded
      const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // ensures https in prod
          sameSite: "Lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200)
        .json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ensures https in prod
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Logout = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const Me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
