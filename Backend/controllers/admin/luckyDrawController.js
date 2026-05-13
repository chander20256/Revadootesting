const LuckyDraw = require(
  "../../models/lucky/luckyDraw"
);

const LuckyDrawTicket = require(
  "../../models/lucky/luckyDrawTicket"
);

const User = require(
  "../../models/User"
);

/* =======================================================
   CREATE NEW LUCKY DRAW
======================================================= */

const createLuckyDraw =
  async (req, res) => {
    try {
      const {
        rewardTitle,
        rewardImage,
        description,
        entryFee,
        totalWinners,
        maxTicketsPerUser,
        durationDays,
      } = req.body;

      /* VALIDATION */

      if (
        !rewardTitle ||
        !entryFee ||
        !totalWinners ||
        !durationDays
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Missing required fields",
          });
      }

      /* CHECK ACTIVE DRAW */

      const existingDraw =
        await LuckyDraw.findOne(
          {
            status:
              "active",
          }
        );

      if (
        existingDraw
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Only one active lucky draw allowed",
          });
      }

      /* END DATE */

      const endsAt =
        new Date();

      endsAt.setDate(
        endsAt.getDate() +
          Number(
            durationDays
          )
      );

      /* CREATE */

      const newDraw =
        await LuckyDraw.create(
          {
            rewardTitle,

            rewardImage,

            description,

            entryFee:
              Number(
                entryFee
              ),

            totalWinners:
              Number(
                totalWinners
              ),

            maxTicketsPerUser:
              Number(
                maxTicketsPerUser
              ) || 5,

            durationDays:
              Number(
                durationDays
              ),

            endsAt,

            createdBy:
              "ADMINREVADOO",
          }
        );

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Lucky draw created successfully",

          draw:
            newDraw,
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   UPDATE DRAW
======================================================= */

const updateLuckyDraw =
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      const {
        rewardTitle,
        rewardImage,
        description,
        entryFee,
        totalWinners,
        durationDays,
      } = req.body;

      const draw =
        await LuckyDraw.findById(
          id
        );

      if (!draw) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Lucky draw not found",
          });
      }

      /* UPDATE */

      draw.rewardTitle =
        rewardTitle;

      draw.rewardImage =
        rewardImage;

      draw.description =
        description;

      draw.entryFee =
        Number(
          entryFee
        );

      draw.totalWinners =
        Number(
          totalWinners
        );

      draw.durationDays =
        Number(
          durationDays
        );

      /* UPDATE END DATE */

      const endsAt =
        new Date();

      endsAt.setDate(
        endsAt.getDate() +
          Number(
            durationDays
          )
      );

      draw.endsAt =
        endsAt;

      await draw.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Lucky draw updated successfully",

          draw,
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   GET CURRENT DRAW
======================================================= */

const getCurrentLuckyDraw =
  async (
    req,
    res
  ) => {
    try {
      const draw =
        await LuckyDraw.findOne(
          {
            status:
              "active",
          }
        ).sort({
          createdAt:
            -1,
        });

      if (!draw) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "No active draw found",
          });
      }

      /* TIMER */

      const now =
        new Date();

      const distance =
        new Date(
          draw.endsAt
        ) - now;

      const days =
        Math.floor(
          distance /
            (1000 *
              60 *
              60 *
              24)
        );

      const hours =
        Math.floor(
          (distance %
            (1000 *
              60 *
              60 *
              24)) /
            (1000 *
              60 *
              60)
        );

      const minutes =
        Math.floor(
          (distance %
            (1000 *
              60 *
              60)) /
            (1000 *
              60)
        );

      const seconds =
        Math.floor(
          (distance %
            (1000 *
              60)) /
            1000
        );

      return res
        .status(200)
        .json({
          success: true,

          _id:
            draw._id,

          rewardTitle:
            draw.rewardTitle,

          rewardImage:
            draw.rewardImage,

          description:
            draw.description,

          entryFee:
            draw.entryFee,

          totalWinners:
            draw.totalWinners,

          ticketsSold:
            draw.ticketsSold,

          participants:
            draw.participants,

          credsBurned:
            draw.credsBurned,

          duration:
            draw.durationDays,

          status:
            draw.status,

          timer: {
            days:
              String(
                days
              ).padStart(
                2,
                "0"
              ),

            hours:
              String(
                hours
              ).padStart(
                2,
                "0"
              ),

            minutes:
              String(
                minutes
              ).padStart(
                2,
                "0"
              ),

            seconds:
              String(
                seconds
              ).padStart(
                2,
                "0"
              ),
          },
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   GET STATS
======================================================= */

const getLuckyDrawStats =
  async (
    req,
    res
  ) => {
    try {
      const activeDraw =
        await LuckyDraw.findOne(
          {
            status:
              "active",
          }
        );

      return res
        .status(200)
        .json({
          success: true,

          currentDraw:
            activeDraw
              ? 1
              : 0,

          ticketsSold:
            activeDraw
              ?.ticketsSold ||
            0,

          participants:
            activeDraw
              ?.participants ||
            0,

          credsBurned:
            activeDraw
              ?.credsBurned ||
            0,

          timeLeft:
            activeDraw
              ? "Live"
              : "No Active Draw",
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   GET HISTORY
======================================================= */

const getLuckyDrawHistory =
  async (
    req,
    res
  ) => {
    try {
      const history =
        await LuckyDraw.find(
          {
            status:
              "completed",
          }
        )
          .sort({
            completedAt:
              -1,
          })
          .limit(50);

      return res
        .status(200)
        .json(
          history
        );
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   PURCHASE TICKETS
======================================================= */

const purchaseLuckyDrawTickets =
  async (
    req,
    res
  ) => {
    try {
      return res
        .status(200)
        .json({
          success: true,

          message:
            "Ticket purchase API ready",
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   PICK WINNERS
======================================================= */

const pickLuckyDrawWinners =
  async (
    req,
    res
  ) => {
    try {
      return res
        .status(200)
        .json({
          success: true,

          message:
            "Winner picker API ready",
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   END DRAW
======================================================= */

const endLuckyDraw =
  async (
    req,
    res
  ) => {
    try {
      return res
        .status(200)
        .json({
          success: true,

          message:
            "End draw API ready",
        });
    } catch (error) {
      console.log(
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server error",
        });
    }
  };

/* =======================================================
   EXPORTS
======================================================= */

module.exports = {
  createLuckyDraw,

  updateLuckyDraw,

  getCurrentLuckyDraw,

  getLuckyDrawStats,

  getLuckyDrawHistory,

  purchaseLuckyDrawTickets,

  pickLuckyDrawWinners,

  endLuckyDraw,
};