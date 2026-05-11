const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /* -----------------------------
       Basic User Info
    ----------------------------- */

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    /* -----------------------------
       User Permissions
    ----------------------------- */

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "banned",
      ],
      default: "active",
      index: true,
    },

    /* -----------------------------
       Credits / Reward Points
    ----------------------------- */

    creds: {
      type: Number,
      default: 250,
      min: 0,
    },

    /* -----------------------------
       EXP System
    ----------------------------- */

    exp: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* -----------------------------
       Daily Bonus System
    ----------------------------- */

    dailyBonus: {
      type: Number,
      default: 5,
      min: 0,
    },

    /* -----------------------------
       Daily Claim Tracking
    ----------------------------- */

    dailyClaimedAt: {
      type: Date,
      default: null,
    },

    lastCaptchaClaimAt: {
  type: Date,
  default: null,
},
    /* -----------------------------
       Streak System
    ----------------------------- */

    streak: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* -----------------------------
       Wallet Balance
    ----------------------------- */

    wallet: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* -----------------------------
       Referral System
    ----------------------------- */

    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    referredBy: {
      type:
        mongoose.Schema.Types
          .ObjectId,

      ref: "User",

      default: null,
    },

    /* -----------------------------
       Profile
    ----------------------------- */

    avatar: {
      type: String,
      default: null,
    },

    /* -----------------------------
       Activity Tracking
    ----------------------------- */

    lastLoginAt: {
      type: Date,
      default: null,
    },

    lastActiveAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* -----------------------------
   Text Search Index
----------------------------- */

userSchema.index({
  username: "text",
  email: "text",
});

module.exports =
  mongoose.model(
    "User",
    userSchema
  );