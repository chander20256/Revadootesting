/* =========================================
   Backend/routes/admin/shortlinkRoutes.js
========================================= */

const express = require(
  "express"
);

const router =
  express.Router();

/* -----------------------------
   CONTROLLERS
----------------------------- */

const {
  createShortlink,
  getAllShortlinks,
  getSingleShortlink,
  updateShortlink,
  deleteShortlink,
  toggleShortlinkStatus,
} = require(
  "../../controllers/admin/shortlinkController"
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
   SHORTLINK CMS ROUTES
================================================== */

/* -----------------------------
   CREATE SHORTLINK
----------------------------- */

router.post(
  "/create",
  protect,
  createShortlink
);

/* -----------------------------
   GET ALL SHORTLINKS
----------------------------- */

router.get(
  "/all",
  getAllShortlinks
);

/* -----------------------------
   GET SINGLE SHORTLINK
----------------------------- */

router.get(
  "/:id",
  protect,
  getSingleShortlink
);

/* -----------------------------
   UPDATE SHORTLINK
----------------------------- */

router.put(
  "/update/:id",
  protect,
  updateShortlink
);

/* -----------------------------
   DELETE SHORTLINK
----------------------------- */

router.delete(
  "/delete/:id",
  protect,
  deleteShortlink
);

/* -----------------------------
   TOGGLE STATUS
----------------------------- */

router.patch(
  "/toggle-status/:id",
  protect,
  toggleShortlinkStatus
);

/* -----------------------------
   EXPORT
----------------------------- */

module.exports =
  router;