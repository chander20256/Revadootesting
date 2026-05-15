const LuckyDraw =
  require(
    "../models/lucky/luckyDraw"
  );

const LuckyDrawTicket =
  require(
    "../models/lucky/luckyDrawTicket"
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

          /* =============================
             FIND EXPIRED ACTIVE DRAWS
          ============================= */

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

          /* =============================
             PROCESS EACH DRAW
          ============================= */

          for (const draw of expiredDraws) {
            console.log(
              `⏰ Expired draw detected: ${draw.rewardTitle}`
            );

            /* =============================
               UPDATE STATUS TO PICKING
            ============================= */

            draw.status =
              "picking";

            await draw.save();

            /* =============================
               WAIT FOR PICKING EFFECT
            ============================= */

            await new Promise(
              (
                resolve
              ) =>
                setTimeout(
                  resolve,
                  8000
                )
            );

            /* =============================
               GET ACTIVE TICKETS
            ============================= */

            let tickets =
              await LuckyDrawTicket.find(
                {
                  drawId:
                    draw._id,

                  status:
                    "active",
                }
              );

            /* NO TICKETS */

            if (
              tickets.length ===
              0
            ) {
              console.log(
                "❌ No tickets found"
              );

              draw.status =
                "completed";

              draw.completedAt =
                new Date();

              await draw.save();

              continue;
            }

            /* =============================
               WINNER STORAGE
            ============================= */

            const winners =
              [];

            const winnerUserIds =
              [];

            /* =============================
               PICK UNIQUE WINNERS
            ============================= */

            while (
              winners.length <
                draw.totalWinners &&
              tickets.length >
                0
            ) {
              /* RANDOM INDEX */

              const randomIndex =
                Math.floor(
                  Math.random() *
                    tickets.length
                );

              /* RANDOM TICKET */

              const selectedTicket =
                tickets[
                  randomIndex
                ];

              /* USER ALREADY WON */

              if (
                winnerUserIds.includes(
                  String(
                    selectedTicket.userId
                  )
                )
              ) {
                tickets =
                  tickets.filter(
                    (
                      ticket
                    ) =>
                      String(
                        ticket.userId
                      ) !==
                      String(
                        selectedTicket.userId
                      )
                  );

                continue;
              }

              /* =============================
                 SAVE WINNER
              ============================= */

              selectedTicket.isWinner =
                true;

              selectedTicket.status =
                "winner";

              await selectedTicket.save();

              winners.push({
                ticketId:
                  selectedTicket.ticketId,

                userId:
                  selectedTicket.userId,

                username:
                  selectedTicket.username,
              });

              winnerUserIds.push(
                String(
                  selectedTicket.userId
                )
              );

              console.log(
                `🏆 Winner Selected: ${selectedTicket.username} (${selectedTicket.ticketId})`
              );

              /* =============================
                 REMOVE USER TICKETS
              ============================= */

              tickets =
                tickets.filter(
                  (
                    ticket
                  ) =>
                    String(
                      ticket.userId
                    ) !==
                    String(
                      selectedTicket.userId
                    )
                );
            }

            /* =============================
               SAVE WINNERS
            ============================= */

            draw.winningTickets =
              winners;

            /* =============================
               COMPLETE DRAW
            ============================= */

            draw.status =
              "completed";

            draw.completedAt =
              new Date();

            await draw.save();

            console.log(
              `✅ Draw Completed: ${draw.rewardTitle}`
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

      /* CHECK EVERY SECOND */

      1000
    );
  };

module.exports =
  startLuckyDrawScheduler;
