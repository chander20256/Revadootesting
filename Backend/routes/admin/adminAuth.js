const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");

const {
  protect,
  requireAdmin,
} = require("../../middleware/auth");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret";

const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ||
  "admin@revadoo.com"
).toLowerCase();

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ||
  "Admin@12345";

/* -----------------------------
   SANITIZE USER
----------------------------- */

const sanitizeUser = (
  user
) => ({
  id: user._id,

  username:
    user.username,

  email: user.email,

  role: user.role,

  status: user.status,

  createdAt:
    user.createdAt,

  lastLoginAt:
    user.lastLoginAt,

  avatar:
    user.avatar || "",
});

/* -----------------------------
   SIGN TOKEN
----------------------------- */

const signToken = (
  user
) =>
  jwt.sign(
    {
      id: user._id,

      role: user.role,

      email: user.email,
    },

    JWT_SECRET,

    {
      expiresIn: "12h",
    }
  );

/* -----------------------------
   ENSURE ADMIN EXISTS
----------------------------- */

async function ensureAdminUser() {
  let admin =
    await User.findOne({
      email: ADMIN_EMAIL,
    }).select("+password");

  const passwordHash =
    await bcrypt.hash(
      ADMIN_PASSWORD,
      12
    );

  if (!admin) {
    return await User.create({
      username: "Admin",

      email: ADMIN_EMAIL,

      password:
        passwordHash,

      role: "admin",

      status: "active",

      avatar: null,
    });
  }

  if (
    admin.role !== "admin"
  ) {
    admin.role = "admin";
  }

  if (
    admin.status !==
    "active"
  ) {
    admin.status =
      "active";
  }

  if (
    !(await bcrypt.compare(
      ADMIN_PASSWORD,
      admin.password
    ))
  ) {
    admin.password =
      passwordHash;
  }

  await admin.save();

  return admin;
}

/* -----------------------------
   ADMIN LOGIN
----------------------------- */

router.post(
  "/login",
  async (req, res) => {
    try {
      const email = String(
        req.body.email || ""
      ).toLowerCase();

      const password = String(
        req.body.password || ""
      );

      if (
        email !==
          ADMIN_EMAIL ||
        password !==
          ADMIN_PASSWORD
      ) {
        return res
          .status(401)
          .json({
            success: false,

            message:
              "Invalid admin credentials",
          });
      }

      const admin =
        await ensureAdminUser();

      admin.lastLoginAt =
        new Date();

      admin.lastActiveAt =
        new Date();

      await admin.save();

      const token =
        signToken(admin);

      res.json({
        success: true,

        message:
          "Admin login successful",

        token,

        user:
          sanitizeUser(
            admin
          ),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   GET CURRENT ADMIN
----------------------------- */

router.get(
  "/me",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const admin =
        await User.findById(
          req.user._id
        ).select("-password");

      if (!admin) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Admin not found",
          });
      }

      res.json({
        success: true,

        user:
          sanitizeUser(
            admin
          ),
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch admin",
      });
    }
  }
);

module.exports = router;