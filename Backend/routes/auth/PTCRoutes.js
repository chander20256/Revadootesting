const express =
  require("express");

const router =
  express.Router();

/* =========================================
   AUTH MIDDLEWARE
========================================= */

const authMiddleware =
  require("../../middleware/auth");

/* =========================================
   CONTROLLERS
========================================= */

const {
  startPTCSession,

  completePTCSession,

  cancelPTCSession,

  getActivePTCSession,
} = require(
  "../../controllers/auth/PTCController"
);

/* =========================================
   START PTC SESSION
========================================= */

router.post(
  "/start",

  authMiddleware,

  startPTCSession
);

/* =========================================
   COMPLETE PTC SESSION
========================================= */

router.post(
  "/complete",

  authMiddleware,

  completePTCSession
);

/* =========================================
   CANCEL PTC SESSION
========================================= */

router.post(
  "/cancel",

  authMiddleware,

  cancelPTCSession
);

/* =========================================
   GET ACTIVE SESSION
========================================= */

router.get(
  "/active",

  authMiddleware,

  getActivePTCSession
);

module.exports =
  router;