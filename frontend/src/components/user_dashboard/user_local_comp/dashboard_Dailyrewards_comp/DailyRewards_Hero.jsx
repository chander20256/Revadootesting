import React, {
  useEffect,
  useState,
} from "react";

import {
  FaBolt,
  FaFire,
  FaGift,
} from "react-icons/fa";

const DailyRewards_Hero = () => {
  const [stats, setStats] =
    useState({
      exp: 0,
      streak: 0,
      dailyBonus: 50,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStats =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) return;

          const res = await fetch(
            "https://revadoobackend.onrender.com/api/progress/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data =
            await res.json();

          const user =
            data.data || data.user;

          if (user) {
            setStats({
              exp:
                user.exp || 0,

              streak:
                user.streak || 0,

              dailyBonus:
                user.dailyBonus ||
                50,
            });
          }
        } catch (err) {
          console.error(
            "Failed to fetch instant rewards data",
            err
          );
        } finally {
          setLoading(false);
        }
      };

    fetchStats();
  }, []);

  return (
    <div
      className="w-full rounded-[28px] p-5 sm:p-7 overflow-hidden relative"
      style={{
        background: "#ffffff",
        border:
          "1px solid rgba(0,0,0,0.05)",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.04)",
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* Soft Glow */}

      <div
        className="absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl"
        style={{
          background:
            "rgba(255,107,0,0.08)",
        }}
      />

      <div className="relative z-10">
        {/* Badge */}

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            background:
              "rgba(255,107,0,0.08)",
            border:
              "1px solid rgba(255,107,0,0.12)",
          }}
        >
          <FaBolt
            style={{
              color: "#FF6B00",
            }}
          />

          <span
            className="text-xs sm:text-sm font-bold uppercase"
            style={{
              color: "#FF6B00",
              letterSpacing:
                "0.5px",
            }}
          >
            Instant Rewards
          </span>
        </div>

        {/* Heading */}

        <div className="mt-5">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black"
            style={{
              color: "#030712",
              lineHeight: 1.1,
            }}
          >
            Earn More With
          </h1>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mt-1"
            style={{
              color: "#FF6B00",
              lineHeight: 1.1,
            }}
          >
            Daily Rewards
          </h2>

          <p
            className="mt-4 text-sm sm:text-base max-w-2xl leading-relaxed"
            style={{
              color: "#6b7280",
            }}
          >
            Maintain streaks, claim
            daily bonuses, and earn
            EXP rewards through
            instant activities.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
          {/* Daily Bonus */}

          <div
            className="rounded-2xl p-4"
            style={{
              background:
                "rgba(0,0,0,0.02)",
              border:
                "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-xs uppercase font-bold"
                style={{
                  color: "#6b7280",
                }}
              >
                Daily Bonus
              </p>

              <FaGift
                style={{
                  color: "#FF6B00",
                }}
              />
            </div>

            <h3
              className="text-2xl font-black mt-3"
              style={{
                color: "#030712",
              }}
            >
              {loading
                ? "..."
                : `+${stats.dailyBonus}`}
            </h3>
          </div>

          {/* Streak */}

          <div
            className="rounded-2xl p-4"
            style={{
              background:
                "rgba(0,0,0,0.02)",
              border:
                "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-xs uppercase font-bold"
                style={{
                  color: "#6b7280",
                }}
              >
                Active Streak
              </p>

              <FaFire
                style={{
                  color: "#FF6B00",
                }}
              />
            </div>

            <h3
              className="text-2xl font-black mt-3"
              style={{
                color: "#030712",
              }}
            >
              {loading
                ? "..."
                : `${stats.streak} Days`}
            </h3>
          </div>

          {/* EXP */}

          <div
            className="rounded-2xl p-4"
            style={{
              background:
                "rgba(0,0,0,0.02)",
              border:
                "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-xs uppercase font-bold"
                style={{
                  color: "#6b7280",
                }}
              >
                Total EXP
              </p>

              <FaBolt
                style={{
                  color: "#FF6B00",
                }}
              />
            </div>

            <h3
              className="text-2xl font-black mt-3"
              style={{
                color: "#030712",
              }}
            >
              {loading
                ? "..."
                : stats.exp}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewards_Hero;