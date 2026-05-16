const mongoose = require(
  "mongoose"
);

const shortlinkSessionSchema =
  new mongoose.Schema(
    {
      /* -----------------------------
         SESSION ID
      ----------------------------- */

      sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      /* -----------------------------
         USER
      ----------------------------- */

      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      /* -----------------------------
         SHORTLINK
      ----------------------------- */

      shortlinkId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Shortlink",

        required: true,
      },

      /* -----------------------------
         REWARD
      ----------------------------- */

      reward: {
        type: Number,
        default: 0,
        min: 0,
      },

      /* -----------------------------
         SESSION STATUS
      ----------------------------- */

      status: {
        type: String,

        enum: [
          "pending",
          "completed",
          "expired",
        ],

        default: "pending",

        index: true,
      },

      /* -----------------------------
         USER IP
      ----------------------------- */

      ipAddress: {
        type: String,
        default: null,
      },

      /* -----------------------------
         USER AGENT
      ----------------------------- */

      userAgent: {
        type: String,
        default: null,
      },

      /* -----------------------------
         COMPLETED AT
      ----------------------------- */

      completedAt: {
        type: Date,
        default: null,
      },
    },

    {
      timestamps: true,
    }
  );

/* -----------------------------
   INDEXES
----------------------------- */

shortlinkSessionSchema.index({
  userId: 1,
  shortlinkId: 1,
  createdAt: -1,
});

shortlinkSessionSchema.index({
  status: 1,
});

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  mongoose.model(
    "ShortlinkSession",
    shortlinkSessionSchema
  );