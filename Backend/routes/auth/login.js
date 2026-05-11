const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/* -----------------------------
   Helpers
----------------------------- */

const normalizeEmail = (email = "") =>
  email.trim().toLowerCase();

const sanitizeUser = (user) => ({
  id: user._id,

  username: user.username,

  email: user.email,

  role: user.role,

  status: user.status,

  creds: user.creds || 0,

  avatar: user.avatar || "",

  createdAt: user.createdAt,

  lastLoginAt: user.lastLoginAt,
});

/* -----------------------------
   AUTH MIDDLEWARE (INLINE)
----------------------------- */

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account inactive",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

/* -----------------------------
   LOGIN
----------------------------- */

router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account is inactive or banned",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    user.lastLoginAt = new Date();
    user.lastActiveAt = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error(err); // ✅ important for debugging
    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;