import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Shortlink_stats() {
  const [stats, setStats] =
    useState([
      {
        title:
          "Total Shortlinks",

        value: 0,

        icon: "🔗",

        desc:
          "Available today",

        progress: "0%",
      },

      {
        title:
          "Total Creds Available",

        value: 0,

        icon: "💰",

        desc:
          "Rewards from all shortlinks",

        progress: "0%",
      },

      {
        title:
          "Creds Earned Today",

        value: 0,

        icon: "⚡",

        desc:
          "Rewards claimed today",

        progress: "0%",
      },

      {
        title:
          "Completed Today",

        value: 0,

        icon: "✅",

        desc:
          "Total completed shortlinks",

        progress: "0%",
      },
    ]);

  /* =========================================
     FETCH SHORTLINK STATS
  ========================================= */

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const response =
          await axios.get(
            "https://revadoobackend.onrender.com/api/admin/shortlinks/all"
          );

        const shortlinks =
          response.data
            .shortlinks || [];

        /* =========================================
           TOTAL SHORTLINKS
        ========================================= */

        const totalShortlinks =
          shortlinks.length;

        /* =========================================
           TOTAL CREDS AVAILABLE

           Example:
           Link 1 = 10
           Link 2 = 20

           Total = 30
        ========================================= */

        const totalCredsAvailable =
          shortlinks.reduce(
            (acc, item) => {
              return (
                acc +
                (item.reward || 0)
              );
            },

            0
          );

        /* =========================================
           CREDS EARNED TODAY

           Example:
           reward = 10
           completed = 2

           earned = 20
        ========================================= */

        const credsEarnedToday =
          shortlinks.reduce(
            (acc, item) => {
              const reward =
                item.reward || 0;

              const completed =
                item.totalCompleted ||
                0;

              return (
                acc +
                reward *
                  completed
              );
            },

            0
          );

        /* =========================================
           TOTAL COMPLETED TODAY
        ========================================= */

        const completedToday =
          shortlinks.reduce(
            (acc, item) => {
              return (
                acc +
                (item.totalCompleted ||
                  0)
              );
            },

            0
          );

        /* =========================================
           UPDATE UI
        ========================================= */

        setStats([
          {
            title:
              "Total Shortlinks",

            value:
              totalShortlinks,

            icon: "🔗",

            desc:
              "Available today",

            progress: "90%",
          },

          {
            title:
              "Total Creds Available",

            value:
              totalCredsAvailable,

            icon: "💰",

            desc:
              "Rewards from all shortlinks",

            progress: "75%",
          },

          {
            title:
              "Creds Earned Today",

            value:
              credsEarnedToday,

            icon: "⚡",

            desc:
              "Rewards claimed today",

            progress: "65%",
          },

          {
            title:
              "Completed Today",

            value:
              completedToday,

            icon: "✅",

            desc:
              "Total completed shortlinks",

            progress: "85%",
          },
        ]);
      } catch (error) {
        console.error(
          "FETCH SHORTLINK STATS ERROR:",
          error
        );
      }
    };

  return (
    <div
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* SEO TEXT */}

      <p
        className="
          text-xs
          sm:text-sm
          font-medium
          leading-relaxed
          mb-2
        "
        style={{
          color: "#6b7280",
        }}
      >
        Complete premium
        shortlinks, earn instant
        Revadoo creds, unlock
        daily rewards, and
        maximize your earnings
        with trusted high-paying
        links.
      </p>

      {/* SEO SUB TEXT */}

      <p
        className="
          text-[11px]
          sm:text-xs
          leading-relaxed
          mb-5
        "
        style={{
          color: "#9ca3af",
        }}
      >
        Discover the best paying
        shortlinks platform to
        earn free online rewards,
        instant creds, bonus EXP,
        and daily earnings
        through trusted reward
        links on Revadoo.
      </p>

      {/* STATS GRID */}

      <div
        className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-3
          sm:gap-4
        "
      >
        {stats.map((item, index) => (
          <div
            key={index}
            className="
              relative
              overflow-hidden
              rounded-[22px]
              sm:rounded-[28px]
              p-3
              sm:p-5
              transition-all
              duration-300
              hover:-translate-y-1
            "
            style={{
              background: "#ffffff",

              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 8px 20px rgba(0,0,0,0.04)",
            }}
          >
            {/* TOP */}

            <div className="flex items-start justify-between gap-2">
              <div
                className="
                  w-10
                  h-10
                  sm:w-14
                  sm:h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  sm:text-2xl
                  shrink-0
                "
                style={{
                  background:
                    "rgba(255,107,0,0.10)",
                }}
              >
                {item.icon}
              </div>

              <div
                className="
                  px-2
                  sm:px-3
                  py-1
                  rounded-full
                  text-[8px]
                  sm:text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  whitespace-nowrap
                "
                style={{
                  background:
                    "rgba(255,107,0,0.08)",

                  color: "#FF6B00",
                }}
              >
                LIVE
              </div>
            </div>

            {/* CONTENT */}

            <div className="mt-4 sm:mt-6 space-y-1 sm:space-y-2">
              <h2
                className="
                  text-xl
                  sm:text-3xl
                  font-black
                  tracking-tight
                  break-words
                "
                style={{
                  color: "#030712",
                }}
              >
                {item.value}
              </h2>

              <h3
                className="
                  text-[11px]
                  sm:text-sm
                  font-bold
                  leading-snug
                "
                style={{
                  color: "#FF6B00",
                }}
              >
                {item.title}
              </h3>

              <p
                className="
                  hidden
                  sm:block
                  text-xs
                  leading-relaxed
                "
                style={{
                  color: "#6b7280",
                }}
              >
                {item.desc}
              </p>
            </div>

            {/* PROGRESS */}

            <div
              className="
                mt-4
                sm:mt-5
                h-[5px]
                sm:h-[6px]
                rounded-full
                overflow-hidden
              "
              style={{
                background:
                  "rgba(255,107,0,0.08)",
              }}
            >
              <div
                className="
                  h-full
                  rounded-full
                "
                style={{
                  width:
                    item.progress,

                  background:
                    "#FF6B00",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shortlink_stats;