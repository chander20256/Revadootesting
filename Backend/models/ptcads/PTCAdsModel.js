const mongoose =
  require("mongoose");

const PTCAdsSchema =
  new mongoose.Schema(
    {
      /* =========================================
         BASIC INFO
      ========================================= */

      title: {
        type: String,

        required: true,

        trim: true,
      },

      description: {
        type: String,

        default: "",
      },

      /* =========================================
         AD TYPE
      ========================================= */

      adType: {
        type: String,

        enum: [
          "window",
          "iframe",
          "external",
          "youtube",
        ],

        default:
          "window",
      },

      /* =========================================
         PROVIDER
      ========================================= */

      provider: {
        type: String,

        enum: [
          "monetag",
          "adsterra",
          "propellerads",
        ],

        default:
          "monetag",
      },

      /* =========================================
         URL
      ========================================= */

      adUrl: {
        type: String,

        required: true,
      },

      /* =========================================
         REWARD
      ========================================= */

      reward: {
        type: Number,

        required: true,

        default: 0,
      },

      /* =========================================
         TIMER
      ========================================= */

      timer: {
        type: Number,

        required: true,

        default: 15,
      },

      /* =========================================
         DAILY LIMIT
      ========================================= */

      dailyLimit: {
        type: Number,

        default: 1,
      },

      /* =========================================
         STATUS
      ========================================= */

      status: {
        type: String,

        enum: [
          "active",
          "paused",
        ],

        default:
          "active",
      },

      /* =========================================
         ANALYTICS
      ========================================= */

      totalViews: {
        type: Number,

        default: 0,
      },

      totalCompletions: {
        type: Number,

        default: 0,
      },

      totalRewardsDistributed:
        {
          type: Number,

          default: 0,
        },

      uniqueUsers: {
        type: Number,

        default: 0,
      },

      /* =========================================
         TODAY STATS
      ========================================= */

      todayViews: {
        type: Number,

        default: 0,
      },

      todayCompletions:
        {
          type: Number,

          default: 0,
        },

      todayRewardsDistributed:
        {
          type: Number,

          default: 0,
        },

      /* =========================================
         LAST RESET
      ========================================= */

      lastDailyReset: {
        type: Date,

        default:
          Date.now,
      },

      /* =========================================
         FEATURED
      ========================================= */

      featured: {
        type: Boolean,

        default: false,
      },

      /* =========================================
         DEVICE SUPPORT
      ========================================= */

      deviceTarget: {
        type: String,

        enum: [
          "all",
          "desktop",
          "mobile",
        ],

        default: "all",
      },

      /* =========================================
         COUNTRY TARGET
      ========================================= */

      countries: [
        {
          type: String,
        },
      ],

      /* =========================================
         AUTO EXPIRE
      ========================================= */

      expiresAt: {
        type: Date,

        default: null,
      },
    },

    {
      timestamps: true,
    }
  );

/* =========================================
   INDEXES
========================================= */

PTCAdsSchema.index({
  status: 1,
});

PTCAdsSchema.index({
  provider: 1,
});

PTCAdsSchema.index({
  adType: 1,
});

module.exports =
  mongoose.model(
    "PTCAds",
    PTCAdsSchema
  );