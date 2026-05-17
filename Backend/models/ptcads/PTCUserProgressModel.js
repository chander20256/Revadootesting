const mongoose =
  require("mongoose");

const PTCUserProgressSchema =
  new mongoose.Schema(
    {
      /* =========================================
         USER
      ========================================= */

      userId: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      /* =========================================
         PTC AD
      ========================================= */

      adId: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "PTCAds",

        required: true,
      },

      /* =========================================
         TOTAL COMPLETED
      ========================================= */

      totalCompleted: {
        type: Number,

        default: 0,
      },

      /* =========================================
         TOTAL REWARDS
      ========================================= */

      totalRewardsEarned:
        {
          type: Number,

          default: 0,
        },

      /* =========================================
         DAILY STATUS
      ========================================= */

      completedToday: {
        type: Boolean,

        default: false,
      },

      /* =========================================
         LAST COMPLETION
      ========================================= */

      lastCompletedAt: {
        type: Date,

        default: null,
      },

      /* =========================================
         TODAY COMPLETION DATE
      ========================================= */

      lastCompletedDate:
        {
          type: String,

          default: "",
        },

      /* =========================================
         SECURITY
      ========================================= */

      lastIP: {
        type: String,

        default: "",
      },

      lastUserAgent: {
        type: String,

        default: "",
      },

      /* =========================================
         STREAK
      ========================================= */

      streakCount: {
        type: Number,

        default: 0,
      },

      /* =========================================
         LAST CLAIMED REWARD
      ========================================= */

      lastRewardAmount:
        {
          type: Number,

          default: 0,
        },
    },

    {
      timestamps: true,
    }
  );

/* =========================================
   UNIQUE USER + AD
========================================= */

PTCUserProgressSchema.index(
  {
    userId: 1,
    adId: 1,
  },

  {
    unique: true,
  }
);

/* =========================================
   LOOKUP INDEXES
========================================= */

PTCUserProgressSchema.index({
  userId: 1,
});

PTCUserProgressSchema.index({
  adId: 1,
});

module.exports =
  mongoose.model(
    "PTCUserProgress",

    PTCUserProgressSchema
  );