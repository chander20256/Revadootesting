import React from "react";

import {
  FaShieldAlt,
  FaCoins,
  FaClock,
  FaRobot,
} from "react-icons/fa";

function Captcha_Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[22px]
        sm:rounded-[28px]
        p-4
        sm:p-5
        lg:p-6
      "
      style={{
        background:
          "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 35px rgba(0,0,0,0.04)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* BG EFFECT */}

      <div
        className="
          absolute
          top-0
          right-0
          w-[180px]
          h-[180px]
          rounded-full
          blur-3xl
          opacity-40
        "
        style={{
          background:
            "rgba(255,107,0,0.12)",
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-5
        "
      >
        {/* LEFT */}

        <div className="flex-1">
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              rounded-full
              text-[10px]
              sm:text-xs
              font-bold
            "
            style={{
              background:
                "rgba(255,107,0,0.08)",

              border:
                "1px solid rgba(255,107,0,0.10)",

              color:
                "#FF6B00",
            }}
          >
            <FaShieldAlt />
            Secure Captcha Rewards
          </div>

          {/* HEADING */}

          <div className="mt-3">
            <h1
              className="
                text-[24px]
                sm:text-[38px]
                lg:text-[48px]
                font-black
                leading-[1.05]
                tracking-tight
              "
              style={{
                color:
                  "#030712",
              }}
            >
              Solve Captcha
            </h1>

            <h2
              className="
                text-[24px]
                sm:text-[38px]
                lg:text-[48px]
                font-black
                leading-[1.05]
              "
              style={{
                color:
                  "#FF6B00",
              }}
            >
              Earn Creds
            </h2>
          </div>

          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              text-[12px]
              sm:text-sm
              lg:text-[15px]
              leading-6
              max-w-[580px]
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Complete secure captcha
            verification every 30
            minutes and instantly
            earn random Revadoo
            creds rewards directly
            into your balance.
          </p>

          {/* MINI INFO */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              mt-4
            "
          >
            {[
              "1-10 Creds",
              "30 Min Cooldown",
              "Anti Bot",
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    px-3
                    py-2
                    rounded-xl
                    text-[10px]
                    sm:text-xs
                    font-semibold
                  "
                  style={{
                    background:
                      "rgba(255,107,0,0.05)",

                    border:
                      "1px solid rgba(255,107,0,0.08)",

                    color:
                      "#374151",
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT STATS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            min-w-full
            sm:min-w-[320px]
            xl:min-w-[340px]
          "
        >
          {[
            {
              icon:
                <FaCoins />,

              title:
                "1-10",

              desc:
                "Random Creds",
            },

            {
              icon:
                <FaClock />,

              title:
                "30m",

              desc:
                "Cooldown",
            },

            {
              icon:
                <FaRobot />,

              title:
                "Secure",

              desc:
                "Anti Bot",
            },

            {
              icon:
                <FaShieldAlt />,

              title:
                "Instant",

              desc:
                "Auto Claim",
            },
          ].map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="
                  rounded-[18px]
                  p-3
                  sm:p-4
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
                    w-9
                    h-9
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-sm
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
                    mt-3
                    text-sm
                    sm:text-lg
                    font-black
                  "
                  style={{
                    color:
                      "#030712",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-[10px]
                    sm:text-xs
                    mt-1
                  "
                  style={{
                    color:
                      "#6b7280",
                    }}
                >
                  {item.desc}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Captcha_Hero;