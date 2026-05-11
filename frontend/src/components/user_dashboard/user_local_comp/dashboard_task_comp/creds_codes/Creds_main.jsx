import React from "react";

import Creds_Hero from "./Creds_Hero";
import Creds_claim from "./Creds_claim";
import Creds_history from "./Creds_history";
import Creds_rewards from "./Creds_rewards";

function Creds_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-4
        sm:space-y-5
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* HERO */}

      <Creds_Hero />

      {/* TELEGRAM REWARDS */}

      <Creds_rewards />

      {/* MOBILE TOP ADS */}

      <div
        className="
          block
          xl:hidden
          w-full
          h-[120px]
          sm:h-[140px]
          rounded-[24px]
          flex
          items-center
          justify-center
          text-sm
          font-semibold
        "
        style={{
          background:
            "rgba(255,107,0,0.05)",

          border:
            "1px dashed rgba(255,107,0,0.18)",

          color:
            "#FF6B00",
        }}
      >
        Mobile Banner Ads
      </div>

      {/* MAIN SECTION */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_300px]
          gap-4
          sm:gap-5
          items-start
        "
      >
        {/* LEFT SIDE */}

        <div className="space-y-4 sm:space-y-5">
          {/* CLAIM */}

          <Creds_claim />

          {/* RESPONSIVE ADS */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="
                h-[110px]
                sm:h-[120px]
                w-full
                flex
                items-center
                justify-center
                text-sm
                font-semibold
              "
              style={{
                background:
                  "rgba(255,107,0,0.03)",

                color: "#9ca3af",
              }}
            >
              Responsive Banner Ad
            </div>
          </div>

          {/* HISTORY */}

          <Creds_history />

          {/* LARGE MOBILE ADS */}

          <div
            className="
              block
              xl:hidden
              rounded-[24px]
              overflow-hidden
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="
                h-[180px]
                sm:h-[220px]
                w-full
                flex
                items-center
                justify-center
                text-sm
                font-semibold
              "
              style={{
                background:
                  "rgba(255,107,0,0.03)",

                color: "#9ca3af",
              }}
            >
              Large Mobile Ads Space
            </div>
          </div>

          {/* NATIVE STYLE AD */}

          <div
            className="
              rounded-[24px]
              p-4
              sm:p-5
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              "
            >
              {/* LEFT */}

              <div className="flex-1">
                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                  "
                  style={{
                    color: "#FF6B00",
                  }}
                >
                  Sponsored
                </span>

                <h3
                  className="
                    mt-2
                    text-lg
                    sm:text-xl
                    font-black
                  "
                  style={{
                    color: "#111827",
                  }}
                >
                  Earn Extra Revadoo
                  Creds Daily
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-7
                  "
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Complete premium
                  offers and rewarded
                  tasks to unlock bonus
                  credits instantly.
                </p>
              </div>

              {/* CTA */}

              <button
                className="
                  h-11
                  sm:h-12
                  px-5
                  sm:px-6
                  rounded-2xl
                  text-white
                  font-bold
                  text-sm
                  whitespace-nowrap
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                "
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                  boxShadow:
                    "0 10px 25px rgba(255,107,0,0.20)",
                }}
              >
                Open Offerwall
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <div
          className="
            hidden
            xl:flex
            flex-col
            gap-5
            sticky
            top-24
          "
        >
          {/* 300x250 */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="
                w-full
                h-[250px]
                flex
                items-center
                justify-center
                text-sm
                font-semibold
              "
              style={{
                background:
                  "rgba(255,107,0,0.03)",

                color: "#9ca3af",
              }}
            >
              300x250 Sidebar Ad
            </div>
          </div>

          {/* SECONDARY SIDEBAR */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="
                w-full
                h-[280px]
                flex
                items-center
                justify-center
                text-sm
                font-semibold
              "
              style={{
                background:
                  "rgba(255,107,0,0.03)",

                color: "#9ca3af",
              }}
            >
              Native / Image Ad
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creds_main;