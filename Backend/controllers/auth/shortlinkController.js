const crypto = require(
  "crypto"
);

const axios = require(
  "axios"
);

/* -----------------------------
   MODELS
----------------------------- */

const User = require(
  "../../models/User"
);

const Shortlink = require(
  "../../models/shortlinks/shortlink"
);

const ShortlinkSession = require(
  "../../models/shortlinks/ShortlinkSession"
);

/* ==================================================
   START SHORTLINK
================================================== */

exports.startShortlink =
  async (req, res) => {
    try {
      /* -----------------------------
         USER
      ----------------------------- */

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }

      /* -----------------------------
         SHORTLINK
      ----------------------------- */

      const shortlink =
        await Shortlink.findById(
          req.params.id
        ).select("+apiKey");

      if (!shortlink) {
        return res.status(404).json({
          success: false,

          message:
            "Shortlink not found",
        });
      }

      /* -----------------------------
         STATUS CHECK
      ----------------------------- */

      if (
        shortlink.status !==
        "active"
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Shortlink is not active",
        });
      }

      /* -----------------------------
         GENERATE SESSION
      ----------------------------- */

      const sessionId =
        crypto
          .randomBytes(16)
          .toString("hex");

      /* -----------------------------
         CREATE SESSION
      ----------------------------- */

      await ShortlinkSession.create({
        sessionId,

        userId:
          user._id,

        shortlinkId:
          shortlink._id,

        reward:
          shortlink.reward,

        ipAddress:
          req.ip,

        userAgent:
          req.headers[
            "user-agent"
          ],
      });

      /* -----------------------------
         UPDATE VISITS
      ----------------------------- */

      shortlink.totalVisits += 1;

      await shortlink.save();

      /* -----------------------------
         CALLBACK URL
      ----------------------------- */

      const callbackUrl =
        `https://revadoobackend.onrender.com/api/shortlinks/complete/${sessionId}`;

      /* -----------------------------
         SHRINKME API
      ----------------------------- */

      const apiKey =
        shortlink.apiKey;

      const apiUrl =
        `https://shrinkme.io/api?api=${apiKey}&url=${encodeURIComponent(
          callbackUrl
        )}&format=text`;

      const response =
        await axios.get(apiUrl);

      /* -----------------------------
         GENERATED SHORT URL
      ----------------------------- */

      const generatedShortlink =
        response.data;

      /* -----------------------------
         SAVE GENERATED URL
      ----------------------------- */

      shortlink.shortUrl =
        generatedShortlink;

      await shortlink.save();

      /* -----------------------------
         RESPONSE
      ----------------------------- */

      return res.status(200).json({
        success: true,

        shortlink:
          generatedShortlink,
      });
    } catch (error) {
      console.log(
        "START SHORTLINK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to generate shortlink",
      });
    }
  };

/* ==================================================
   COMPLETE SHORTLINK
================================================== */

exports.completeShortlink =
  async (req, res) => {
    try {
      const { sessionId } =
        req.params;

      /* -----------------------------
         FIND SESSION
      ----------------------------- */

      const session =
        await ShortlinkSession.findOne(
          {
            sessionId,
          }
        );

      if (!session) {
        return res
          .status(404)
          .send(
            "Invalid session"
          );
      }

      /* -----------------------------
         ALREADY CLAIMED
      ----------------------------- */

      if (
        session.status ===
        "completed"
      ) {
        return res.send(
          "Reward already claimed"
        );
      }

      /* -----------------------------
         USER
      ----------------------------- */

      const user =
        await User.findById(
          session.userId
        );

      if (!user) {
        return res
          .status(404)
          .send(
            "User not found"
          );
      }

      /* -----------------------------
         SHORTLINK
      ----------------------------- */

      const shortlink =
        await Shortlink.findById(
          session.shortlinkId
        );

      if (!shortlink) {
        return res
          .status(404)
          .send(
            "Shortlink not found"
          );
      }

      /* -----------------------------
         GIVE REWARD
      ----------------------------- */

      user.creds +=
        session.reward;

      user.exp +=
        shortlink.expReward ||
        0;

      await user.save();

      /* -----------------------------
         UPDATE SESSION
      ----------------------------- */

      session.status =
        "completed";

      session.completedAt =
        new Date();

      await session.save();

      /* -----------------------------
         UPDATE ANALYTICS
      ----------------------------- */

      shortlink.totalCompleted += 1;

      shortlink.totalRewardsGiven +=
        session.reward;

      await shortlink.save();

      /* -----------------------------
         REDIRECT USER
      ----------------------------- */

      return res.redirect(
        "https://revadoo.vercel.app/dashboard/shortlinks"
      );
    } catch (error) {
      console.log(
        "COMPLETE SHORTLINK ERROR:",
        error
      );

      return res
        .status(500)
        .send(
          "Server Error"
        );
    }
  };