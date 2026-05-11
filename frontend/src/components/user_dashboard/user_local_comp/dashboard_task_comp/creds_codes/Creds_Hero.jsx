import React from "react";

import {
  FaGift,
  FaTelegramPlane,
  FaCoins,
  FaTicketAlt,
} from "react-icons/fa";

function Creds_Hero() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-5
        sm:p-7
        lg:p-8
      "
      style={{
        background: "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.05)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* GLOW */}


      {/* CONTENT */}

      <div className="relative z-10">
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          "
        >
          {/* LEFT */}

          <div className="max-w-2xl">
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-2xl
                mb-4
              "
              style={{
                background:
                  "rgba(255,107,0,0.08)",

                border:
                  "1px solid rgba(255,107,0,0.12)",
              }}
            >
              <FaGift
                color="#FF6B00"
                size={13}
              />

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  font-bold
                "
                style={{
                  color:
                    "#FF6B00",
                }}
              >
                Revadoo Daily Creds Code
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
                text-2xl
                sm:text-4xl
                lg:text-5xl
                font-black
                leading-tight
              "
              style={{
                color: "#030712",
              }}
            >
              One Daily Code
              <br />
              For
              <span
                style={{
                  color:
                    "#FF6B00",
                }}
              >
                {" "}
                Random Rewards
              </span>
            </h1>

            {/* SEO CONTENT */}

            <p
              className="
                mt-4
                text-sm
                sm:text-base
                leading-7
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Join the official
              Revadoo Telegram
              community and collect
              one exclusive daily
              reward code to claim
              random free creds,
              bonus rewards, EXP
              boosts, and limited
              community giveaways.
            </p>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                leading-7
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Every daily code gives
              a surprise reward.
              Active users can earn
              instant credits and
              unlock premium Revadoo
              reward opportunities.
            </p>

            {/* BUTTON */}

            <div className="mt-6">
              <button
                className="
                  px-6
                  h-12
                  rounded-2xl
                  text-white
                  font-bold
                  text-sm
                  flex
                  items-center
                  gap-3
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                  boxShadow:
                    "0 10px 25px rgba(255,107,0,0.22)",
                }}
              >
                <FaTelegramPlane />
                Join Telegram
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              w-full
              lg:max-w-sm
            "
          >
            {[
              {
                title:
                  "Daily Codes",

                value: "1",

                icon:
                  <FaTicketAlt />,
              },

              {
                title:
                  "Random Rewards",

                value:
                  "1-5000",

                icon:
                  <FaGift />,
              },

              {
                title:
                  "Reward Type",

                value:
                  "Creds",

                icon:
                  <FaCoins />,
              },

              {
                title:
                  "Claim Speed",

                value:
                  "Instant",

                icon:
                  <FaTelegramPlane />,
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    p-4
                  "
                  style={{
                    background:
                      "rgba(255,107,0,0.03)",

                    border:
                      "1px solid rgba(255,107,0,0.08)",
                  }}
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mb-3
                    "
                    style={{
                      background:
                        "rgba(255,107,0,0.08)",

                      color:
                        "#FF6B00",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      text-base
                      sm:text-xl
                      font-black
                    "
                    style={{
                      color:
                        "#FF6B00",
                    }}
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      text-[11px]
                      sm:text-xs
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
    </div>
  );
}

export default Creds_Hero;