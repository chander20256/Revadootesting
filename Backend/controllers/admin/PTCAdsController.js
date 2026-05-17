const PTCAds =
  require(
    "../../models/ptcads/PTCAdsModel"
  );

/* =========================================
   CREATE PTC AD
========================================= */

const createPTCAd =
  async (
    req,
    res
  ) => {
    try {
      const {
        title,

        adType,

        provider,

        adUrl,

        reward,

        timer,

        dailyLimit,

        status,
      } = req.body;

      if (
        !title ||
        !adUrl
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Title and URL are required",
          });
      }

      const newAd =
        await PTCAds.create({
          title,

          adType,

          provider,

          adUrl,

          reward,

          timer,

          dailyLimit,

          status,
        });

      res.status(201).json({
        success: true,

        message:
          "PTC Ad Created Successfully",

        data: newAd,
      });
    } catch (error) {
      console.error(
        "CREATE PTC ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to create PTC Ad",
      });
    }
  };

/* =========================================
   GET ALL PTC ADS
========================================= */

const getAllPTCAds =
  async (
    req,
    res
  ) => {
    try {
      const ads =
        await PTCAds.find().sort(
          {
            createdAt:
              -1,
          }
        );

      res.status(200).json({
        success: true,

        count:
          ads.length,

        data: ads,
      });
    } catch (error) {
      console.error(
        "GET PTC ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to fetch PTC Ads",
      });
    }
  };

/* =========================================
   DELETE PTC AD
========================================= */

const deletePTCAd =
  async (
    req,
    res
  ) => {
    try {
      const ad =
        await PTCAds.findById(
          req.params.id
        );

      if (!ad) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "PTC Ad not found",
          });
      }

      await ad.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "PTC Ad deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE PTC ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to delete PTC Ad",
      });
    }
  };

module.exports = {
  createPTCAd,

  getAllPTCAds,

  deletePTCAd,
};