import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCheckCircle,
  FaGift,
  FaCoins,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const API_BASE_URL =
  "https://revadoobackend.onrender.com/api/admin";

function Creds_history() {
  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* -----------------------------
     PAGINATION
  ----------------------------- */

  const ITEMS_PER_PAGE = 5;

  const totalPages =
    Math.ceil(
      history.length /
        ITEMS_PER_PAGE
    );

  const paginatedHistory =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      const end =
        start +
        ITEMS_PER_PAGE;

      return history.slice(
        start,
        end
      );
    }, [history, currentPage]);

  /* -----------------------------
     FETCH HISTORY
  ----------------------------- */

  useEffect(() => {
    const fetchHistory =
      async () => {
        try {
          const userId =
            localStorage.getItem(
              "userId"
            );

          if (!userId) {
            setLoading(false);

            return;
          }

          const response =
            await fetch(
              `${API_BASE_URL}/creds/history/${userId}`
            );

          const data =
            await response.json();

          if (data.success) {
            setHistory(
              data.data
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchHistory();
  }, []);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-5
        sm:p-7
        lg:p-8
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
      {/* GLOW */}

    

      <div className="relative z-10">
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >
          <div>
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-black
              "
              style={{
                color: "#030712",
              }}
            >
              Claim
              <span
                style={{
                  color: "#FF6B00",
                }}
              >
                {" "}
                History
              </span>
            </h2>

            <p
              className="
                mt-2
                text-sm
                sm:text-base
              "
              style={{
                color: "#6b7280",
              }}
            >
              Your recently claimed
              reward codes and bonuses.
            </p>
          </div>

          {/* STATS */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-3
              rounded-2xl
            "
            style={{
              background:
                "rgba(255,107,0,0.06)",

              border:
                "1px solid rgba(255,107,0,0.10)",
            }}
          >
            <FaGift color="#FF6B00" />

            <span
              className="
                text-sm
                font-bold
              "
              style={{
                color: "#FF6B00",
              }}
            >
              {history.length} Claims
            </span>
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div
            className="
              mt-8
              text-center
              text-sm
            "
            style={{
              color: "#6b7280",
            }}
          >
            Loading history...
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          history.length ===
            0 && (
            <div
              className="
                mt-8
                text-center
                text-sm
              "
              style={{
                color:
                  "#6b7280",
              }}
            >
              No claim history found.
            </div>
          )}

        {/* HISTORY LIST */}

        <div className="mt-7 space-y-4">
          {paginatedHistory.map(
            (item, index) => (
              <div
                key={index}
                className="
                  rounded-3xl
                  p-4
                  sm:p-5
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-4
                "
                style={{
                  background:
                    "rgba(255,107,0,0.03)",

                  border:
                    "1px solid rgba(255,107,0,0.08)",
                }}
              >
                {/* LEFT */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-xl
                    "
                    style={{
                      background:
                        "rgba(255,107,0,0.08)",

                      color:
                        "#FF6B00",
                    }}
                  >
                    <FaCoins />
                  </div>

                  <div>
                    <h3
                      className="
                        text-lg
                        font-black
                      "
                      style={{
                        color:
                          "#111827",
                      }}
                    >
                      {item.reward}{" "}
                      Creds
                    </h3>

                    <p
                      className="
                        text-sm
                        mt-1
                      "
                      style={{
                        color:
                          "#6b7280",
                      }}
                    >
                      Code:{" "}
                      <span
                        style={{
                          color:
                            "#FF6B00",

                          fontWeight:
                            "700",
                        }}
                      >
                        {item.code}
                      </span>
                    </p>
                  </div>
                </div>

                {/* RIGHT */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  {/* STATUS */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-2xl
                    "
                    style={{
                      background:
                        "rgba(34,197,94,0.10)",

                      color:
                        "#22c55e",
                    }}
                  >
                    <FaCheckCircle />

                    <span
                      className="
                        text-sm
                        font-semibold
                      "
                    >
                      Claimed
                    </span>
                  </div>

                  {/* TIME */}

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-2xl
                    "
                    style={{
                      background:
                        "rgba(0,0,0,0.04)",

                      color:
                        "#6b7280",
                    }}
                  >
                    <FaClock />

                    <span
                      className="
                        text-sm
                        font-medium
                      "
                    >
                      {new Date(
                        item.claimedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* PAGINATION */}

       {/* PAGINATION */}

{!loading &&
  totalPages > 1 && (
    <div
      className="
        mt-8
        flex
        items-center
        justify-center
        gap-2
        sm:gap-3
        flex-nowrap
        overflow-x-auto
        pb-1
      "
    >
      {/* PREV */}

      <button
        onClick={() =>
          setCurrentPage(
            (prev) =>
              Math.max(
                prev - 1,
                1
              )
          )
        }
        disabled={
          currentPage === 1
        }
        className="
          min-w-[110px]
          sm:min-w-[44px]
          h-11
          px-4
          sm:px-0
          rounded-2xl
          flex
          items-center
          justify-center
          transition-all
          text-sm
          font-semibold
          shrink-0
        "
        style={{
          background:
            currentPage === 1
              ? "rgba(0,0,0,0.05)"
              : "rgba(255,107,0,0.08)",

          color:
            currentPage === 1
              ? "#9ca3af"
              : "#FF6B00",
        }}
      >
        <div className="flex items-center gap-2">
          <FaChevronLeft />

          <span>
            Previous
          </span>
        </div>
      </button>

      {/* PAGE INFO */}

      <div
        className="
          px-4
          sm:px-5
          h-11
          rounded-2xl
          text-sm
          font-bold
          flex
          items-center
          justify-center
          text-center
          whitespace-nowrap
          shrink-0
        "
        style={{
          background:
            "rgba(255,107,0,0.08)",

          color:
            "#FF6B00",
        }}
      >
        Page {currentPage} of{" "}
        {totalPages}
      </div>

      {/* NEXT */}

      <button
        onClick={() =>
          setCurrentPage(
            (prev) =>
              Math.min(
                prev + 1,
                totalPages
              )
          )
        }
        disabled={
          currentPage ===
          totalPages
        }
        className="
          min-w-[90px]
          sm:min-w-[44px]
          h-11
          px-4
          sm:px-0
          rounded-2xl
          flex
          items-center
          justify-center
          transition-all
          text-sm
          font-semibold
          shrink-0
        "
        style={{
          background:
            currentPage ===
            totalPages
              ? "rgba(0,0,0,0.05)"
              : "rgba(255,107,0,0.08)",

          color:
            currentPage ===
            totalPages
              ? "#9ca3af"
              : "#FF6B00",
        }}
      >
        <div className="flex items-center gap-2">
          <span>
            Next
          </span>

          <FaChevronRight />
        </div>
      </button>
    </div>
  )}
      </div>
    </div>
  );
}

export default Creds_history;