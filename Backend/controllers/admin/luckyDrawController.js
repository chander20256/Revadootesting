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

      /* SAFE VALUES */

      const rewardTitle =
        req.body.rewardTitle ??
        draw.rewardTitle;

      const rewardImage =
        req.body.rewardImage ??
        draw.rewardImage;

      const description =
        req.body.description ??
        draw.description;

      const entryFee =
        req.body.entryFee !==
          "" &&
          req.body.entryFee !==
          undefined
          ? Number(
            req.body.entryFee
          )
          : draw.entryFee;

      const totalWinners =
        req.body
          .totalWinners !==
          "" &&
          req.body
            .totalWinners !==
          undefined
          ? Number(
            req.body
              .totalWinners
          )
          : draw.totalWinners;

      const durationDays =
        req.body
          .durationDays !==
          "" &&
          req.body
            .durationDays !==
          undefined
          ? Number(
            req.body
              .durationDays
          )
          : draw.durationDays;

      /* UPDATE DRAW */

      draw.rewardTitle =
        rewardTitle;

      draw.rewardImage =
        rewardImage;

      draw.description =
        description;

      draw.entryFee =
        entryFee;

      draw.totalWinners =
        totalWinners;

      draw.durationDays =
        durationDays;

      /* UPDATE TIMER */

      const endsAt =
        new Date();

      endsAt.setDate(
        endsAt.getDate() +
        durationDays
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
            error.message ||
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
            status: {
              $in: [
                "active",
                "picking",
                "completed",
              ],
            },
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

      /* =======================================================
         USER PURCHASED TICKETS
      ======================================================= */

      let userPurchasedTickets = 0;
      let isCurrentUserWinner =
        false;

      if (
        req.user?.id
      ) {
        userPurchasedTickets =
          await LuckyDrawTicket.countDocuments(
            {
              drawId:
                draw._id,

              userId:
                req.user.id,
            }
          );
      }
      /* CHECK IF CURRENT USER WON */

      if (
        draw.status ===
        "completed"
      ) {
        isCurrentUserWinner =
          draw.winningTickets.some(
            (
              winner
            ) =>
              String(
                winner.userId
              ) ===
              String(
                req.user?.id
              )
          );
      }
      /* =======================================================
         REMAINING TICKETS
      ======================================================= */

      const remainingTickets =
        Math.max(
          0,
          draw.maxTicketsPerUser -
          userPurchasedTickets
        );

      /* =======================================================
         TIMER
      ======================================================= */

      const now =
        new Date();

      let distance =
        new Date(
          draw.endsAt
        ) - now;

      /* PREVENT NEGATIVE TIMER */

      if (distance < 0) {
        distance = 0;
      }

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

      /* =======================================================
         RESPONSE
      ======================================================= */

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

          maxTicketsPerUser:
            draw.maxTicketsPerUser,

          userPurchasedTickets,

          remainingTickets,

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

          endsAt:
            draw.endsAt,
          winningTickets:
            draw.winningTickets,

          isCurrentUserWinner,

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
           status: {
  $in: [
    "active",
    "picking",
  ],
},
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
      const {
        drawId,
        tickets,
      } = req.body;

      /* USER */

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "User not found",
          });
      }

      /* DRAW */

      const draw =
        await LuckyDraw.findOne(
          {
            _id: drawId,

            status:
              "active",
          }
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

      /* VALIDATION */

      const totalTickets =
        Number(tickets);

      if (
        totalTickets < 1
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid ticket quantity",
          });
      }

      /* CHECK EXISTING */

      const existingTickets =
        await LuckyDrawTicket.countDocuments(
          {
            drawId:
              draw._id,

            userId:
              user._id,
          }
        );

      if (
        existingTickets +
        totalTickets >
        draw.maxTicketsPerUser
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message: `Maximum ${draw.maxTicketsPerUser} tickets allowed`,
          });
      }

      /* TOTAL PRICE */

      const totalPrice =
        draw.entryFee *
        totalTickets;

      /* CHECK USER CREDS */

      if (
        user.creds <
        totalPrice
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Insufficient creds",
          });
      }

      /* CHECK PARTICIPANT */

      const alreadyJoined =
        await LuckyDrawTicket.exists(
          {
            drawId:
              draw._id,

            userId:
              user._id,
          }
        );

      /* REMOVE USER CREDS */

      user.creds -=
        totalPrice;

      await user.save();

      /* CREATE TICKETS */

      const createdTickets =
        [];

      for (
        let i = 0;
        i < totalTickets;
        i++
      ) {
        const ticketNumber =
          draw.currentTicketNumber;

        const ticket =
          await LuckyDrawTicket.create(
            {
              /* DRAW */

              drawId:
                draw._id,

              /* USER */

              userId:
                user._id,

              username:
                user.username,

              email:
                user.email,

              /* TICKET */

              ticketNumber,

              ticketId:
                `REVA-LD-${ticketNumber}`,

              /* SECURITY */

              purchaseIP:
                req.ip,

              userAgent:
                req.headers[
                "user-agent"
                ] || "Unknown",
            }
          );

        createdTickets.push(
          ticket
        );

        draw.currentTicketNumber += 1;
      }

      /* UPDATE DRAW */

      draw.ticketsSold +=
        totalTickets;

      draw.credsBurned +=
        totalPrice;

      if (
        !alreadyJoined
      ) {
        draw.participants += 1;
      }

      await draw.save();

      /* RESPONSE */

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Tickets purchased successfully",

          tickets:
            createdTickets,

          remainingCreds:
            user.creds,
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