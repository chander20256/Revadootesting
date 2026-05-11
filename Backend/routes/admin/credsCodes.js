const express = require(
  "express"
);

const router =
  express.Router();

const CredsCode = require(
  "../../models/CredsCode"
);

const User = require(
  "../../models/User"
);

/* -----------------------------
   CREATE CODE
----------------------------- */

router.post(
  "/create",
  async (req, res) => {
    try {

      const {
        code,
        reward,
        maxClaims,
        expiryDate,
      } = req.body;

      const newCode =
        new CredsCode({
          code,

          reward,

          maxClaims,

          expiryDate,
        });

      await newCode.save();

      res.status(201).json({
        success: true,

        message:
          "Creds code created successfully",

        data: newCode,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   PUBLIC GET ALL CODES
   (HIDE REAL CODE)
----------------------------- */

router.get(
  "/",
  async (req, res) => {

    try {

      const codes =
        await CredsCode.find()
          .sort({
            createdAt: -1,
          });

      /* -----------------------------
         REMOVE REAL CODE
      ----------------------------- */

      const safeCodes =
        codes.map((item) => ({
          _id: item._id,

          reward:
            item.reward,

          totalClaimed:
            item.totalClaimed,

          maxClaims:
            item.maxClaims,

          status:
            item.status,

          expiryDate:
            item.expiryDate,

          createdAt:
            item.createdAt,
        }));

      /* -----------------------------
         RESPONSE
      ----------------------------- */

      res.status(200).json({
        success: true,

        data: safeCodes,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   ADMIN GET ALL CODES
   (SHOW REAL CODE)
----------------------------- */

router.get(
  "/admin/all",
  async (req, res) => {

    try {

      const codes =
        await CredsCode.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,

        data: codes,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   USER CLAIM HISTORY
----------------------------- */

router.get(
  "/history/:userId",
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      const codes =
        await CredsCode.find({
          claimedUsers:
            userId,
        }).sort({
          updatedAt: -1,
        });

      const history =
        codes.map((item) => ({
          code: item.code,

          reward:
            item.reward,

          claimedAt:
            item.updatedAt,
        }));

      res.status(200).json({
        success: true,

        data: history,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   CLAIM CODE
----------------------------- */

router.post(
  "/claim",
  async (req, res) => {

    try {

      const {
        code,
        userId,
      } = req.body;

      /* -----------------------------
         FIND CODE
      ----------------------------- */

      const foundCode =
        await CredsCode.findOne({
          code,
        });

      /* -----------------------------
         INVALID CODE
      ----------------------------- */

      if (!foundCode) {

        return res.status(404).json({
          success: false,

          message:
            "Invalid reward code",
        });
      }

      /* -----------------------------
         EXPIRED
      ----------------------------- */

      if (
        foundCode.expiryDate &&
        new Date() >
          new Date(
            foundCode.expiryDate
          )
      ) {

        foundCode.status =
          "Expired";

        await foundCode.save();

        return res.status(400).json({
          success: false,

          message:
            "This code has expired",
        });
      }

      /* -----------------------------
         CLAIM LIMIT REACHED
      ----------------------------- */

      if (
        foundCode.totalClaimed >=
        foundCode.maxClaims
      ) {

        foundCode.status =
          "Completed";

        await foundCode.save();

        return res.status(400).json({
          success: false,

          message:
            "Code already fully claimed",
        });
      }

      /* -----------------------------
         ALREADY CLAIMED
      ----------------------------- */

      if (
        foundCode.claimedUsers.includes(
          userId
        )
      ) {

        return res.status(400).json({
          success: false,

          message:
            "You already claimed this code",
        });
      }

      /* -----------------------------
         FIND USER
      ----------------------------- */

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }

      /* -----------------------------
         REWARD VALUE
      ----------------------------- */

      const rewardValue =
        parseInt(
          foundCode.reward
        ) || 0;

      /* -----------------------------
         ADD USER BALANCE
      ----------------------------- */

      user.creds =
        (user.creds || 0) +
        rewardValue;

      await user.save();

      /* -----------------------------
         SAVE CLAIM
      ----------------------------- */

      foundCode.claimedUsers.push(
        userId
      );

      foundCode.totalClaimed += 1;

      /* -----------------------------
         AUTO COMPLETE
      ----------------------------- */

      if (
        foundCode.totalClaimed >=
        foundCode.maxClaims
      ) {

        foundCode.status =
          "Completed";
      }

      await foundCode.save();

      /* -----------------------------
         SUCCESS
      ----------------------------- */

      res.status(200).json({
        success: true,

        reward:
          foundCode.reward,

        newBalance:
          user.creds,

        message:
          "Reward claimed successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

/* -----------------------------
   DELETE CODE
----------------------------- */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await CredsCode.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,

        message:
          "Code deleted successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,

        message:
          "Server error",
      });
    }
  }
);

module.exports = router;