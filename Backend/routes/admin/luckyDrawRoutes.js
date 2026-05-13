const express =
  require("express");

const router =
  express.Router();

/* -----------------------------
   AUTH MIDDLEWARE
----------------------------- */

const authMiddleware =
  require(
    "../../middleware/auth"
  );

/* -----------------------------
   CONTROLLERS
----------------------------- */

const {
  createLuckyDraw,

  updateLuckyDraw,

  getCurrentLuckyDraw,

  getLuckyDrawStats,

  getLuckyDrawHistory,

  purchaseLuckyDrawTickets,

  pickLuckyDrawWinners,

  endLuckyDraw,
} = require(
  "../../controllers/admin/luckyDrawController"
);

/* -----------------------------
   CREATE NEW LUCKY DRAW
----------------------------- */

router.post(
  "/create",
  createLuckyDraw
);

/* -----------------------------
   UPDATE DRAW
----------------------------- */

router.put(
  "/update/:id",
  updateLuckyDraw
);

/* -----------------------------
   CURRENT ACTIVE DRAW
----------------------------- */

router.get(
  "/current",
  getCurrentLuckyDraw
);

/* -----------------------------
   DASHBOARD STATS
----------------------------- */

router.get(
  "/stats",
  getLuckyDrawStats
);

/* -----------------------------
   COMPLETED HISTORY
----------------------------- */

router.get(
  "/history",
  getLuckyDrawHistory
);

/* -----------------------------
   PURCHASE TICKETS
----------------------------- */

router.post(
  "/purchase",

  authMiddleware,

  purchaseLuckyDrawTickets
);

/* -----------------------------
   PICK WINNERS
----------------------------- */

router.post(
  "/pick-winners/:drawId",

  pickLuckyDrawWinners
);

/* -----------------------------
   END DRAW
----------------------------- */

router.put(
  "/end/:drawId",

  endLuckyDraw
);

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  router;