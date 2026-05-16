const express = require("express");

const router = express.Router();

/* -----------------------------
   CONTROLLERS
----------------------------- */

const {
  startShortlink,
  completeShortlink,
} = require(
  "../../controllers/auth/shortlinkController"
);

/* -----------------------------
   MIDDLEWARE
----------------------------- */

const {
  protect,
} = require(
  "../../middleware/auth"
);

/* ==================================================
   USER SHORTLINK ROUTES
================================================== */

/* -----------------------------
   START SHORTLINK
----------------------------- */

router.post(
  "/start/:id",
  protect,
  startShortlink
);

/* -----------------------------
   COMPLETE SHORTLINK
----------------------------- */

router.get(
  "/complete/:sessionId",
  completeShortlink
);

/* -----------------------------
   EXPORT
----------------------------- */

module.exports = router;