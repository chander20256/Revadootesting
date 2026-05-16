/* =========================================
   Backend/routes/admin/shortlinkRoutes.js
========================================= */

const express = require("express");

const router = express.Router();

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

const authMiddleware = require(
  "../../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../../middleware/adminMiddleware"
);

/* ==================================================
   SHORTLINK CMS ROUTES
================================================== */

/* -----------------------------
   CREATE SHORTLINK
----------------------------- */

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  createShortlink
);

/* -----------------------------
   GET ALL SHORTLINKS
----------------------------- */

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllShortlinks
);

/* -----------------------------
   GET SINGLE SHORTLINK
----------------------------- */

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSingleShortlink
);

/* -----------------------------
   UPDATE SHORTLINK
----------------------------- */

router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  updateShortlink
);

/* -----------------------------
   DELETE SHORTLINK
----------------------------- */

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteShortlink
);

/* -----------------------------
   TOGGLE STATUS
----------------------------- */

router.patch(
  "/toggle-status/:id",
  authMiddleware,
  adminMiddleware,
  toggleShortlinkStatus
);

/* -----------------------------
   EXPORT
----------------------------- */

module.exports = router;