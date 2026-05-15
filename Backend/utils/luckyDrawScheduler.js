const LuckyDraw =
  require(
    "../models/LuckyDraw"
  );

/* =================================
   START LUCKY DRAW SCHEDULER
================================= */

const startLuckyDrawScheduler =
  () => {
    console.log(
      "🎯 Lucky Draw Scheduler Started"
    );

    setInterval(
      async () => {
        try {
          const now =
            new Date();

          /* FIND EXPIRED ACTIVE DRAWS */

          const expiredDraws =
            await LuckyDraw.find(
              {
                status:
                  "active",

                endsAt: {
                  $lte:
                    now,
                },
              }
            );

          /* NO EXPIRED DRAWS */

          if (
            expiredDraws.length ===
            0
          ) {
            return;
          }

          /* LOG EXPIRED DRAWS */

          for (const draw of expiredDraws) {
            console.log(
              `⏰ Expired draw detected: ${draw.rewardTitle}`
            );

            console.log(
              `🆔 Draw ID: ${draw._id}`
            );

            console.log(
              `🏁 Draw ended at: ${draw.endsAt}`
            );
          }
        } catch (error) {
          console.log(
            "❌ Lucky Draw Scheduler Error"
          );

          console.log(
            error
          );
        }
      },

      /* CHECK EVERY 1 MINUTE */

      60 * 1000
    );
  };

module.exports =
  startLuckyDrawScheduler;