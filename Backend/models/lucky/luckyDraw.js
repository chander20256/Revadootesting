const mongoose =
  require("mongoose");

const luckyDrawSchema =
  new mongoose.Schema(
    {
      /* -----------------------------
         Reward Details
      ----------------------------- */

      rewardTitle: {
        type: String,

        required: true,

        trim: true,

        maxlength: 120,
      },

      rewardImage: {
        type: String,

        default: null,
      },

      description: {
        type: String,

        default: "",

        maxlength: 1000,
      },

      /* -----------------------------
         Draw Configuration
      ----------------------------- */

      entryFee: {
        type: Number,

        required: true,

        min: 1,
      },

      totalWinners: {
        type: Number,

        required: true,

        min: 1,
      },

      maxTicketsPerUser:
        {
          type: Number,

          default: 5,

          max: 5,

          min: 1,
        },

      durationDays: {
        type: Number,

        required: true,

        min: 1,
      },

      /* -----------------------------
         Draw Status
      ----------------------------- */

      status: {
  type: String,

  enum: [
    "active",
    "picking",
    "completed",
    "cancelled",
  ],

  default: "active",

  index: true,
},

      /* -----------------------------
         Draw Statistics
      ----------------------------- */

      ticketsSold: {
        type: Number,

        default: 0,

        min: 0,
      },

      participants: {
        type: Number,

        default: 0,

        min: 0,
      },

      credsBurned: {
        type: Number,

        default: 0,

        min: 0,
      },

      /* -----------------------------
         Ticket System
      ----------------------------- */

      startingTicketNumber:
        {
          type: Number,

          default: 111111,
        },

      currentTicketNumber:
        {
          type: Number,

          default: 111111,
        },

      /* -----------------------------
         Winner Information
      ----------------------------- */

      winningTickets: [
        {
          ticketId:
            String,

          userId: {
            type:
              mongoose
                .Schema
                .Types
                .ObjectId,

            ref: "User",
          },

          username:
            String,
        },
      ],

      /* -----------------------------
         Dates
      ----------------------------- */

      startedAt: {
        type: Date,

        default:
          Date.now,
      },

      endsAt: {
        type: Date,

        required: true,
      },

      completedAt: {
        type: Date,

        default: null,
      },

      /* -----------------------------
         Admin Tracking
      ----------------------------- */

      createdBy: {
        type: String,

        default:
          "ADMINREVADOO",
      },
    },
    {
      timestamps: true,
    }
  );

/* -----------------------------
   INDEXES
----------------------------- */

luckyDrawSchema.index({
  rewardTitle: "text",

  description: "text",
});

luckyDrawSchema.index({
  status: 1,

  createdAt: -1,
});

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  mongoose.model(
    "LuckyDraw",
    luckyDrawSchema
  );