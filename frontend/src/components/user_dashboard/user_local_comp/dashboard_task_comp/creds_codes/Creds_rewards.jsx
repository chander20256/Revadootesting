import React, {
  useEffect,
  useState,
} from "react";

import {
  FaGift,
  FaLock,
  FaTelegramPlane,
  FaCoins,
} from "react-icons/fa";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

function Creds_rewards() {
  const [rewards, setRewards] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* -----------------------------
     FETCH REWARDS
  ----------------------------- */

  const fetchRewards =
    async () => {
      try {
        const response =
          await fetch(
            `${API_BASE_URL}/creds`
          );

        const data =
          await response.json();

        if (data.success) {
          setRewards(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[24px]
        sm:rounded-[32px]
        p-3
        sm:p-5
      "
      style={{
        background: "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.05)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* TOP */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          mb-4
        "
      >
        {/* LEFT */}

        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              rounded-2xl
              mb-2
            "
            style={{
              background:
                "rgba(255,107,0,0.08)",

              border:
                "1px solid rgba(255,107,0,0.12)",
            }}
          >
            <FaTelegramPlane
              color="#FF6B00"
              size={11}
            />

            <span
              className="
                text-[10px]
                sm:text-[11px]
                font-bold
              "
              style={{
                color: "#FF6B00",
              }}
            >
              Telegram Exclusive Rewards
            </span>
          </div>

          <h2
            className="
              text-lg
              sm:text-2xl
              font-black
              leading-tight
            "
            style={{
              color: "#030712",
            }}
          >
            Join Telegram To
            Unlock Reward Codes
          </h2>

          <p
            className="
              mt-1
              text-[12px]
              sm:text-sm
              leading-6
              max-w-2xl
            "
            style={{
              color: "#6b7280",
            }}
          >
            Free creds and surprise
            bonus rewards daily.
          </p>
        </div>

        {/* SMALL STATS */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            px-3
            py-2.5
            w-fit
          "
          style={{
            background:
              "rgba(255,107,0,0.03)",

            border:
              "1px solid rgba(255,107,0,0.08)",
          }}
        >
          <div
            className="
              w-9
              h-9
              rounded-xl
              flex
              items-center
              justify-center
            "
            style={{
              background:
                "rgba(255,107,0,0.08)",

              color: "#FF6B00",
            }}
          >
            <FaCoins size={14} />
          </div>

          <div>
            <h3
              className="
                text-xs
                sm:text-sm
                font-black
              "
              style={{
                color: "#111827",
              }}
            >
              {rewards.length > 0
                ? `${rewards[0]?.reward} Creds`
                : "0 Creds"}
            </h3>

            <p
              className="
                text-[10px]
              "
              style={{
                color: "#6b7280",
              }}
            >
              Latest Reward
            </p>
          </div>
        </div>
      </div>

      {/* LOADING */}

      {loading ? (
        <div
          className="
            py-8
            text-center
            text-sm
            font-semibold
          "
          style={{
            color: "#6b7280",
          }}
        >
          Loading rewards...
        </div>
      ) : rewards.length === 0 ? (
        <div
          className="
            py-8
            text-center
          "
        >
          <h3
            className="
              text-base
              font-black
            "
            style={{
              color: "#111827",
            }}
          >
            No Active Rewards
          </h3>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color: "#6b7280",
            }}
          >
            New rewards will appear
            automatically.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-3
          "
        >
          {rewards
            .slice(0, 3)
            .map((item) => (
              <div
                key={item._id}
                className="
                  rounded-[20px]
                  p-3
                  sm:p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
                style={{
                  background:
                    "rgba(255,107,0,0.03)",

                  border:
                    "1px solid rgba(255,107,0,0.08)",
                }}
              >
                {/* TOP */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <div
                    className="
                      w-9
                      h-9
                      sm:w-11
                      sm:h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      background:
                        "rgba(255,107,0,0.08)",

                      color: "#FF6B00",
                    }}
                  >
                    <FaGift size={14} />
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      px-2.5
                      py-1
                      rounded-full
                    "
                    style={{
                      background:
                        "rgba(34,197,94,0.10)",

                      color: "#16A34A",
                    }}
                  >
                    {item.status ||
                      "ACTIVE"}
                  </span>
                </div>

                {/* REWARD */}

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    font-black
                    leading-none
                  "
                  style={{
                    color: "#FF6B00",
                  }}
                >
                  {item.reward}
                </h2>

                <p
                  className="
                    text-[11px]
                    sm:text-sm
                    mt-1
                  "
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Free Creds Reward
                </p>

                {/* CLAIMS */}

                <div
                  className="
                    mt-2
                    text-[11px]
                    font-semibold
                  "
                  style={{
                    color: "#6b7280",
                  }}
                >
                  {item.totalClaimed}
                  /
                  {item.maxClaims}
                  {" "}
                  Claimed
                </div>

                {/* HIDDEN CODE */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-xl
                    mt-3
                    p-2.5
                  "
                  style={{
                    background:
                      "#ffffff",

                    border:
                      "1px dashed rgba(255,107,0,0.15)",
                  }}
                >
                  {/* FAKE CODE */}

                  <div
                    className="
                      select-none
                      pointer-events-none
                      text-center
                      tracking-[3px]
                      text-[11px]
                      font-black
                    "
                    style={{
                      color: "#111827",
                      filter: "blur(5px)",
                    }}
                  >
                    •••• ••••
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1.5
                        rounded-full
                      "
                      style={{
                        background:
                          "rgba(255,255,255,0.96)",

                        border:
                          "1px solid rgba(255,107,0,0.12)",

                        backdropFilter:
                          "blur(8px)",
                      }}
                    >
                      <FaLock
                        size={10}
                        color="#FF6B00"
                      />

                      <span
                        className="
                          text-[10px]
                          font-bold
                        "
                        style={{
                          color: "#FF6B00",
                        }}
                      >
                        Telegram
                      </span>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}

                <a
                  href="https://t.me/revadoo_rewards"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    w-full
                    h-9
                    sm:h-11
                    rounded-xl
                    text-white
                    text-[11px]
                    sm:text-sm
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    mt-3
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)",

                    boxShadow:
                      "0 10px 25px rgba(255,107,0,0.18)",
                  }}
                >
                  <FaTelegramPlane />
                  Join Telegram
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Creds_rewards;