import React from "react";

import {
  FaRocket,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGoogle,
  FaCoins,
} from "react-icons/fa";

const Instant_hero = () => {
  return (
    <div
      className="w-full rounded-[28px] overflow-hidden relative"
      style={{
        background: "#ffffff",
        border:
          "1px solid rgba(255,107,0,0.08)",
        boxShadow:
          "0 20px 50px rgba(0,0,0,0.05)",
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-52 sm:w-72 h-52 sm:h-72 bg-black/[0.03] blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-52 sm:w-72 h-52 sm:h-72 bg-gray-200/40 blur-3xl rounded-full"></div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* TOP BADGE */}

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            background:
              "rgba(255,107,0,0.08)",

            border:
              "1px solid rgba(255,107,0,0.12)",
          }}
        >
          <FaRocket
            style={{
              color: "#FF6B00",
            }}
          />

          <span
            className="text-[10px] sm:text-xs uppercase font-black tracking-wide"
            style={{
              color: "#FF6B00",
            }}
          >
            One Time Rewards
          </span>
        </div>

        {/* HERO CONTENT */}

        <div className="mt-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          {/* LEFT */}

          <div className="w-full max-w-2xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
              style={{
                color: "#030712",
              }}
            >
              Complete Simple
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                Instant Tasks
              </span>
            </h1>

            <p
              className="mt-4 sm:mt-5 text-sm sm:text-base leading-7"
              style={{
                color: "#6b7280",
              }}
            >
              Follow our social
              platforms, rate
              Revadoo, and complete
              quick community tasks
              to unlock one-time
              rewards instantly.
            </p>
          </div>

          {/* RIGHT STATS */}

          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full xl:max-w-md">
            {/* INSTAGRAM */}

            <div
              className="rounded-3xl p-4 sm:p-5"
              style={{
                background:
                  "#fffaf5",

                border:
                  "1px solid rgba(255,107,0,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <FaInstagram
                  style={{
                    color:
                      "#FF6B00",

                    fontSize:
                      "20px",
                  }}
                />

                <span
                  className="text-[11px] sm:text-xs font-black"
                  style={{
                    color:
                      "#FF6B00",
                  }}
                >
                  +5
                </span>
              </div>

              <h3
                className="text-base sm:text-lg font-black mt-4"
                style={{
                  color: "#030712",
                }}
              >
                Instagram
              </h3>

              <p
                className="text-[11px] sm:text-xs mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                Follow our page
              </p>
            </div>

            {/* FACEBOOK */}

            <div
              className="rounded-3xl p-4 sm:p-5"
              style={{
                background:
                  "#fffaf5",

                border:
                  "1px solid rgba(255,107,0,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <FaFacebook
                  style={{
                    color:
                      "#FF6B00",

                    fontSize:
                      "20px",
                  }}
                />

                <span
                  className="text-[11px] sm:text-xs font-black"
                  style={{
                    color:
                      "#FF6B00",
                  }}
                >
                  +5
                </span>
              </div>

              <h3
                className="text-base sm:text-lg font-black mt-4"
                style={{
                  color: "#030712",
                }}
              >
                Facebook
              </h3>

              <p
                className="text-[11px] sm:text-xs mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                Join community
              </p>
            </div>

            {/* LINKEDIN */}

            <div
              className="rounded-3xl p-4 sm:p-5"
              style={{
                background:
                  "#fffaf5",

                border:
                  "1px solid rgba(255,107,0,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <FaLinkedin
                  style={{
                    color:
                      "#FF6B00",

                    fontSize:
                      "20px",
                  }}
                />

                <span
                  className="text-[11px] sm:text-xs font-black"
                  style={{
                    color:
                      "#FF6B00",
                  }}
                >
                  +8
                </span>
              </div>

              <h3
                className="text-base sm:text-lg font-black mt-4"
                style={{
                  color: "#030712",
                }}
              >
                LinkedIn
              </h3>

              <p
                className="text-[11px] sm:text-xs mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                Follow updates
              </p>
            </div>

            {/* GOOGLE */}

            <div
              className="rounded-3xl p-4 sm:p-5"
              style={{
                background:
                  "#fffaf5",

                border:
                  "1px solid rgba(255,107,0,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <FaGoogle
                  style={{
                    color:
                      "#FF6B00",

                    fontSize:
                      "20px",
                  }}
                />

                <span
                  className="text-[11px] sm:text-xs font-black"
                  style={{
                    color:
                      "#FF6B00",
                  }}
                >
                  +10
                </span>
              </div>

              <h3
                className="text-base sm:text-lg font-black mt-4"
                style={{
                  color: "#030712",
                }}
              >
                Google
              </h3>

              <p
                className="text-[11px] sm:text-xs mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                Rate Revadoo
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div
          className="mt-6 sm:mt-8 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            background:
              "rgba(0,0,0,0.02)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <p
              className="text-[10px] sm:text-xs uppercase font-black"
              style={{
                color: "#FF6B00",
              }}
            >
              Instant Reward System
            </p>

            <h3
              className="text-lg sm:text-xl font-black mt-2"
              style={{
                color: "#030712",
              }}
            >
              Complete Once. Earn
              Forever.
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "#ffffff",

                border:
                  "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <FaCoins
                style={{
                  color:
                    "#FF6B00",

                  fontSize:
                    "18px",
                }}
              />
            </div>

            <div>
              <p
                className="text-[10px] sm:text-xs uppercase font-black"
                style={{
                  color: "#6b7280",
                }}
              >
                Available Rewards
              </p>

              <h3
                className="text-base sm:text-lg font-black"
                style={{
                  color: "#030712",
                }}
              >
                50+ Creds
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instant_hero;