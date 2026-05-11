import React from "react";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGoogle,
  FaYoutube,
  FaDiscord,
  FaTelegramPlane,
  FaArrowRight,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const tasks = [
  {
    id: 1,
    title: "Follow On Instagram",
    description:
      "Follow the official Revadoo Instagram page.",
    reward: 5,
    icon: <FaInstagram />,
    button: "Follow Instagram",
  },

  {
    id: 2,
    title: "Like Facebook Page",
    description:
      "Join and follow the Revadoo Facebook community.",
    reward: 5,
    icon: <FaFacebook />,
    button: "Follow Facebook",
  },

  {
    id: 3,
    title: "Follow On LinkedIn",
    description:
      "Stay updated with Revadoo announcements.",
    reward: 7,
    icon: <FaLinkedin />,
    button: "Follow LinkedIn",
  },

  {
    id: 4,
    title: "Rate Revadoo",
    description:
      "Leave a quick rating on Google.",
    reward: 10,
    icon: <FaGoogle />,
    button: "Rate Us",
  },

  {
    id: 5,
    title: "Subscribe YouTube",
    description:
      "Subscribe to our official YouTube channel.",
    reward: 7,
    icon: <FaYoutube />,
    button: "Subscribe",
  },

  {
    id: 6,
    title: "Join Discord Server",
    description:
      "Become part of the Revadoo community.",
    reward: 5,
    icon: <FaDiscord />,
    button: "Join Discord",
  },

  {
    id: 7,
    title: "Follow On X",
    description:
      "Follow Revadoo on X for platform updates.",
    reward: 5,
    icon: <FaXTwitter />,
    button: "Follow X",
  },

  {
    id: 8,
    title: "Join Telegram",
    description:
      "Join the official Revadoo Telegram community.",
    reward: 6,
    icon: <FaTelegramPlane />,
    button: "Join Telegram",
  },
];

const Instant_Task = () => {
  return (
    <div
      className="w-full rounded-[28px] overflow-hidden"
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
      <div className="p-4 sm:p-6 md:p-8">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p
              className="text-[11px] uppercase font-black tracking-wide"
              style={{
                color: "#FF6B00",
              }}
            >
              One Time Tasks
            </p>

            <h2
              className="text-2xl sm:text-3xl font-black mt-2"
              style={{
                color: "#030712",
              }}
            >
              Complete & Earn
            </h2>
          </div>

          <div
            className="px-4 py-2 rounded-2xl w-fit"
            style={{
              background:
                "rgba(0,0,0,0.03)",

              border:
                "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <p
              className="text-sm font-black"
              style={{
                color: "#030712",
              }}
            >
              Total Rewards: 50 Creds
            </p>
          </div>
        </div>

        {/* SEO PARAGRAPH */}

        <div className="mt-6 max-w-4xl">
          <p
            className="text-sm sm:text-base leading-7"
            style={{
              color: "#6b7280",
            }}
          >
            Revadoo Instant Tasks
            allows users to earn
            free reward credits by
            completing simple
            social media and
            community engagement
            tasks. Follow Revadoo
            on Instagram, LinkedIn,
            Facebook, X, Telegram,
            Discord, and YouTube
            to unlock instant
            rewards and become an
            active part of the
            growing Revadoo
            community platform.
          </p>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 mt-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{
                background:
                  "#ffffff",

                border:
                  "1px solid rgba(0,0,0,0.06)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.03)",
              }}
            >
              {/* TOP */}

              <div className="flex items-start justify-between gap-3">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl"
                  style={{
                    background:
                      "rgba(0,0,0,0.03)",

                    color:
                      "#030712",
                  }}
                >
                  {task.icon}
                </div>

                <div
                  className="px-2 sm:px-3 py-1 rounded-xl"
                  style={{
                    background:
                      "rgba(255,107,0,0.08)",
                  }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-black"
                    style={{
                      color:
                        "#FF6B00",
                    }}
                  >
                    +{task.reward}
                  </span>
                </div>
              </div>

              {/* CONTENT */}

              <div className="mt-4 sm:mt-5 flex flex-col flex-1">
                <div>
                  <h3
                    className="text-sm sm:text-lg font-black leading-snug"
                    style={{
                      color:
                        "#030712",
                    }}
                  >
                    {task.title}
                  </h3>

                  <p
                    className="text-[11px] sm:text-sm leading-5 sm:leading-6 mt-2"
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    {task.description}
                  </p>
                </div>

                {/* BUTTON */}

                <div className="mt-auto pt-5 sm:pt-6">
                  <button
                    className="w-full py-2.5 sm:py-3 rounded-2xl text-[11px] sm:text-sm font-black flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background:
                        "#FF6B00",

                      color:
                        "#ffffff",

                      boxShadow:
                        "0 10px 20px rgba(255,107,0,0.18)",
                    }}
                  >
                    {task.button}

                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEO BOTTOM */}

        <div
          className="mt-8 rounded-3xl p-5"
          style={{
            background:
              "rgba(0,0,0,0.02)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            className="text-sm leading-7"
            style={{
              color: "#6b7280",
            }}
          >
            Earn free credits
            instantly through
            Revadoo reward tasks.
            Complete one-time
            social actions, unlock
            bonuses, grow your
            streaks, and become a
            verified community
            member while enjoying
            interactive rewards and
            engagement systems on
            the Revadoo platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instant_Task;