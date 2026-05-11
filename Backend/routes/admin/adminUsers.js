const express = require("express");

const User = require("../../models/User");

const {
  protect,
  requireAdmin,
} = require("../../middleware/auth");

const router = express.Router();

/* -----------------------------
   GET USERS (MATCHES FRONTEND)
----------------------------- */

router.get(
  "/",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status = "all",
        q = "",
      } = req.query;

      const pageNum =
        Math.max(
          Number(page) || 1,
          1
        );

      const limitNum =
        Math.min(
          Math.max(
            Number(limit) ||
              10,
            1
          ),
          100
        );

      const skip =
        (pageNum - 1) *
        limitNum;

      const filter = {
        role: "user",
      };

      if (status !== "all") {
        filter.status =
          status;
      }

      if (q) {
        filter.$or = [
          {
            username:
              new RegExp(
                q,
                "i"
              ),
          },

          {
            email:
              new RegExp(
                q,
                "i"
              ),
          },
        ];
      }

      const users =
        await User.find(filter)
          .select(
            `
            _id
            username
            email
            creds
            exp
            streak
            dailyBonus
            status
            createdAt
            lastLoginAt
            lastActiveAt
          `
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limitNum)
          .lean();

      const total =
        await User.countDocuments(
          filter
        );

      res.json({
        success: true,

        data: users,

        pagination: {
          page: pageNum,

          limit:
            limitNum,

          total,

          pages:
            Math.ceil(
              total /
                limitNum
            ),
        },
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);

/* -----------------------------
   GET SINGLE USER
----------------------------- */

router.get(
  "/:id",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        ).select(
          "-password"
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      res.json({
        success: true,

        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message:
          "Failed to fetch user",
      });
    }
  }
);

/* -----------------------------
   UPDATE USER STATUS
----------------------------- */

router.patch(
  "/:id/status",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const newStatus =
        req.body.status ===
        "banned"
          ? "banned"
          : "active";

      const user =
        await User.findOneAndUpdate(
          {
            _id:
              req.params.id,

            role: "user",
          },

          {
            status:
              newStatus,
          },

          {
            new: true,
          }
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      res.json({
        success: true,

        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message:
          "Failed to update user",
      });
    }
  }
);

/* -----------------------------
   UPDATE USER PROGRESS
----------------------------- */

router.patch(
  "/:id/progress",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const {
        creds,
        exp,
        streak,
        dailyBonus,
      } = req.body;

      const user =
        await User.findOne({
          _id:
            req.params.id,

          role: "user",
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      if (
        creds !== undefined
      ) {
        user.creds =
          Number(creds) ||
          0;
      }

      if (
        exp !== undefined
      ) {
        user.exp =
          Number(exp) || 0;
      }

      if (
        streak !== undefined
      ) {
        user.streak =
          Number(streak) ||
          0;
      }

      if (
        dailyBonus !==
        undefined
      ) {
        user.dailyBonus =
          Number(
            dailyBonus
          ) || 0;
      }

      await user.save();

      res.json({
        success: true,

        message:
          "User progress updated successfully",

        data: user,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message:
          "Failed to update user progress",
      });
    }
  }
);

/* -----------------------------
   DELETE USER
----------------------------- */

router.delete(
  "/:id",
  protect,
  requireAdmin,
  async (req, res) => {
    try {
      const user =
        await User.findOneAndDelete(
          {
            _id:
              req.params.id,

            role: "user",
          }
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      res.json({
        success: true,

        message:
          "User deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message:
          "Failed to delete user",
      });
    }
  }
);

module.exports = router;