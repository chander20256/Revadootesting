// LOCATION: routes/auth/update.js

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret";

/* -----------------------------
   SANITIZE USER
----------------------------- */

const sanitizeUser = (user) => ({
  id: user._id,

  username: user.username,

  email: user.email,

  role: user.role,

  status: user.status,

  creds: user.creds || 0,

  wallet: user.wallet || 0,

  exp: user.exp || 0,

  streak: user.streak || 0,

  dailyBonus:
    user.dailyBonus || 0,

  avatar: user.avatar || "",

  createdAt:
    user.createdAt,

  lastLoginAt:
    user.lastLoginAt,
});

/* -----------------------------
   AUTH MIDDLEWARE
----------------------------- */

const protect = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization ||
      "";

    const [scheme, token] =
      authHeader.split(" ");

    if (
      scheme !== "Bearer" ||
      !token
    ) {
      return res
        .status(401)
        .json({
          message:
            "Not authorized",
        });
    }

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({
          message:
            "User not found",
        });
    }

    if (
      user.status !==
      "active"
    ) {
      return res
        .status(403)
        .json({
          message:
            "Account inactive",
        });
    }

    req.user = user;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({
        message:
          "Invalid or expired token",
      });
  }
};

/* -----------------------------
   GET CURRENT USER
----------------------------- */

router.get(
  "/me",
  protect,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      res.json({
        success: true,

        user:
          sanitizeUser(user),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   UPDATE AVATAR
----------------------------- */

router.put(
  "/update-avatar",
  protect,
  async (req, res) => {
    try {
      const { avatar } =
        req.body;

      if (!avatar) {
        return res
          .status(400)
          .json({
            message:
              "Avatar is required",
          });
      }

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      user.avatar = avatar;

      await user.save();

      res.json({
        success: true,

        message:
          "Avatar updated successfully",

        avatar:
          user.avatar,

        user:
          sanitizeUser(user),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   UPDATE USERNAME
----------------------------- */

router.put(
  "/update-username",
  protect,
  async (req, res) => {
    try {
      const username = String(
        req.body.username || ""
      ).trim();

      if (!username) {
        return res
          .status(400)
          .json({
            message:
              "Username is required",
          });
      }

      if (
        username.length < 3
      ) {
        return res
          .status(400)
          .json({
            message:
              "Username must be at least 3 characters",
          });
      }

      /* CHECK EXISTING USERNAME */

      const existingUser =
        await User.findOne({
          username,

          _id: {
            $ne: req.user._id,
          },
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              "Username already taken",
          });
      }

      /* UPDATE USER */

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      user.username =
        username;

      await user.save();

      res.json({
        success: true,

        message:
          "Username updated successfully",

        user:
          sanitizeUser(user),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

module.exports = router;