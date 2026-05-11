const mongoose = require(
  "mongoose"
);

const captchaHistorySchema =
  new mongoose.Schema(
    {
      /* -----------------------------
         USER
      ----------------------------- */

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      /* -----------------------------
         REWARD
      ----------------------------- */

      reward: {
        type: Number,

        required: true,

        min: 1,
      },

      /* -----------------------------
         CLAIM TYPE
      ----------------------------- */

      type: {
        type: String,

        default:
          "Captcha Reward",
      },

      /* -----------------------------
         STATUS
      ----------------------------- */

      status: {
        type: String,

        enum: [
          "Completed",
          "Rejected",
        ],

        default:
          "Completed",
      },

      /* -----------------------------
         IP ADDRESS
      ----------------------------- */

      ipAddress: {
        type: String,

        default: null,
      },

      /* -----------------------------
         DEVICE INFO
      ----------------------------- */

      userAgent: {
        type: String,

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

captchaHistorySchema.index({
  user: 1,

  createdAt: -1,
});

module.exports =
  mongoose.model(
    "CaptchaHistory",
    captchaHistorySchema
  );