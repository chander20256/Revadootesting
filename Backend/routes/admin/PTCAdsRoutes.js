const express =
  require("express");

const router =
  express.Router();

const {
  createPTCAd,

  getAllPTCAds,

  deletePTCAd,
} = require(
  "../../controllers/admin/PTCAdsController"
);

/* =========================================
   CREATE PTC AD
========================================= */

router.post(
  "/create",
  createPTCAd
);

/* =========================================
   GET ALL PTC ADS
========================================= */

router.get(
  "/all",
  getAllPTCAds
);

/* =========================================
   DELETE PTC AD
========================================= */

router.delete(
  "/delete/:id",
  deletePTCAd
);

module.exports =
  router;