import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Gamepad2,
  Eye,
  Link2,
  Gift,
  ClipboardList,
  Users,
  Zap,
  Rocket,
} from "lucide-react";

import PointsExchange from "./PointsExchange";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Daily Rewards",
      desc: "Claim streak bonuses and daily EXP rewards",
      icon: Zap,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/daily-rewards",
    },

    {
      label: "Instant Tasks",
      desc: "Complete social tasks and unlock free creds",
      icon: Rocket,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/instant-tasks",
    },

    {
      label: "PTC Ads",
      desc: "Watch ads and earn daily rewards instantly",
      icon: Eye,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/tasks/ptc",
    },

    {
      label: "Shortlinks",
      desc: "Complete quick shortlink earning tasks",
      icon: Link2,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/tasks/short-link",
    },

    {
      label: "Surveys",
      desc: "Earn higher rewards with premium surveys",
      icon: ClipboardList,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/tasks/survey",
    },

    {
      label: "Lucky Draw",
      desc: "Join lucky draws and unlock bonus rewards",
      icon: Gift,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/tasks/lucky-draw",
    },

    {
      label: "Games",
      desc: "Play interactive games and earn free creds",
      icon: Gamepad2,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/games",
    },

    {
      label: "Referrals",
      desc: "Invite friends and boost your earnings",
      icon: Users,
      color: "#FF6B00",
      bg: "rgba(255,107,0,0.1)",
      border: "rgba(255,107,0,0.15)",
      route: "/dashboard/referrals",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* SEO CONTENT */}

      <div className="flex flex-col xl:flex-row gap-6">
        {/* LEFT */}

        <div
          className="flex-1 rounded-3xl p-5 sm:p-6"
          style={{
            background: "#ffffff",

            border:
              "1px solid rgba(255,107,0,0.08)",

            boxShadow:
              "0 2px 12px rgba(0,0,0,0.04)",

            fontFamily:
              "'DM Sans', sans-serif",
          }}
        >
          <p
            className="text-xs uppercase font-black tracking-wide"
            style={{
              color: "#FF6B00",
            }}
          >
            Earn Free Rewards
          </p>

          <h2
            className="text-xl sm:text-2xl md:text-3xl font-black mt-2"
            style={{
              color: "#030712",
            }}
          >
            Best Ways To Earn On
            Revadoo
          </h2>

          <p
            className="text-sm sm:text-base leading-7 mt-4"
            style={{
              color: "#6b7280",
            }}
          >
            Revadoo is a modern
            rewards platform where
            users can earn free
            credits through daily
            rewards, instant social
            tasks, PTC ads,
            shortlinks, surveys,
            games, lucky draws, and
            referral programs.
            Complete simple earning
            activities, maintain
            your streaks, unlock
            EXP bonuses, and grow
            your account with
            interactive reward
            systems designed for
            active community
            members.
          </p>
        </div>

        {/* RIGHT */}

        <PointsExchange />
      </div>

      {/* ACTIONS */}

      <div
        className="
          grid 
          grid-cols-2
          md:grid-cols-4 
          gap-3 
          w-full
        "
        style={{
          fontFamily:
            "'DM Sans', sans-serif",
        }}
      >
        {actions.map(
          (action, index) => {
            const IconComponent =
              action.icon;

            return (
              <button
                key={index}
                onClick={() =>
                  navigate(
                    action.route
                  )
                }
                className="
                  group
                  flex 
                  flex-col 
                  items-start
                  justify-between
                  gap-3 
                  rounded-2xl 
                  py-4
                  px-4
                  text-left
                  transition-all 
                  duration-300
                  hover:-translate-y-1
                "
                style={{
                  background:
                    "#ffffff",

                  border: `1px solid ${action.border}`,

                  boxShadow:
                    "0 2px 12px rgba(0,0,0,0.04)",

                  cursor: "pointer",
                }}
                onMouseEnter={(
                  e
                ) => {
                  e.currentTarget.style.boxShadow =
                    "0 10px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(
                  e
                ) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.04)";
                }}
              >
                {/* TOP */}

                <div className="flex items-center justify-between w-full">
                  {/* ICON */}

                  <div
                    className="
                      flex 
                      items-center 
                      justify-center 
                      rounded-xl 
                      p-2.5
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-6
                    "
                    style={{
                      background:
                        action.bg,

                      border: `1px solid ${action.border}`,
                    }}
                  >
                    <IconComponent
                      width={20}
                      height={20}
                      color={
                        action.color
                      }
                      className="
                        transition-all
                        duration-300
                        group-hover:scale-125
                      "
                    />
                  </div>

                  {/* MINI LINE */}

                  <div
                    className="h-[2px] flex-1 ml-3 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,107,0,0.25), transparent)",
                    }}
                  />
                </div>

                {/* TEXT */}

                <div className="space-y-1">
                  <span
                    className="
                      text-sm 
                      sm:text-[15px]
                      font-bold 
                      block
                      transition-all
                      duration-300
                      group-hover:tracking-wide
                    "
                    style={{
                      color:
                        "#030712",
                    }}
                  >
                    {action.label}
                  </span>

                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    {action.desc}
                  </p>
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default QuickActions;