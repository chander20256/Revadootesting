import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function PTC_stats() {
  const [stats, setStats] =
    useState([
      {
        title:
          "Total PTC Ads",

        value: 0,

        icon: "📺",

        desc:
          "Available paid-to-click ads",

        progress: "0%",
      },

      {
        title:
          "Total Creds Available",

        value: 0,

        icon: "💰",

        desc:
          "Rewards available from PTC ads",

        progress: "0%",
      },

      {
        title:
          "Claimed Today",

        value: 0,

        icon: "⚡",

        desc:
          "Rewards claimed from PTC tasks",

        progress: "0%",
      },

      {
        title:
          "Completed Today",

        value: 0,

        icon: "✅",

        desc:
          "Completed paid-to-click ads",

        progress: "0%",
      },
    ]);

  /* =========================================
     FETCH PTC STATS
  ========================================= */

  useEffect(() => {
    fetchPTCStats();
  }, []);

  const fetchPTCStats =
    async () => {
      try {
        const response =
          await axios.get(
            "https://revadoobackend.onrender.com/api/ptc/all"
          );

        const ptcAds =
          response?.data
            ?.ptcAds || [];

        /* =========================================
           TOTAL PTC ADS
        ========================================= */

        const totalPTCAds =
          ptcAds.length || 0;

        /* =========================================
           TOTAL CREDS AVAILABLE
        ========================================= */

        const totalCredsAvailable =
          ptcAds.reduce(
            (acc, item) => {
              return (
                acc +
                (item?.reward || 0)
              );
            },

            0
          ) || 0;

        /* =========================================
           CLAIMED TODAY
        ========================================= */

        const claimedToday =
          ptcAds.reduce(
            (acc, item) => {
              const reward =
                item?.reward || 0;

              const completed =
                item?.totalCompleted ||
                0;

              return (
                acc +
                reward *
                  completed
              );
            },

            0
          ) || 0;

        /* =========================================
           COMPLETED TODAY
        ========================================= */

        const completedToday =
          ptcAds.reduce(
            (acc, item) => {
              return (
                acc +
                (item?.totalCompleted ||
                  0)
              );
            },

            0
          ) || 0;

        /* =========================================
           UPDATE UI
        ========================================= */

        setStats([
          {
            title:
              "Total PTC Ads",

            value:
              totalPTCAds || 0,

            icon: "📺",

            desc:
              "Available paid-to-click ads",

            progress:
              totalPTCAds > 0
                ? "92%"
                : "0%",
          },

          {
            title:
              "Total Creds Available",

            value:
              totalCredsAvailable ||
              0,

            icon: "💰",

            desc:
              "Rewards available from PTC ads",

            progress:
              totalCredsAvailable >
              0
                ? "78%"
                : "0%",
          },

          {
            title:
              "Claimed Today",

            value:
              claimedToday || 0,

            icon: "⚡",

            desc:
              "Rewards claimed from PTC tasks",

            progress:
              claimedToday > 0
                ? "65%"
                : "0%",
          },

          {
            title:
              "Completed Today",

            value:
              completedToday || 0,

            icon: "✅",

            desc:
              "Completed paid-to-click ads",

            progress:
              completedToday > 0
                ? "88%"
                : "0%",
          },
        ]);
      } catch (error) {
        console.error(
          "FETCH PTC STATS ERROR:",
          error
        );

        /* =========================================
           KEEP ZERO UI
        ========================================= */

        setStats([
          {
            title:
              "Total PTC Ads",

            value: 0,

            icon: "📺",

            desc:
              "Available paid-to-click ads",

            progress: "0%",
          },

          {
            title:
              "Total Creds Available",

            value: 0,

            icon: "💰",

            desc:
              "Rewards available from PTC ads",

            progress: "0%",
          },

          {
            title:
              "Claimed Today",

            value: 0,

            icon: "⚡",

            desc:
              "Rewards claimed from PTC tasks",

            progress: "0%",
          },

          {
            title:
              "Completed Today",

            value: 0,

            icon: "✅",

            desc:
              "Completed paid-to-click ads",

            progress: "0%",
          },
        ]);
      }
    };

  return (
    <section
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
        paid-to-click ads, earn
        instant Revadoo creds,
        unlock daily rewards,
        and maximize your online
        earnings with trusted PTC
        sponsor campaigns.
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
        Discover high-paying PTC
        ads, sponsor tasks,
        external reward campaigns,
        and daily earning
        opportunities through the
        Revadoo rewards platform.
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
          <article
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
                  transition-all
                  duration-500
                "
                style={{
                  width:
                    item.progress,

                  background:
                    "#FF6B00",
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PTC_stats;