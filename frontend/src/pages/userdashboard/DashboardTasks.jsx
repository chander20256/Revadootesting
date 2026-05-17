import React from "react";

import { useParams } from "react-router-dom";

import Creds_main from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/creds_codes/Creds_main";

import Captcha_main from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/Captcha_task/Captcha_main";

import Lucky_Draw_main from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/Lucky_Draw/Lucky_Draw_main";

import Shortlinks_main from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/Short_links/Shortlinks_main";

import PTC_main from "../../components/user_dashboard/user_local_comp/dashboard_task_comp/PTC_ADS/PTC_main";

const DashboardTasks = () => {
  const { category } =
    useParams();

  /* --------------------------------
     CREDS CODES
  -------------------------------- */

  if (
    category ===
    "creds-codes"
  ) {
    return (
      <div className="w-full min-h-screen p-4 md:p-6">
        <Creds_main />
      </div>
    );
  }

  /* --------------------------------
     CAPTCHA TASKS
  -------------------------------- */

  if (
    category ===
    "captcha"
  ) {
    return (
      <div className="w-full min-h-screen p-4 md:p-6">
        <Captcha_main />
      </div>
    );
  }

  /* --------------------------------
     LUCKY DRAW
  -------------------------------- */

  if (
    category ===
    "lucky-draw"
  ) {
    return (
      <div className="w-full min-h-screen p-4 md:p-6">
        <Lucky_Draw_main />
      </div>
    );
  }

  /* --------------------------------
     SHORTLINKS
  -------------------------------- */

  if (
    category ===
    "shortlinks"
  ) {
    return (
      <div className="w-full min-h-screen p-4 md:p-6">
        <Shortlinks_main />
      </div>
    );
  }

  /* --------------------------------
   PTC ADS
-------------------------------- */

if (
  category ===
  "ptc-ads"
) {
  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      <PTC_main />
    </div>
  );
}

  /* --------------------------------
     DEFAULT TASKS PAGE
  -------------------------------- */

  return (
    <div
      className="
        w-full
        min-h-screen
        p-4
        md:p-6
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* MAIN CARD */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          p-6
          sm:p-8
          lg:p-12
        "
        style={{
          background:
            "#ffffff",

          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        {/* ORANGE GLOW */}

        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-[260px]
            h-[260px]
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background:
              "#FF6B00",
          }}
        />

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
          {/* BADGE */}

          <div className="flex items-center gap-3">
            <div
              className="
                p-2
                rounded-xl
              "
              style={{
                background:
                  "rgba(255,107,0,0.1)",
              }}
            >
              <span
                style={{
                  fontSize:
                    "20px",
                }}
              >
                📋
              </span>
            </div>

            <div>
              <p
                className="
                  text-xs
                  uppercase
                  font-bold
                  tracking-wider
                "
                style={{
                  color:
                    "#FF6B00",
                }}
              >
                Revadoo Tasks
              </p>

              <p
                className="
                  text-sm
                  font-medium
                  mt-0.5
                "
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Reward task center
              </p>
            </div>
          </div>

          {/* TITLE */}

          <div className="space-y-3">
            <h1
              className="
                text-3xl
                sm:text-4xl
                lg:text-6xl
                font-black
                tracking-tight
              "
              style={{
                color:
                  "#030712",

                lineHeight:
                  1.1,
              }}
            >
              Complete Tasks
              &
            </h1>

            <h1
              className="
                text-3xl
                sm:text-4xl
                lg:text-6xl
                font-black
              "
              style={{
                color:
                  "#FF6B00",

                lineHeight:
                  1.1,
              }}
            >
              Earn Rewards
            </h1>
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-4 max-w-4xl">
            <p
              className="
                text-sm
                sm:text-base
                font-semibold
              "
              style={{
                color:
                  "#030712",
              }}
            >
              Choose from multiple
              earning systems on
              Revadoo.
            </p>

            <p
              className="
                text-sm
                sm:text-base
                leading-relaxed
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              Earn free creds,
              leaderboard points,
              EXP bonuses, streak
              rewards, and instant
              bonuses by completing
              PTC ads, shortlinks,
              captcha tasks,
              offerwalls, Telegram
              missions, social
              tasks, and promotional
              campaigns.
            </p>
          </div>

          {/* STATS */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              gap-4
              pt-4
            "
          >
            {[
              {
                title:
                  "Task Categories",
                value: "10+",
              },

              {
                title:
                  "Daily Tasks",
                value: "500+",
              },

              {
                title:
                  "Reward Types",
                value: "Unlimited",
              },

              {
                title:
                  "Claim Speed",
                value: "Instant",
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
                      "rgba(255,107,0,0.04)",

                    border:
                      "1px solid rgba(255,107,0,0.08)",
                  }}
                >
                  <h3
                    className="
                      text-lg
                      sm:text-2xl
                      font-black
                    "
                    style={{
                      color:
                        "#FF6B00",
                    }}
                  >
                    {
                      item.value
                    }
                  </h3>

                  <p
                    className="
                      text-xs
                      sm:text-sm
                      mt-2
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    {
                      item.title
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTasks;