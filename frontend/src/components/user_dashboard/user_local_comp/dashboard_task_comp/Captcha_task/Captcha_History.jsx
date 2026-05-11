import React, {
  useState,
} from "react";

import {
  FaCoins,
  FaClock,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Captcha_History({
  history = [],
}) {

  /* -----------------------------
     PAGINATION
  ----------------------------- */

  const itemsPerPage = 10;

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const totalPages =
    Math.ceil(
      history.length /
      itemsPerPage
    );

  const startIndex =
    (currentPage - 1)
    * itemsPerPage;

  const currentHistory =
    history.slice(
      startIndex,
      startIndex +
      itemsPerPage
    );

  /* -----------------------------
     FORMAT DATE
  ----------------------------- */

  const formatTimeAgo =
    (date) => {

      const now =
        new Date();

      const created =
        new Date(date);

      const seconds =
        Math.floor(
          (now - created) /
          1000
        );

      const minutes =
        Math.floor(
          seconds / 60
        );

      const hours =
        Math.floor(
          minutes / 60
        );

      const days =
        Math.floor(
          hours / 24
        );

      if (seconds < 60)
        return `${seconds}s ago`;

      if (minutes < 60)
        return `${minutes}m ago`;

      if (hours < 24)
        return `${hours}h ago`;

      return `${days}d ago`;
    };

  return (
    <section
      className="
        mt-4
        rounded-[20px]
        sm:rounded-[24px]
        overflow-hidden
      "
      style={{
        background:
          "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",

        boxShadow:
          "0 10px 35px rgba(0,0,0,0.04)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          px-3
          sm:px-6
          py-3
          sm:py-4
          border-b
        "
        style={{
          borderColor:
            "rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <h2
            className="
              text-sm
              sm:text-lg
              font-black
            "
            style={{
              color:
                "#030712",
            }}
          >
            Reward History
          </h2>

          <p
            className="
              text-[10px]
              sm:text-sm
              mt-1
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Latest captcha rewards
          </p>
        </div>

        <div
          className="
            px-2
            sm:px-3
            py-2
            rounded-xl
            text-[10px]
            sm:text-xs
            font-bold
          "
          style={{
            background:
              "rgba(255,107,0,0.08)",

            color:
              "#FF6B00",
          }}
        >
          {history.length} Claims
        </div>
      </div>

      {/* EMPTY */}

      {history.length === 0 ? (
        <div
          className="
            py-10
            sm:py-16
            px-4
            text-center
          "
        >
          <div
            className="
              w-14
              h-14
              sm:w-16
              sm:h-16
              rounded-2xl
              flex
              items-center
              justify-center
              mx-auto
              text-lg
              sm:text-xl
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

          <h3
            className="
              mt-4
              text-base
              sm:text-lg
              font-black
            "
            style={{
              color:
                "#030712",
            }}
          >
            No Rewards Yet
          </h3>

          <p
            className="
              mt-2
              text-xs
              sm:text-sm
            "
            style={{
              color:
                "#6b7280",
            }}
          >
            Start solving captcha
            to earn rewards.
          </p>
        </div>
      ) : (
        <>
          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background:
                      "rgba(255,107,0,0.03)",
                  }}
                >
                  <th
                    className="
                      text-left
                      px-3
                      sm:px-6
                      py-3
                      text-[10px]
                      sm:text-xs
                      font-bold
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    Reward
                  </th>

                  <th
                    className="
                      text-left
                      px-3
                      sm:px-6
                      py-3
                      text-[10px]
                      sm:text-xs
                      font-bold
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    Status
                  </th>

                  <th
                    className="
                      text-left
                      px-3
                      sm:px-6
                      py-3
                      text-[10px]
                      sm:text-xs
                      font-bold
                    "
                    style={{
                      color:
                        "#6b7280",
                    }}
                  >
                    Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentHistory.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        item._id ||
                        index
                      }
                      style={{
                        borderTop:
                          "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* REWARD */}

                      <td
                        className="
                          px-3
                          sm:px-6
                          py-3
                          sm:py-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            sm:gap-3
                          "
                        >
                          <div
                            className="
                              w-8
                              h-8
                              sm:w-10
                              sm:h-10
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              text-xs
                              sm:text-sm
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
                                text-xs
                                sm:text-base
                                font-black
                              "
                              style={{
                                color:
                                  "#030712",
                              }}
                            >
                              +{item.reward}
                            </h3>

                            <p
                              className="
                                text-[9px]
                                sm:text-xs
                              "
                              style={{
                                color:
                                  "#6b7280",
                              }}
                            >
                              Creds
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* STATUS */}

                      <td
                        className="
                          px-3
                          sm:px-6
                          py-3
                          sm:py-4
                        "
                      >
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1
                            sm:gap-2
                            px-2
                            sm:px-3
                            py-1.5
                            sm:py-2
                            rounded-full
                            text-[9px]
                            sm:text-xs
                            font-bold
                          "
                          style={{
                            background:
                              "rgba(22,163,74,0.08)",

                            color:
                              "#16A34A",
                          }}
                        >
                          <FaCheckCircle />
                          {item.status}
                        </div>
                      </td>

                      {/* TIME */}

                      <td
                        className="
                          px-3
                          sm:px-6
                          py-3
                          sm:py-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1
                            sm:gap-2
                            text-[9px]
                            sm:text-sm
                          "
                          style={{
                            color:
                              "#6b7280",
                          }}
                        >
                          <FaClock />

                          {formatTimeAgo(
                            item.createdAt
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
                flex
                items-center
                justify-between
                px-3
                sm:px-6
                py-3
                sm:py-4
                border-t
              "
              style={{
                borderColor:
                  "rgba(0,0,0,0.06)",
              }}
            >
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
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  text-[10px]
                  sm:text-xs
                  font-bold
                  transition-all
                "
                style={{
                  background:
                    "rgba(255,107,0,0.08)",

                  color:
                    "#FF6B00",

                  opacity:
                    currentPage === 1
                      ? 0.5
                      : 1,
                }}
              >
                <FaChevronLeft />
                Prev
              </button>

              <div
                className="
                  text-[10px]
                  sm:text-xs
                  font-semibold
                "
                style={{
                  color:
                    "#6b7280",
                }}
              >
                Page {currentPage} of{" "}
                {totalPages}
              </div>

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
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  text-[10px]
                  sm:text-xs
                  font-bold
                  transition-all
                "
                style={{
                  background:
                    "rgba(255,107,0,0.08)",

                  color:
                    "#FF6B00",

                  opacity:
                    currentPage ===
                    totalPages
                      ? 0.5
                      : 1,
                }}
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
export default Captcha_History;