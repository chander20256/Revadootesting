const mongoose = require("mongoose");

/* -----------------------------------
   AD SCHEMA
----------------------------------- */

const adSchema = new mongoose.Schema(
  {
    /* -----------------------------------
       UNIQUE 6 DIGIT AD ID
    ----------------------------------- */

    adId: {
      type: String,
      required: true,
      unique: true,
    },

    /* -----------------------------------
       BASIC INFO
    ----------------------------------- */

    adName: {
      type: String,
      required: true,
      trim: true,
    },

    /* -----------------------------------
       RAW AD CODE
    ----------------------------------- */

    adCode: {
      type: String,
      required: true,
    },

    /* -----------------------------------
       AD TYPE
    ----------------------------------- */

    type: {
      type: String,
      default: "Custom",
      enum: [
        "Banner",
        "Native",
        "Popup",
        "Social Bar",
        "iframe",
        "HTML",
        "Custom",
      ],
    },

    /* -----------------------------------
       DEVICE
    ----------------------------------- */

    device: {
      type: String,
      default: "All",
      enum: [
        "All",
        "Desktop",
        "Mobile",
        "Tablet",
      ],
    },

    /* -----------------------------------
       STATUS
    ----------------------------------- */

    status: {
      type: String,
      default: "Active",
      enum: [
        "Active",
        "Inactive",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Ad",
  adSchema
);