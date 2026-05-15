import React from "react";

function Lucky_Draw_Result({
  drawData,
}) {
  const userWon =
    drawData?.isCurrentUserWinner;

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-[32px]
        p-6
        sm:p-10
        font-['DM_Sans',sans-serif]
      "
    >
      {/* TOP */}

      <div className="text-center">
        <div
          className={`
            w-24
            h-24
            sm:w-28
            sm:h-28
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            ${
              userWon
                ? "bg-green-100"
                : "bg-orange-100"
            }
          `}
        >
          <span className="text-5xl">
            {userWon
              ? "🏆"
              : "😔"}
          </span>
        </div>

        {/* TITLE */}

        <h2
          className="
            text-2xl
            sm:text-4xl
            font-black
            text-black
            mt-8
            tracking-tight
          "
        >
          {userWon
            ? "Congratulations!"
            : "Better Luck Next Time"}
        </h2>

        {/* MESSAGE */}

        <p
          className="
            text-sm
            sm:text-lg
            text-gray-500
            font-medium
            leading-relaxed
            mt-4
            max-w-[700px]
            mx-auto
          "
        >
          {userWon
            ? `You are one of the lucky winners of ${drawData?.rewardTitle}.`
            : `The lucky draw has officially ended. Unfortunately, your tickets were not selected this time.`}
        </p>

        {/* STATUS */}

        <div
          className="
            inline-flex
            items-center
            justify-center
            px-5
            py-3
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            mt-6
          "
        >
          <span
            className="
              text-xs
              sm:text-sm
              font-black
              uppercase
              tracking-widest
              text-orange-500
            "
          >
            Draw Completed
          </span>
        </div>
      </div>

      {/* WINNERS */}

      {drawData?.winningTickets
        ?.length > 0 && (
        <div className="mt-10">
          <h3
            className="
              text-xl
              sm:text-2xl
              font-black
              text-black
              mb-6
            "
          >
            Winning Tickets
          </h3>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >
            {drawData.winningTickets.map(
              (
                winner,
                index
              ) => (
                <div
                  key={index}
                  className="
                    bg-orange-50
                    border
                    border-orange-100
                    rounded-[24px]
                    p-5
                  "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4
                        className="
                          text-base
                          font-black
                          text-black
                        "
                      >
                        {
                          winner.username
                        }
                      </h4>

                      <p
                        className="
                          text-sm
                          text-gray-500
                          mt-1
                        "
                      >
                        {
                          winner.ticketId
                        }
                      </p>
                    </div>

                    <div className="text-3xl">
                      🏆
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Lucky_Draw_Result;