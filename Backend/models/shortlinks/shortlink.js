const mongoose = require("mongoose");

const shortlinkSchema =
  new mongoose.Schema(
    {
      /* -----------------------------
         BASIC INFO
      ----------------------------- */

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      description: {
        type: String,
        default: "",
        trim: true,
        maxlength: 500,
      },

      /* -----------------------------
         URLS
      ----------------------------- */

      originalUrl: {
        type: String,
        required: true,
        trim: true,
      },

      shortUrl: {
        type: String,
        default: null,
      },

      /* -----------------------------
         SHORTLINK MODE
      ----------------------------- */

      apiMode: {
        type: Boolean,
        default: false,
      },

      provider: {
        type: String,
        default: "internal",
      },

      apiKey: {
        type: String,
        default: null,
        select: false,
      },

      /* -----------------------------
         REWARDS
      ----------------------------- */

      reward: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },

      expReward: {
        type: Number,
        default: 0,
        min: 0,
      },

      /* -----------------------------
         TIMER
      ----------------------------- */

      timer: {
        type: Number,
        required: true,
        min: 0,
        default: 10,
      },

      /* -----------------------------
         DAILY LIMITS
      ----------------------------- */

      dailyLimit: {
        type: Number,
        default: 1,
        min: 0,
      },

      cooldown: {
        type: Number,
        default: 0,
        min: 0,
      },

      /* -----------------------------
         STATUS
      ----------------------------- */

      status: {
        type: String,
        enum: [
          "active",
          "paused",
          "disabled",
        ],

        default: "active",

        index: true,
      },

      /* -----------------------------
         CATEGORY
      ----------------------------- */

      category: {
        type: String,
        default: "general",
        trim: true,
      },

      /* -----------------------------
         ANALYTICS
      ----------------------------- */

      totalVisits: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalCompleted: {
        type: Number,
        default: 0,
        min: 0,
      },

      totalRewardsGiven: {
        type: Number,
        default: 0,
        min: 0,
      },

      /* -----------------------------
         FEATURED / PRIORITY
      ----------------------------- */

      featured: {
        type: Boolean,
        default: false,
      },

      priority: {
        type: Number,
        default: 0,
      },

      /* -----------------------------
         CREATED BY
      ----------------------------- */

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      /* -----------------------------
         SECURITY
      ----------------------------- */

      requireCaptcha: {
        type: Boolean,
        default: true,
      },

      antiVpn: {
        type: Boolean,
        default: false,
      },

      /* -----------------------------
         ACTIVE TIME
      ----------------------------- */

      startsAt: {
        type: Date,
        default: null,
      },

      expiresAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

/* -----------------------------
   SEARCH INDEX
----------------------------- */

shortlinkSchema.index({
  title: "text",
  category: "text",
});

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  mongoose.model(
    "Shortlink",
    shortlinkSchema
  );