const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret";

/* -----------------------------
   HELPERS
----------------------------- */

const normalizeEmail = (
  email = ""
) =>
  email
    .trim()
    .toLowerCase();

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

  creds:
    user.creds || 0,

  wallet:
    user.wallet || 0,

  exp:
    user.exp || 0,

  streak:
    user.streak || 0,

  dailyBonus:
    user.dailyBonus || 5,

  avatar:
    user.avatar || "",
});

/* -----------------------------
   GENERATE TOKEN
----------------------------- */

const generateToken = (
  id
) => {
  return jwt.sign(
    { id },
    JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

/* -----------------------------
   REGISTER
----------------------------- */

router.post(
  "/register",
  async (req, res) => {
    try {
      const username = String(
        req.body.username || ""
      ).trim();

      const email =
        normalizeEmail(
          req.body.email
        );

      const password = String(
        req.body.password ||
          ""
      );

      const referralCode =
        String(
          req.body.referral ||
            ""
        ).trim();

      /* VALIDATION */

      if (
        !username ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              "All fields are required",
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

      if (
        password.length < 6
      ) {
        return res
          .status(400)
          .json({
            message:
              "Password must be at least 6 characters",
          });
      }

      /* CHECK EXISTING USER */

      const existingUser =
        await User.findOne({
          $or: [
            { email },
            { username },
          ],
        });

      if (
        existingUser
      ) {
        return res
          .status(409)
          .json({
            message:
              "User already exists",
          });
      }

      /* HASH PASSWORD */

      const hashedPassword =
        await bcrypt.hash(
          password,
          12
        );

      /* GENERATE REFERRAL CODE */

      const myReferralCode =
        username.toLowerCase() +
        Math.floor(
          1000 +
            Math.random() *
              9000
        );

      /* CREATE USER */

      const user =
        await User.create({
          username,

          email,

          password:
            hashedPassword,

          role: "user",

          status:
            "active",

          creds: 250,

          wallet: 0,

          exp: 0,

          streak: 0,

          dailyBonus: 5,

          avatar: "",

          referralCode:
            myReferralCode,
        });

      /* REFERRAL BONUS */

      if (
        referralCode
      ) {
        const referrer =
          await User.findOne({
            referralCode,
          });

        if (referrer) {
          referrer.creds += 50;

          await referrer.save();
        }
      }

      /* GENERATE TOKEN */

      const token =
        generateToken(
          user._id
        );

      /* RESPONSE */

      res.status(201).json({
        success: true,

        message:
          "User registered successfully",

        token,

        user:
          sanitizeUser(
            user
          ),
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