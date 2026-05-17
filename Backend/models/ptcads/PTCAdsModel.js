const mongoose =
  require("mongoose");

const PTCAdsSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,

        required: true,

        trim: true,
      },

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

      adUrl: {
        type: String,

        required: true,
      },

      reward: {
        type: Number,

        required: true,

        default: 0,
      },

      timer: {
        type: Number,

        required: true,

        default: 15,
      },

      dailyLimit: {
        type: Number,

        default: 1,
      },

      status: {
        type: String,

        enum: [
          "active",
          "paused",
        ],

        default:
          "active",
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "PTCAds",
    PTCAdsSchema
  );