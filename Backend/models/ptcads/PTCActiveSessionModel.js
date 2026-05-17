const mongoose =
  require("mongoose");

const PTCActiveSessionSchema =
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
         SESSION STATUS
      ========================================= */

      status: {
        type: String,

        enum: [
          "active",
          "completed",
          "cancelled",
          "expired",
        ],

        default:
          "active",
      },

      /* =========================================
         STARTED TIME
      ========================================= */

      startedAt: {
        type: Date,

        default:
          Date.now,
      },

      /* =========================================
         EXPIRE TIME
      ========================================= */

      expiresAt: {
        type: Date,

        required: true,
      },

      /* =========================================
         USER IP
      ========================================= */

      ipAddress: {
        type: String,

        default: "",
      },

      /* =========================================
         DEVICE INFO
      ========================================= */

      userAgent: {
        type: String,

        default: "",
      },

      /* =========================================
         SECURITY
      ========================================= */

      completedAt: {
        type: Date,

        default: null,
      },

      failedReason: {
        type: String,

        default: "",
      },
    },

    {
      timestamps: true,
    }
  );

/* =========================================
   ONE ACTIVE SESSION PER USER
========================================= */

PTCActiveSessionSchema.index(
  {
    userId: 1,
    status: 1,
  }
);

/* =========================================
   USER + AD LOOKUP
========================================= */

PTCActiveSessionSchema.index(
  {
    userId: 1,
    adId: 1,
  }
);

/* =========================================
   AUTO DELETE EXPIRED SESSIONS
========================================= */

PTCActiveSessionSchema.index(
  {
    expiresAt: 1,
  },

  {
    expireAfterSeconds: 0,
  }
);

module.exports =
  mongoose.model(
    "PTCActiveSession",

    PTCActiveSessionSchema
  );