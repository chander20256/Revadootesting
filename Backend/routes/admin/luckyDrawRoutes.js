const express =
  require("express");

const router =
  express.Router();

/* -----------------------------
   CONTROLLERS
----------------------------- */

const {
  createLuckyDraw,

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