const express = require("express");

const router = express.Router();

const Ad = require("../../models/Ad");

const generateAdId = require("../../utils/generateAdId");

/* -----------------------------------
   CREATE AD
----------------------------------- */

router.post("/", async (req, res) => {
  try {
    const ad = await Ad.create({
      adId: generateAdId(),

      adName: req.body.adName,

      adCode: req.body.adCode,

      type: req.body.type,

      device: req.body.device,

      status: req.body.status,
    });

    res.status(201).json({
      success: true,
      message:
        "Ad created successfully",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* -----------------------------------
   GET ALL ADS
----------------------------------- */

router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* -----------------------------------
   GET SINGLE AD BY MONGODB ID
----------------------------------- */

router.get("/single/:id", async (req, res) => {
  try {
    const ad = await Ad.findById(
      req.params.id
    );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.status(200).json({
      success: true,
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* -----------------------------------
   GET AD BY CUSTOM adId
----------------------------------- */

router.get("/:adId", async (req, res) => {
  try {
    const ad = await Ad.findOne({
      adId: req.params.adId,

      status: "Active",
    });

    if (!ad) {
      return res.status(404).json({
        success: false,
        message:
          "No active ad found",
      });
    }

    res.status(200).json({
      success: true,
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* -----------------------------------
   UPDATE AD
----------------------------------- */

router.put("/:id", async (req, res) => {
  try {
    const ad =
      await Ad.findByIdAndUpdate(
        req.params.id,
        {
          adName:
            req.body.adName,

          adCode:
            req.body.adCode,

          type:
            req.body.type,

          device:
            req.body.device,

          status:
            req.body.status,
        },
        {
          new: true,
        }
      );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Ad updated successfully",
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* -----------------------------------
   TOGGLE STATUS
----------------------------------- */

router.patch(
  "/toggle/:id",
  async (req, res) => {
    try {
      const ad =
        await Ad.findById(
          req.params.id
        );

      if (!ad) {
        return res.status(404).json({
          success: false,
          message:
            "Ad not found",
        });
      }

      ad.status =
        ad.status === "Active"
          ? "Inactive"
          : "Active";

      await ad.save();

      res.status(200).json({
        success: true,
        message:
          "Status updated",
        ad,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/* -----------------------------------
   DELETE AD
----------------------------------- */

router.delete(
  "/:id",
  async (req, res) => {
    try {
      const ad =
        await Ad.findByIdAndDelete(
          req.params.id
        );

      if (!ad) {
        return res.status(404).json({
          success: false,
          message: "Ad not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Ad deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;