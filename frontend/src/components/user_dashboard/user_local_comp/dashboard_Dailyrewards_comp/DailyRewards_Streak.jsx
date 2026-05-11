import React, {
  useEffect,
  useState,
} from "react";

import {
  FaFire,
  FaCheck,
  FaTrophy,
} from "react-icons/fa";

const DailyRewards_Streak = () => {
  const [streak, setStreak] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStreak =
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
            setStreak(
              user.streak || 0
            );
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

    fetchStreak();
  }, []);

  /* -----------------------------
     STREAK LOGIC
  ----------------------------- */

  const currentDay =
    streak % 7 === 0 && streak !== 0
      ? 7
      : streak % 7;

  const completedWeeks =
    Math.floor(streak / 7);

  const progressWidth =
    (currentDay / 7) * 100;

  return (
    <div
      className="w-full rounded-[28px] overflow-hidden"
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
      {/* Top Section */}

      <div className="p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left */}

          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background:
                  "rgba(255,107,0,0.08)",
                border:
                  "1px solid rgba(255,107,0,0.12)",
              }}
            >
              <FaFire
                style={{
                  color: "#FF6B00",
                }}
              />

              <span
                className="text-xs font-bold uppercase"
                style={{
                  color: "#FF6B00",
                  letterSpacing:
                    "0.5px",
                }}
              >
                Daily Streak
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black mt-5"
              style={{
                color: "#030712",
                lineHeight: 1.1,
              }}
            >
              Keep Your
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                Streak Alive
              </span>
            </h2>

            <p
              className="mt-4 text-sm sm:text-base leading-relaxed max-w-2xl"
              style={{
                color: "#6b7280",
              }}
            >
              Complete daily
              activities and maintain
              your streak to unlock
              better rewards every
              week.
            </p>
          </div>

          {/* Right Stats */}

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            {/* Current Streak */}

            <div
              className="rounded-3xl p-5 min-w-[150px]"
              style={{
                background:
                  "rgba(255,107,0,0.06)",
                border:
                  "1px solid rgba(255,107,0,0.08)",
              }}
            >
              <p
                className="text-xs uppercase font-bold"
                style={{
                  color: "#6b7280",
                }}
              >
                Current
              </p>

              <h1
                className="text-4xl sm:text-5xl font-black mt-3"
                style={{
                  color: "#FF6B00",
                  lineHeight: 1,
                }}
              >
                {loading
                  ? "..."
                  : streak}
              </h1>

              <p
                className="text-sm mt-2"
                style={{
                  color: "#6b7280",
                }}
              >
                Active Days
              </p>
            </div>

            {/* Week */}

            <div
              className="rounded-3xl p-5 min-w-[150px]"
              style={{
                background:
                  "rgba(0,0,0,0.02)",
                border:
                  "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center justify-between">
                <FaTrophy
                  style={{
                    color: "#FF6B00",
                  }}
                />

                <span
                  className="text-xs font-bold uppercase"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Weekly
                </span>
              </div>

              <h2
                className="text-3xl font-black mt-4"
                style={{
                  color: "#030712",
                }}
              >
                Week{" "}
                {completedWeeks}
              </h2>

              <p
                className="text-sm mt-2"
                style={{
                  color: "#6b7280",
                }}
              >
                Completed
              </p>
            </div>
          </div>
        </div>

        {/* Progress Area */}

        <div
          className="mt-8 rounded-[28px] p-4 sm:p-6"
          style={{
            background:
              "rgba(0,0,0,0.02)",
            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* Progress Header */}

          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <div>
              <h3
                className="text-lg font-black"
                style={{
                  color: "#030712",
                }}
              >
                Weekly Progress
              </h3>

              <p
                className="text-sm mt-1"
                style={{
                  color: "#6b7280",
                }}
              >
                Complete 7 active
                days to finish a week
              </p>
            </div>

            <div
              className="px-4 py-2 rounded-xl"
              style={{
                background:
                  "#ffffff",
                border:
                  "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <p
                className="text-sm font-bold"
                style={{
                  color: "#FF6B00",
                }}
              >
                Day {currentDay} / 7
              </p>
            </div>
          </div>

          {/* Days */}

          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map(
              (day) => {
                const active =
                  day <= currentDay;

                return (
                  <div
                    key={day}
                    className="rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        active
                          ? "#FF6B00"
                          : "#ffffff",

                      border:
                        active
                          ? "1px solid rgba(255,107,0,0.15)"
                          : "1px solid rgba(0,0,0,0.05)",

                      boxShadow:
                        active
                          ? "0 10px 20px rgba(255,107,0,0.12)"
                          : "none",
                    }}
                  >
                    <span
                      className="text-[10px] sm:text-xs uppercase font-bold"
                      style={{
                        color: active
                          ? "#ffffff"
                          : "#6b7280",
                      }}
                    >
                      Day
                    </span>

                    <h3
                      className="text-lg sm:text-2xl font-black mt-1"
                      style={{
                        color: active
                          ? "#ffffff"
                          : "#030712",
                      }}
                    >
                      {day}
                    </h3>

                    {active && (
                      <div className="mt-2">
                        <FaCheck
                          className="text-xs"
                          style={{
                            color:
                              "#ffffff",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Progress Bar */}

          <div className="mt-6">
            <div
              className="w-full h-3 rounded-full overflow-hidden"
              style={{
                background:
                  "rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressWidth}%`,
                  background:
                    "#FF6B00",
                }}
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <p
                className="text-xs font-semibold"
                style={{
                  color: "#6b7280",
                }}
              >
                Progress
              </p>

              <p
                className="text-xs font-bold"
                style={{
                  color: "#FF6B00",
                }}
              >
                {Math.floor(
                  progressWidth
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewards_Streak;