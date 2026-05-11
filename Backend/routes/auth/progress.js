// LOCATION: routes/progress/index.js

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

  dailyBonus:
    user.dailyBonus || 5,

  streak:
    user.streak || 0,

  avatar: user.avatar || "",

  createdAt: user.createdAt,

  lastLoginAt:
    user.lastLoginAt,

  dailyClaimedAt:
    user.dailyClaimedAt,
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
   GET USER PROGRESS
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
   CLAIM DAILY REWARD
----------------------------- */

router.post(
  "/claim-daily",
  protect,
  async (req, res) => {
    try {
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

      const today =
        new Date();

      const todayDate =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );

      /* -----------------------------
         FIRST CLAIM
      ----------------------------- */

      if (
        !user.dailyClaimedAt
      ) {
        user.streak = 1;
      } else {
        const lastClaim =
          new Date(
            user.dailyClaimedAt
          );

        const lastClaimDate =
          new Date(
            lastClaim.getFullYear(),
            lastClaim.getMonth(),
            lastClaim.getDate()
          );

        const diffTime =
          todayDate -
          lastClaimDate;

        const diffDays =
          Math.floor(
            diffTime /
              (1000 *
                60 *
                60 *
                24)
          );

        /* Already claimed today */

        if (diffDays === 0) {
          return res
            .status(400)
            .json({
              message:
                "Reward already claimed today",
            });
        }

        /* Consecutive day */

        if (diffDays === 1) {
          user.streak += 1;
        }

        /* Missed day */

        else {
          user.streak = 1;
        }
      }

      /* -----------------------------
         7 DAY CYCLE
      ----------------------------- */

      let streakDay =
        user.streak % 7;

      if (streakDay === 0) {
        streakDay = 7;
      }

      /* -----------------------------
         REWARD TABLES
      ----------------------------- */

      const credsRewards = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 8,
  7: 12,
};

const expRewards = {
  1: 5,
  2: 8,
  3: 10,
  4: 12,
  5: 15,
  6: 18,
  7: 25,
};

      const credsReward =
        credsRewards[
          streakDay
        ] || 10;

      const expReward =
        expRewards[
          streakDay
        ] || 20;

      /* -----------------------------
         APPLY REWARDS
      ----------------------------- */

      user.creds +=
        credsReward;

      user.exp += expReward;

      user.dailyClaimedAt =
        todayDate;

      user.lastLoginAt =
        todayDate;

      await user.save();

      res.json({
        success: true,

        message:
          "Reward claimed successfully",

        rewards: {
          creds:
            credsReward,

          exp:
            expReward,

          streakDay,
        },

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
   ADD EXP
----------------------------- */

router.put(
  "/add-exp",
  protect,
  async (req, res) => {
    try {
      const exp = Number(
        req.body.exp || 0
      );

      if (exp <= 0) {
        return res
          .status(400)
          .json({
            message:
              "Invalid EXP amount",
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

      user.exp += exp;

      await user.save();

      res.json({
        success: true,

        message:
          "EXP added successfully",

        exp: user.exp,

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