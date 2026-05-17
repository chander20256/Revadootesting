const PTCAds =
  require("../../models/ptcads/PTCAdsModel");

const PTCActiveSession =
  require("../../models/ptcads/PTCActiveSessionModel");

const PTCUserProgress =
  require("../../models/ptcads/PTCUserProgressModel");

const User =
  require("../../models/User");

/* =========================================
   START PTC SESSION
========================================= */

exports.startPTCSession =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const { adId } =
        req.body;

      /* =========================================
         CHECK AD
      ========================================= */

      const ad =
        await PTCAds.findById(
          adId
        );

      if (!ad) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "PTC ad not found",
          });
      }

      if (
        ad.status !==
        "active"
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "PTC ad is paused",
          });
      }

      /* =========================================
         CHECK ACTIVE SESSION
      ========================================= */

      const existingSession =
        await PTCActiveSession.findOne(
          {
            userId,

            status:
              "active",
          }
        );

      if (
        existingSession
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Complete your active PTC ad first",
          });
      }

      /* =========================================
         CHECK DAILY CLAIM
      ========================================= */

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const progress =
        await PTCUserProgress.findOne(
          {
            userId,

            adId,
          }
        );

      if (
        progress &&
        progress.lastCompletedDate ===
          today
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "You already completed this ad today",
          });
      }

      /* =========================================
         CREATE SESSION
      ========================================= */

      const expiresAt =
        new Date(
          Date.now() +
            5 * 60 * 1000
        );

      const session =
        await PTCActiveSession.create(
          {
            userId,

            adId,

            expiresAt,

            ipAddress:
              req.ip,

            userAgent:
              req.headers[
                "user-agent"
              ],
          }
        );

      return res
        .status(201)
        .json({
          success: true,

          message:
            "PTC session started",

          session,
        });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =========================================
   COMPLETE PTC SESSION
========================================= */

exports.completePTCSession =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const { adId } =
        req.body;

      /* =========================================
         GET SESSION
      ========================================= */

      const session =
        await PTCActiveSession.findOne(
          {
            userId,

            adId,

            status:
              "active",
          }
        );

      if (!session) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "No active session found",
          });
      }

      /* =========================================
         GET AD
      ========================================= */

      const ad =
        await PTCAds.findById(
          adId
        );

      if (!ad) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "PTC ad not found",
          });
      }

      /* =========================================
         VALIDATE TIMER
      ========================================= */

      const timePassed =
        (
          Date.now() -
          new Date(
            session.startedAt
          ).getTime()
        ) / 1000;

      if (
        timePassed <
        ad.timer
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Timer not completed",
          });
      }

      /* =========================================
         UPDATE USER REWARD
      ========================================= */

      await User.findByIdAndUpdate(
        userId,

        {
          $inc: {
            totalCreds:
              ad.reward,
          },
        }
      );

      /* =========================================
         UPDATE PTC AD ANALYTICS
      ========================================= */

      await PTCAds.findByIdAndUpdate(
        adId,

        {
          $inc: {
            totalViews: 1,

            totalCompletions: 1,

            totalRewardsDistributed:
              ad.reward,

            todayViews: 1,

            todayCompletions: 1,

            todayRewardsDistributed:
              ad.reward,
          },
        }
      );

      /* =========================================
         UPDATE USER PROGRESS
      ========================================= */

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      await PTCUserProgress.findOneAndUpdate(
        {
          userId,

          adId,
        },

        {
          $inc: {
            totalCompleted: 1,

            totalRewardsEarned:
              ad.reward,
          },

          completedToday: true,

          lastCompletedAt:
            new Date(),

          lastCompletedDate:
            today,

          lastRewardAmount:
            ad.reward,

          lastIP:
            req.ip,

          lastUserAgent:
            req.headers[
              "user-agent"
            ],
        },

        {
          upsert: true,

          new: true,
        }
      );

      /* =========================================
         REMOVE SESSION
      ========================================= */

      await PTCActiveSession.deleteOne(
        {
          _id:
            session._id,
        }
      );

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Reward claimed successfully",

          reward:
            ad.reward,
        });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =========================================
   CANCEL PTC SESSION
========================================= */

exports.cancelPTCSession =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      await PTCActiveSession.deleteMany(
        {
          userId,
        }
      );

      return res
        .status(200)
        .json({
          success: true,

          message:
            "PTC session cancelled",
        });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =========================================
   GET ACTIVE SESSION
========================================= */

exports.getActivePTCSession =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const session =
        await PTCActiveSession.findOne(
          {
            userId,

            status:
              "active",
          }
        ).populate(
          "adId"
        );

      return res
        .status(200)
        .json({
          success: true,

          session,
        });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };