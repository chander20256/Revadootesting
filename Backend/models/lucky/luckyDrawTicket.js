const mongoose =
  require("mongoose");

const luckyDrawTicketSchema =
  new mongoose.Schema(
    {
      /* -----------------------------
         Lucky Draw Relation
      ----------------------------- */

      drawId: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "LuckyDraw",

        required: true,

        index: true,
      },

      /* -----------------------------
         User Relation
      ----------------------------- */

      userId: {
        type:
          mongoose.Schema
            .Types
            .ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      /* -----------------------------
         User Snapshot
      ----------------------------- */

      username: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      /* -----------------------------
         Ticket Information
      ----------------------------- */

      ticketNumber: {
        type: Number,
        required: true,
        unique: true,
        index: true,
        min: 111111,
        max: 999999,
      },

      ticketId: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      /* -----------------------------
         Ticket Status
      ----------------------------- */

      status: {
        type: String,
        enum: [
          "active",
          "winner",
          "expired",
        ],
        default: "active",
        index: true,
      },

      isWinner: {
        type: Boolean,
        default: false,
      },

      /* -----------------------------
         Winner Claim
      ----------------------------- */

      rewardClaimed: {
        type: Boolean,
        default: false,
      },

      claimedAt: {
        type: Date,
        default: null,
      },

      /* -----------------------------
         Security
      ----------------------------- */

      purchaseIP: {
        type: String,
        default: null,
      },

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

luckyDrawTicketSchema.index({
  drawId: 1,
  userId: 1,
});

luckyDrawTicketSchema.index({
  ticketId: "text",
});

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  mongoose.model(
    "LuckyDrawTicket",
    luckyDrawTicketSchema
  );