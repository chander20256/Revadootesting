import React from "react";

function Shortlink_Header() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-6
        sm:p-8
        lg:p-10
      "
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      
      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-8
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >
          {/* LEFT */}

          <div className="space-y-5">
            {/* BADGE */}

            <div className="flex items-center gap-3">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    "rgba(255,107,0,0.10)",
                }}
              >
                <span className="text-2xl">
                  🔗
                </span>
              </div>

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    font-black
                    tracking-[3px]
                  "
                  style={{
                    color: "#FF6B00",
                  }}
                >
                  Revadoo Shortlinks
                </p>

                <p
                  className="
                    text-sm
                    mt-1
                    font-medium
                  "
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Complete links &
                  earn rewards
                </p>
              </div>
            </div>

            {/* TITLE */}

            <div className="space-y-3">
              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                  tracking-tight
                "
                style={{
                  color: "#030712",
                  lineHeight: 1.1,
                }}
              >
                Earn Rewards
              </h1>

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                "
                style={{
                  color: "#FF6B00",
                  lineHeight: 1.1,
                }}
              >
                With Shortlinks
              </h1>
            </div>

            {/* DESCRIPTION */}

            <p
              className="
                max-w-3xl
                text-sm
                sm:text-base
                leading-relaxed
              "
              style={{
                color: "#6b7280",
              }}
            >
              Complete premium
              shortlinks, unlock
              bonus rewards, earn
              daily EXP, increase
              your streak level,
              and collect instant
              Revadoo credits with
              every successful
              visit.
            </p>
          </div>

          {/* RIGHT CARD */}

          <div
            className="
              w-full
              lg:w-[320px]
              rounded-3xl
              p-6
              flex
              flex-col
              gap-5
            "
            style={{
              background:
                "linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,107,0,0.03))",

              border:
                "1px solid rgba(255,107,0,0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="
                  text-lg
                  font-black
                "
                style={{
                  color: "#030712",
                }}
              >
                Today's Rewards
              </h3>

              <div
                className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                "
                style={{
                  background:
                    "rgba(255,107,0,0.12)",

                  color: "#FF6B00",
                }}
              >
                LIVE
              </div>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Available",
                  value: "150+",
                },

                {
                  title: "Avg Reward",
                  value: "25 EXP",
                },

                {
                  title: "Bonus",
                  value: "2X",
                },

                {
                  title: "Claim",
                  value: "Instant",
                },
              ].map(
                (item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      p-4
                    "
                    style={{
                      background:
                        "#ffffff",

                      border:
                        "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-black
                      "
                      style={{
                        color:
                          "#FF6B00",
                      }}
                    >
                      {item.value}
                    </h2>

                    <p
                      className="
                        text-xs
                        mt-1
                      "
                      style={{
                        color:
                          "#6b7280",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM INFO BAR */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
            rounded-2xl
            p-4
          "
          style={{
            background:
              "rgba(255,107,0,0.04)",

            border:
              "1px solid rgba(255,107,0,0.08)",
          }}
        >
          {/* LEFT */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
              "
              style={{
                background:
                  "rgba(255,107,0,0.10)",
              }}
            >
              ⚡
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-bold
                "
                style={{
                  color: "#030712",
                }}
              >
                Complete more links
                to unlock bonus
                multipliers
              </p>

              <p
                className="
                  text-xs
                  mt-1
                "
                style={{
                  color: "#6b7280",
                }}
              >
                Higher streaks =
                higher rewards
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <button
            className="
              h-12
              px-6
              rounded-2xl
              text-sm
              font-bold
              transition-all
              duration-300
              hover:scale-[1.02]
              active:scale-[0.98]
            "
            style={{
              background: "#FF6B00",
              color: "#ffffff",
              boxShadow:
                "0 10px 30px rgba(255,107,0,0.25)",
            }}
          >
            Start Earning
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shortlink_Header;