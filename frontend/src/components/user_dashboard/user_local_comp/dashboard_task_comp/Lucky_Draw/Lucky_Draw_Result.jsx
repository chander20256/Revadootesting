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
        overflow-hidden
        relative
      "
    >
      {/* GLOW EFFECT */}

      {userWon && (
        <>
          <div
            className="
              absolute
              top-0
              left-0
              w-72
              h-72
              bg-orange-100
              blur-3xl
              opacity-30
              rounded-full
              -translate-x-20
              -translate-y-20
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              w-72
              h-72
              bg-yellow-100
              blur-3xl
              opacity-30
              rounded-full
              translate-x-20
              translate-y-20
            "
          />
        </>
      )}

      {/* TOP */}

      <div className="text-center relative z-10">
        {/* ICON */}

        <div
          className={`
            w-28
            h-28
            sm:w-36
            sm:h-36
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            shadow-lg
            transition-all
            duration-300
            ${
              userWon
                ? `
                  bg-gradient-to-br
                  from-yellow-200
                  to-orange-200
                  animate-bounce
                `
                : `
                  bg-orange-100
                `
            }
          `}
        >
          <span
            className={`
              ${
                userWon
                  ? "text-6xl"
                  : "text-5xl"
              }
            `}
          >
            {userWon
              ? "🏆"
              : "😔"}
          </span>
        </div>

        {/* TITLE */}

        <h2
          className="
            text-3xl
            sm:text-5xl
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

        <div className="mt-5 max-w-[720px] mx-auto">
          {userWon ? (
            <>
              {/* MAIN WIN TEXT */}

              <h3
                className="
                  text-lg
                  sm:text-3xl
                  font-black
                  text-black
                  leading-relaxed
                "
              >
                You are one of the
                lucky winners of{" "}
                <span
                  className="
                    text-orange-500
                  "
                >
                  {
                    drawData?.rewardTitle
                  }
                </span>
              </h3>

              {/* SUB TEXT */}

              <div
                className="
                  mt-6
                  bg-orange-50
                  border
                  border-orange-100
                  rounded-[24px]
                  p-5
                  sm:p-6
                "
              >
               <p
  className="
    text-[11px]
    sm:text-xs
    text-gray-500
    font-medium
    leading-6
  "
>
  Your reward details
  will be sent shortly
  to your registered
  email address.

  <br />

  Please make sure you
  have a valid email
  address connected to
  your account.

  <br />

  For support or reward
  assistance contact{" "}
  <span
    className="
      text-orange-500
      font-black
    "
  >
    contact@Revadoo.com
  </span>
</p>
              </div>
            </>
          ) : (
            <div
              className="
                bg-orange-50
                border
                border-orange-100
                rounded-[24px]
                p-5
                sm:p-6
              "
            >
              <p
                className="
                  text-sm
                  sm:text-lg
                  text-gray-600
                  font-medium
                  leading-relaxed
                "
              >
                The lucky draw has
                officially ended.
                Unfortunately,
                your tickets were
                not selected this
                time.

                <br />
                <br />

                Better luck in the
                next lucky draw
                event.
              </p>
            </div>
          )}
        </div>

        {/* STATUS */}

        <div
          className="
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            mt-8
            shadow-sm
          "
        >
          <span
            className="
              text-xs
              sm:text-sm
              font-black
              uppercase
              tracking-[3px]
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
        <div className="mt-14 relative z-10">
          {/* HEADING */}

          <div className="text-center mb-8">
            <h3
              className="
                text-2xl
                sm:text-3xl
                font-black
                text-black
              "
            >
              Winning Tickets
            </h3>

            <p
              className="
                text-sm
                sm:text-base
                text-gray-500
                font-medium
                mt-3
              "
            >
              Official lucky draw
              winners selected by
              the Revadoo system
            </p>
          </div>

          {/* WINNERS GRID */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-5
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
                    bg-gradient-to-br
                    from-orange-50
                    to-yellow-50
                    border
                    border-orange-100
                    rounded-[28px]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* LEFT */}

                    <div>
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1
                          rounded-full
                          bg-white
                          border
                          border-orange-100
                          mb-4
                        "
                      >
                        <span className="text-sm">
                          🏆
                        </span>

                        <span
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-widest
                            text-orange-500
                          "
                        >
                          Winner
                        </span>
                      </div>

                      <h4
                        className="
                          text-lg
                          sm:text-xl
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
                          text-xs
                          sm:text-sm
                          text-gray-500
                          mt-2
                          break-all
                        "
                      >
                        {
                          winner.ticketId
                        }
                      </p>
                    </div>

                    {/* RIGHT */}

                    <div
                      className="
                        text-5xl
                        animate-pulse
                      "
                    >
                      🎉
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