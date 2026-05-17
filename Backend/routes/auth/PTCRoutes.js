const express =
  require("express");

const router =
  express.Router();

/* =========================================
   AUTH MIDDLEWARE
========================================= */

const {
  protect,
} = require(
  "../../middleware/auth"
);

/* =========================================
   CONTROLLERS
========================================= */

const {
  startPTCSession,

  completePTCSession,

  cancelPTCSession,

  getActivePTCSession,

  checkPTCStatus,
} = require(
  "../../controllers/auth/PTCController"
);

/* =========================================
   START PTC SESSION
========================================= */

router.post(
  "/start",

  protect,

  startPTCSession
);

/* =========================================
   COMPLETE PTC SESSION
========================================= */

router.post(
  "/complete",

  protect,

  completePTCSession
);

/* =========================================
   CANCEL PTC SESSION
========================================= */

router.post(
  "/cancel",

  protect,

  cancelPTCSession
);

/* =========================================
   GET ACTIVE SESSION
========================================= */

router.get(
  "/active",

  protect,

  getActivePTCSession
);

/* =========================================
   CHECK PTC STATUS
========================================= */

router.get(
  "/status/:adId",

  protect,

  checkPTCStatus
);

module.exports =
  router;