const express = require("express");

const axios = require("axios");

const User = require(
  "../../models/User"
);

const CaptchaHistory =
  require(
    "../../models/CaptchaHistory"
  );

const router = express.Router();

/* -----------------------------
   VERIFY HCAPTCHA
----------------------------- */

router.post(
  "/verify",
  async (req, res) => {
    try {

      const {
        token,
        userId,
      } = req.body;

      /* -----------------------------
         VALIDATE TOKEN
      ----------------------------- */

      if (!token) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Captcha token missing",
          });
      }

      /* -----------------------------
         VALIDATE USER
      ----------------------------- */

      if (!userId) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "User ID missing",
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
        return res
          .status(404)
          .json({
            success: false,

            message:
              "User not found",
          });
      }

      /* -----------------------------
         CAPTCHA COOLDOWN
      ----------------------------- */

      const cooldownMinutes =
        30;

      const cooldownMs =
        cooldownMinutes *
        60 *
        1000;

      if (
        user.lastCaptchaClaimAt
      ) {

        const timePassed =
          Date.now() -
          new Date(
            user.lastCaptchaClaimAt
          ).getTime();

        const timeLeft =
          cooldownMs -
          timePassed;

        /* -----------------------------
           BLOCK CLAIM
        ----------------------------- */

        if (timeLeft > 0) {

          return res
            .status(429)
            .json({
              success: false,

              cooldown: true,

              remainingMinutes:
                Math.ceil(
                  timeLeft /
                  1000 /
                  60
                ),

              remainingSeconds:
                Math.floor(
                  timeLeft /
                  1000
                ),

              message:
                `Please wait before claiming again`,
            });
        }
      }

      /* -----------------------------
         VERIFY WITH HCAPTCHA
      ----------------------------- */

      const response =
        await axios.post(
          "https://api.hcaptcha.com/siteverify",

          new URLSearchParams({
            secret:
              process.env
                .HCAPTCHA_SECRET,

            response:
              token,
          }),

          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded",
            },
          }
        );

      /* -----------------------------
         SUCCESS
      ----------------------------- */

      if (
        response.data.success
      ) {

        /* -----------------------------
           RANDOM REWARD
        ----------------------------- */

        /* -----------------------------
    WEIGHTED REWARDS
 ----------------------------- */

        const random =
          Math.random();

        let reward = 1;

        if (random < 0.40) {
          reward = 1;
        }

        else if (random < 0.65) {
          reward = 2;
        }

        else if (random < 0.80) {
          reward = 3;
        }

        else if (random < 0.90) {
          reward = 4;
        }

        else if (random < 0.95) {
          reward = 5;
        }

        else if (random < 0.98) {
          reward = 6;
        }

        else if (random < 0.992) {
          reward = 7;
        }

        else if (random < 0.997) {
          reward = 8;
        }

        else if (random < 0.999) {
          reward = 9;
        }

        else {
          reward = 10;
        }

        /* -----------------------------
           ADD CREDS
        ----------------------------- */

        user.creds =
          (user.creds || 0)
          + reward;

        /* -----------------------------
           SAVE CLAIM TIME
        ----------------------------- */

        user.lastCaptchaClaimAt =
  new Date();

await user.save();

/* -----------------------------
   SAVE CAPTCHA HISTORY
----------------------------- */

await CaptchaHistory.create({
  user: user._id,

  reward,

  status:
    "Completed",

  ipAddress:
    req.ip,

  userAgent:
    req.headers[
      "user-agent"
    ],
});
        /* -----------------------------
           RESPONSE
        ----------------------------- */

        return res
          .status(200)
          .json({
            success: true,

            reward,

            newBalance:
              user.creds,

            nextClaimAt:
              user.lastCaptchaClaimAt,

            message:
              `${reward} Creds added successfully`,
          });
      }

      /* -----------------------------
         FAILED
      ----------------------------- */

      return res
        .status(400)
        .json({
          success: false,

          message:
            "Captcha verification failed",

          hcaptcha:
            response.data,
        });

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server Error",

          error:
            error.message,
        });
    }
  }
);

/* -----------------------------
   CAPTCHA STATUS
----------------------------- */

router.get(
  "/status/:userId",

  async (req, res) => {

    try {

      const { userId } =
        req.params;

      /* -----------------------------
         FIND USER
      ----------------------------- */

      const user =
        await User.findById(
          userId
        );

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "User not found",
          });
      }

      /* -----------------------------
         COOLDOWN CONFIG
      ----------------------------- */

      const cooldownMinutes =
        30;

      const cooldownMs =
        cooldownMinutes *
        60 *
        1000;

      /* -----------------------------
         NO CLAIM YET
      ----------------------------- */

      if (
        !user.lastCaptchaClaimAt
      ) {

        return res
          .status(200)
          .json({
            success: true,

            cooldown: false,
          });
      }

      /* -----------------------------
         CALCULATE TIME
      ----------------------------- */

      const timePassed =
        Date.now() -
        new Date(
          user.lastCaptchaClaimAt
        ).getTime();

      const timeLeft =
        cooldownMs -
        timePassed;

      /* -----------------------------
         COOLDOWN ACTIVE
      ----------------------------- */

      if (timeLeft > 0) {

        return res
          .status(200)
          .json({
            success: true,

            cooldown: true,

            remainingMinutes:
              Math.ceil(
                timeLeft /
                1000 /
                60
              ),

            remainingSeconds:
              Math.floor(
                timeLeft /
                1000
              ),
          });
      }

      /* -----------------------------
         CLAIM AVAILABLE
      ----------------------------- */

      return res
        .status(200)
        .json({
          success: true,

          cooldown: false,
        });

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server Error",

          error:
            error.message,
        });
    }
  }
);

/* -----------------------------
   CAPTCHA HISTORY
----------------------------- */

router.get(
  "/history/:userId",

  async (req, res) => {

    try {

      const { userId } =
        req.params;

      /* -----------------------------
         GET HISTORY
      ----------------------------- */

      const history =
        await CaptchaHistory
          .find({
            user: userId,
          })

          .sort({
            createdAt: -1,
          })

          .limit(20);

      /* -----------------------------
         RESPONSE
      ----------------------------- */

      return res
        .status(200)
        .json({
          success: true,

          history,
        });

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Server Error",
        });
    }
  }
);

module.exports = router;