/* =========================================
   Backend/controllers/admin/shortlinkController.js
========================================= */

const axios = require(
  "axios"
);

const Shortlink = require(
  "../../models/shortlinks/shortlink"
);

/* ==================================================
   CREATE SHORTLINK
================================================== */

exports.createShortlink =
  async (req, res) => {
    try {
      const {
        title,
        description,
        originalUrl,
        reward,
        expReward,
        timer,
        dailyLimit,
        cooldown,
        status,
        category,
        featured,
        apiMode,
        provider,
        apiKey,
      } = req.body;

      /* -----------------------------
         VALIDATION
      ----------------------------- */

      if (!title) {
        return res.status(400).json({
          success: false,

          message:
            "Title is required",
        });
      }

      if (!originalUrl) {
        return res.status(400).json({
          success: false,

          message:
            "Original URL is required",
        });
      }

      /* -----------------------------
         GENERATE PROVIDER SHORTLINK
      ----------------------------- */

      let generatedShortUrl =
        null;

      if (
        apiMode &&
        apiKey
      ) {
        try {
          /* -----------------------------
             GPLINKS
          ----------------------------- */

        /* -----------------------------
   GPLINKS
----------------------------- */

if (
  provider ===
  "gplinks"
) {
  const apiUrl =
    `https://api.gplinks.com/api?api=${apiKey}&url=${encodeURIComponent(
      originalUrl
    )}`;

  console.log(
    "GPLINKS URL:",
    apiUrl
  );

  const response =
    await axios.get(apiUrl);

  console.log(
    "GPLINKS RESPONSE:",
    response.data
  );

  if (
    typeof response.data ===
    "string"
  ) {
    generatedShortUrl =
      response.data;
  }

  else if (
    response.data
      ?.shortenedUrl
  ) {
    generatedShortUrl =
      response.data
        .shortenedUrl;
  }

  else {
    generatedShortUrl =
      null;
  }
}

          /* -----------------------------
             SHRINKME
          ----------------------------- */

          if (
            provider ===
            "shrinkme"
          ) {
            const apiUrl =
              `https://shrinkme.io/api?api=${apiKey}&url=${encodeURIComponent(
                originalUrl
              )}&format=json`;

            const response =
              await axios.get(
                apiUrl
              );

            console.log(
              "SHRINKME RESPONSE:",
              response.data
            );

            generatedShortUrl =
              response.data
                .shortenedUrl;
          }

          /* -----------------------------
             EXE.IO
          ----------------------------- */

          if (
            provider ===
            "exeio"
          ) {
            const apiUrl =
              `https://exe.io/api?api=${apiKey}&url=${encodeURIComponent(
                originalUrl
              )}&format=json`;

            const response =
              await axios.get(
                apiUrl
              );

            console.log(
              "EXE.IO RESPONSE:",
              response.data
            );

            generatedShortUrl =
              response.data
                .shortenedUrl;
          }

          /* -----------------------------
             LINKVERTISE
          ----------------------------- */

          if (
            provider ===
            "linkvertise"
          ) {
            generatedShortUrl =
              originalUrl;
          }
        } catch (
          providerError
        ) {
          console.log(
            "PROVIDER ERROR:",
            providerError
          );
        }
      }

      /* -----------------------------
         CREATE SHORTLINK
      ----------------------------- */

      const shortlink =
        await Shortlink.create({
          title,

          description,

          originalUrl,

          shortUrl:
            generatedShortUrl,

          reward:
            Number(reward) ||
            0,

          expReward:
            Number(
              expReward
            ) || 0,

          timer:
            Number(timer) ||
            0,

          dailyLimit:
            Number(
              dailyLimit
            ) || 0,

          cooldown:
            Number(
              cooldown
            ) || 0,

          status:
            status ||
            "active",

          category:
            category ||
            "general",

          featured:
            featured || false,

          apiMode:
            apiMode || false,

          provider:
            provider ||
            "gplinks",

          apiKey:
            apiKey || null,

          createdBy:
            req.user._id,
        });

      /* -----------------------------
         RESPONSE
      ----------------------------- */

      return res.status(201).json({
        success: true,

        message:
          "Shortlink created successfully",

        shortlink,
      });
    } catch (error) {
      console.error(
        "CREATE SHORTLINK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to create shortlink",
      });
    }
  };

/* ==================================================
   GET ALL SHORTLINKS
================================================== */

exports.getAllShortlinks =
  async (req, res) => {
    try {
      const shortlinks =
        await Shortlink.find()

          .populate(
            "createdBy",
            "username email"
          )

          .sort({
            featured: -1,

            priority: -1,

            createdAt: -1,
          });

      return res.status(200).json({
        success: true,

        total:
          shortlinks.length,

        shortlinks,
      });
    } catch (error) {
      console.error(
        "GET SHORTLINKS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to fetch shortlinks",
      });
    }
  };

/* ==================================================
   GET SINGLE SHORTLINK
================================================== */

exports.getSingleShortlink =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const shortlink =
        await Shortlink.findById(
          id
        ).populate(
          "createdBy",
          "username email"
        );

      if (!shortlink) {
        return res.status(404).json({
          success: false,

          message:
            "Shortlink not found",
        });
      }

      return res.status(200).json({
        success: true,

        shortlink,
      });
    } catch (error) {
      console.error(
        "GET SINGLE SHORTLINK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to fetch shortlink",
      });
    }
  };

/* ==================================================
   UPDATE SHORTLINK
================================================== */

exports.updateShortlink =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const updatedShortlink =
        await Shortlink.findByIdAndUpdate(
          id,

          req.body,

          {
            new: true,

            runValidators: true,
          }
        );

      if (
        !updatedShortlink
      ) {
        return res.status(404).json({
          success: false,

          message:
            "Shortlink not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Shortlink updated successfully",

        shortlink:
          updatedShortlink,
      });
    } catch (error) {
      console.error(
        "UPDATE SHORTLINK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to update shortlink",
      });
    }
  };

/* ==================================================
   DELETE SHORTLINK
================================================== */

exports.deleteShortlink =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const deletedShortlink =
        await Shortlink.findByIdAndDelete(
          id
        );

      if (
        !deletedShortlink
      ) {
        return res.status(404).json({
          success: false,

          message:
            "Shortlink not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "Shortlink deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE SHORTLINK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to delete shortlink",
      });
    }
  };

/* ==================================================
   TOGGLE SHORTLINK STATUS
================================================== */

exports.toggleShortlinkStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const shortlink =
        await Shortlink.findById(
          id
        );

      if (!shortlink) {
        return res.status(404).json({
          success: false,

          message:
            "Shortlink not found",
        });
      }

      shortlink.status =
        shortlink.status ===
        "active"
          ? "paused"
          : "active";

      await shortlink.save();

      return res.status(200).json({
        success: true,

        message:
          "Shortlink status updated",

        status:
          shortlink.status,
      });
    } catch (error) {
      console.error(
        "TOGGLE STATUS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to toggle status",
      });
    }
  };