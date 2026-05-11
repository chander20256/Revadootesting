const mongoose = require(
  "mongoose"
);

const credsCodeSchema =
  new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
      },

      reward: {
        type: String,
        required: true,
      },

      maxClaims: {
        type: Number,
        required: true,
        default: 1,
      },

      totalClaimed: {
        type: Number,
        default: 0,
      },

      expiryDate: {
        type: Date,
      },

      status: {
        type: String,

        enum: [
          "Active",
          "Completed",
          "Expired",
        ],

        default: "Active",
      },

      claimedUsers: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "User",
        },
      ],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "CredsCode",
    credsCodeSchema
  );