import React, {
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  FaBolt,
  FaGift,
  FaCheck,
  FaLock,
} from "react-icons/fa";

const DailyRewards_exp = () => {
  const [userData, setUserData] =
    useState({
      streak: 0,
      exp: 0,
      dailyBonus: 5,
      dailyClaimedAt: null,
    });

  const [loading, setLoading] =
    useState(true);

  const [claiming, setClaiming] =
    useState(false);

  const [locked, setLocked] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState("");

  /* -----------------------------
     FETCH USER
  ----------------------------- */

  useEffect(() => {
    const fetchUser =
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
            data.user || data.data;

          if (user) {
            setUserData({
              streak:
                user.streak || 0,

              exp:
                user.exp || 0,

              dailyBonus:
                user.dailyBonus ||
                5,

              dailyClaimedAt:
                user.dailyClaimedAt ||
                null,
            });
          }
        } catch (err) {
          console.error(err);

          Swal.fire({
            icon: "error",
            title:
              "Failed To Load",
            text:
              "Unable to fetch reward data",
            confirmButtonColor:
              "#FF6B00",
          });
        } finally {
          setLoading(false);
        }
      };

    fetchUser();
  }, []);

  /* -----------------------------
     LOCK SYSTEM
  ----------------------------- */

  useEffect(() => {
    const checkLockStatus =
      () => {
        if (
          !userData.dailyClaimedAt
        ) {
          setLocked(false);

          return;
        }

        const now =
          new Date();

        const claimDate =
          new Date(
            userData.dailyClaimedAt
          );

        const sameDay =
          now.toDateString() ===
          claimDate.toDateString();

        if (sameDay) {
          setLocked(true);

          const tomorrow =
            new Date();

          tomorrow.setHours(
            24,
            0,
            0,
            0
          );

          const diff =
            tomorrow - now;

          const hours =
            Math.floor(
              diff /
                (1000 * 60 * 60)
            );

          const minutes =
            Math.floor(
              (diff %
                (1000 *
                  60 *
                  60)) /
                (1000 * 60)
            );

          const seconds =
            Math.floor(
              (diff %
                (1000 * 60)) /
                1000
            );

          setTimeLeft(
            `${hours}h ${minutes}m ${seconds}s`
          );
        } else {
          setLocked(false);

          setTimeLeft("");
        }
      };

    checkLockStatus();

    const interval =
      setInterval(
        checkLockStatus,
        1000
      );

    return () =>
      clearInterval(interval);
  }, [
    userData.dailyClaimedAt,
  ]);

  /* -----------------------------
     CLAIM REWARD
  ----------------------------- */

  const claimReward =
    async () => {
      try {
        setClaiming(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          "https://revadoobackend.onrender.com/api/progress/claim-daily",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          Swal.fire({
            icon: "error",
            title:
              "Claim Failed",

            text:
              data.message ||
              "Something went wrong",

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        Swal.fire({
          icon: "success",

          title:
            "Reward Claimed",

          html: `
            <div style="font-size:15px;">
              <p>+${data.rewards.creds} Creds</p>
              <p>+${data.rewards.exp} EXP</p>
            </div>
          `,

          confirmButtonColor:
            "#FF6B00",

          background:
            "#ffffff",
        });

        setUserData({
          streak:
            data.user.streak || 0,

          exp:
            data.user.exp || 0,

          dailyBonus:
            data.user.dailyBonus ||
            5,

          dailyClaimedAt:
            data.user
              .dailyClaimedAt ||
            null,
        });
      } catch (err) {
        console.error(err);

        Swal.fire({
          icon: "error",

          title: "Error",

          text:
            "Something went wrong",

          confirmButtonColor:
            "#FF6B00",
        });
      } finally {
        setClaiming(false);
      }
    };

  /* -----------------------------
     LOGIC
  ----------------------------- */

  const currentDay =
    userData.streak >= 7
      ? 7
      : userData.streak;

  const completed =
    userData.streak >= 7;

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
      <div className="p-5 sm:p-7">
        {/* HEADER */}

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
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
                className="text-xs font-bold uppercase"
                style={{
                  color: "#FF6B00",

                  letterSpacing:
                    "0.5px",
                }}
              >
                Daily EXP Rewards
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black mt-5"
              style={{
                color: "#030712",

                lineHeight: 1.1,
              }}
            >
              Claim Your
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                Daily Bonus
              </span>
            </h2>

            <p
              className="mt-4 text-sm sm:text-base max-w-2xl leading-relaxed"
              style={{
                color: "#6b7280",
              }}
            >
              Claim rewards daily to
              gain EXP and maintain
              your weekly streak.
            </p>
          </div>

          {/* EXP */}

          <div
            className="rounded-3xl p-5 min-w-[180px]"
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
              Total EXP
            </p>

            <h2
              className="text-4xl font-black mt-3"
              style={{
                color: "#FF6B00",
              }}
            >
              {loading
                ? "..."
                : userData.exp}
            </h2>
          </div>
        </div>

        {/* DAYS */}

        <div className="grid grid-cols-7 gap-2 sm:gap-3 mt-8">
          {[1, 2, 3, 4, 5, 6, 7].map(
            (day) => {
              const active =
                day <= currentDay;

              return (
                <div
                  key={day}
                  className="rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center"
                  style={{
                    background:
                      active
                        ? "#FF6B00"
                        : "rgba(0,0,0,0.02)",

                    border:
                      active
                        ? "1px solid rgba(255,107,0,0.15)"
                        : "1px solid rgba(0,0,0,0.05)",
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
                    <FaCheck
                      className="mt-2 text-xs"
                      style={{
                        color:
                          "#ffffff",
                      }}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* CLAIM */}

        <div className="mt-7">
          <div
            className="rounded-3xl p-5"
            style={{
              background:
                "rgba(255,107,0,0.06)",

              border:
                "1px solid rgba(255,107,0,0.08)",
            }}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p
                  className="text-xs uppercase font-bold"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Reward Status
                </p>

                <h3
                  className="text-2xl font-black mt-2"
                  style={{
                    color: "#030712",
                  }}
                >
                  {locked
                    ? "Locked Until Midnight"
                    : completed
                    ? "Weekly EXP"
                    : "Daily Claim"}
                </h3>

                {locked && (
                  <p
                    className="text-sm mt-2 font-semibold"
                    style={{
                      color: "#FF6B00",
                    }}
                  >
                    Unlocks in{" "}
                    {timeLeft}
                  </p>
                )}
              </div>

              <button
                onClick={
                  claimReward
                }
                disabled={
                  claiming ||
                  locked
                }
                className="px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300"
                style={{
                  background:
                    locked
                      ? "#d1d5db"
                      : "#FF6B00",

                  color:
                    locked
                      ? "#6b7280"
                      : "#ffffff",

                  boxShadow:
                    locked
                      ? "none"
                      : "0 10px 20px rgba(255,107,0,0.18)",

                  opacity:
                    claiming
                      ? 0.7
                      : 1,

                  cursor:
                    locked
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {claiming ? (
                  "Claiming..."
                ) : locked ? (
                  <span className="flex items-center gap-2">
                    <FaLock />
                    Locked
                  </span>
                ) : completed ? (
                  "Claim EXP"
                ) : (
                  "Claim Reward"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewards_exp;