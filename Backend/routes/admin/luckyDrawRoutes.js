const express =
  require("express");

const router =
  express.Router();

/* -----------------------------
   AUTH MIDDLEWARE
----------------------------- */

const {
  protect,
} = require(
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

  protect,

  createLuckyDraw
);

/* -----------------------------
   UPDATE DRAW
----------------------------- */

router.put(
  "/update/:id",

  protect,

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

  protect,

  purchaseLuckyDrawTickets
);

/* -----------------------------
   PICK WINNERS
----------------------------- */

router.post(
  "/pick-winners/:drawId",

  protect,

  pickLuckyDrawWinners
);

/* -----------------------------
   END DRAW
----------------------------- */

router.put(
  "/end/:drawId",

  protect,

  endLuckyDraw
);

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  router;