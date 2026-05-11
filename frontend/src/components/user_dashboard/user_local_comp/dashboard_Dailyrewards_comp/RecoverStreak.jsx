import React, {
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import {
  FaFire,
  FaRedoAlt,
  FaCoins,
  FaPlayCircle,
} from "react-icons/fa";

const RecoverStreak = () => {
  const [data, setData] =
    useState({
      streak: 0,
      creds: 0,
      canRecover: false,
    });

  const [loading, setLoading] =
    useState(false);

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

          const result =
            await res.json();

          const user =
            result.user ||
            result.data;

          if (!user) return;

          /* -----------------------------
             CHECK MISSED DAY
          ----------------------------- */

          let canRecover =
            false;

          if (
            user.dailyClaimedAt
          ) {
            const lastClaim =
              new Date(
                user.dailyClaimedAt
              );

            const now =
              new Date();

            const diffDays =
              Math.floor(
                (now - lastClaim) /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            /* ONLY 1 MISSED DAY */

            if (diffDays === 2) {
              canRecover = true;
            }
          }

          setData({
            streak:
              user.streak || 0,

            creds:
              user.creds || 0,

            canRecover,
          });
        } catch (err) {
          console.error(err);
        }
      };

    fetchUser();
  }, []);

  /* -----------------------------
     RECOVER WITH CREDS
  ----------------------------- */

  const recoverWithCreds =
    async () => {
      try {
        if (data.creds < 100) {
          Swal.fire({
            icon: "error",

            title:
              "Not Enough Creds",

            text:
              "You need 100 creds to restore streak.",

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        const confirm =
          await Swal.fire({
            title:
              "Restore Streak?",

            text:
              "100 creds will be deducted.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor:
              "#FF6B00",

            cancelButtonColor:
              "#d1d5db",

            confirmButtonText:
              "Restore",
          });

        if (!confirm.isConfirmed)
          return;

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          "https://revadoobackend.onrender.com/api/progress/recover-streak",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              method: "creds",
            }),
          }
        );

        const result =
          await res.json();

        if (!res.ok) {
          Swal.fire({
            icon: "error",

            title:
              "Recovery Failed",

            text:
              result.message,

            confirmButtonColor:
              "#FF6B00",
          });

          return;
        }

        Swal.fire({
          icon: "success",

          title:
            "Streak Restored",

          text:
            "Your streak has been restored successfully.",

          confirmButtonColor:
            "#FF6B00",
        });

        setData((prev) => ({
          ...prev,

          streak:
            result.user.streak,

          creds:
            result.user.creds,

          canRecover: false,
        }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  /* -----------------------------
     WATCH ADS
  ----------------------------- */

  const recoverWithAds =
    async () => {
      Swal.fire({
        icon: "info",

        title:
          "Ad Recovery",

        html: `
          <div style="font-size:14px;">
            Watch 2 rewarded ads of 15 seconds each to restore your streak.
          </div>
        `,

        confirmButtonText:
          "Continue",

        confirmButtonColor:
          "#FF6B00",
      });

      /* 
         CONNECT YOUR AD NETWORK HERE
      */
    };

  /* -----------------------------
     EMPTY STATE
  ----------------------------- */

  if (!data.canRecover) {
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
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "rgba(255,107,0,0.08)",
              }}
            >
              <FaFire
                style={{
                  color:
                    "#FF6B00",

                  fontSize:
                    "22px",
                }}
              />
            </div>

            <div>
              <h2
                className="text-2xl font-black"
                style={{
                  color:
                    "#030712",
                }}
              >
                Streak Protection
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Your streak is safe
                right now.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <FaRedoAlt
                style={{
                  color: "#FF6B00",
                }}
              />

              <span
                className="text-xs font-bold uppercase"
                style={{
                  color: "#FF6B00",
                }}
              >
                Streak Recovery
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black mt-5"
              style={{
                color: "#030712",
              }}
            >
              Recover Your
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                Lost Streak
              </span>
            </h2>

            <p
              className="mt-4 text-sm sm:text-base leading-relaxed max-w-2xl"
              style={{
                color: "#6b7280",
              }}
            >
              You missed one day.
              Restore your streak
              before it disappears.
            </p>
          </div>

          {/* STREAK */}

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
              Last Streak
            </p>

            <h2
              className="text-4xl font-black mt-3 flex items-center gap-2"
              style={{
                color: "#FF6B00",
              }}
            >
              <FaFire />
              {data.streak}
            </h2>
          </div>
        </div>

        {/* OPTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* ADS */}

          <div
            className="rounded-3xl p-5"
            style={{
              background:
                "rgba(0,0,0,0.02)",

              border:
                "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs uppercase font-bold"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Watch Ads
                </p>

                <h3
                  className="text-2xl font-black mt-2"
                  style={{
                    color: "#030712",
                  }}
                >
                  2 Reward Ads
                </h3>

                <p
                  className="text-sm mt-2"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  15 seconds each
                </p>
              </div>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "rgba(255,107,0,0.08)",
                }}
              >
                <FaPlayCircle
                  style={{
                    color:
                      "#FF6B00",
                  }}
                />
              </div>
            </div>

            <button
              onClick={
                recoverWithAds
              }
              className="w-full mt-5 py-3 rounded-2xl font-bold"
              style={{
                background:
                  "#FF6B00",

                color: "#ffffff",
              }}
            >
              Watch Ads
            </button>
          </div>

          {/* CREDS */}

          <div
            className="rounded-3xl p-5"
            style={{
              background:
                "rgba(255,107,0,0.06)",

              border:
                "1px solid rgba(255,107,0,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs uppercase font-bold"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Instant Restore
                </p>

                <h3
                  className="text-2xl font-black mt-2"
                  style={{
                    color: "#030712",
                  }}
                >
                  100 Creds
                </h3>

                <p
                  className="text-sm mt-2"
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Instant recovery
                </p>
              </div>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "rgba(255,107,0,0.08)",
                }}
              >
                <FaCoins
                  style={{
                    color:
                      "#FF6B00",
                  }}
                />
              </div>
            </div>

            <button
              onClick={
                recoverWithCreds
              }
              disabled={loading}
              className="w-full mt-5 py-3 rounded-2xl font-bold"
              style={{
                background:
                  "#FF6B00",

                color: "#ffffff",

                opacity:
                  loading
                    ? 0.7
                    : 1,
              }}
            >
              {loading
                ? "Recovering..."
                : "Restore Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverStreak;