const Ad = require("../../models/Ad");


// CREATE AD

exports.createAd = async (req, res) => {
  try {
    const ad = await Ad.create(req.body);

    res.status(201).json({
      success: true,
      ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL ADS

exports.getAds = async (req, res) => {
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
};


// GET SINGLE SLOT

exports.getAdBySlot = async (
  req,
  res
) => {
  try {
    const ad = await Ad.findOne({
      slotId: req.params.slotId,
      status: "Active",
    });

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
};


// DELETE AD

exports.deleteAd = async (
  req,
  res
) => {
  try {
    await Ad.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Ad deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};