import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Swal from "sweetalert2";

function Lucky_Draw_History() {
  /* =============================
     STATE
  ============================= */

  const [loading, setLoading] =
    useState(true);

  const [history, setHistory] =
    useState([]);

  /* =============================
     API
  ============================= */

  const API =
    "https://revadoobackend.onrender.com/api/admin/lucky-draw";

  /* =============================
     FETCH HISTORY
  ============================= */

  const fetchHistory =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API}/history`,
            {
              withCredentials: true,
            }
          );

        setHistory(data || []);
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",

          title:
            "Failed To Load",

          text:
            error.response?.data
              ?.message ||
            "Unable to load lucky draw history",

          confirmButtonColor:
            "#f97316",
        });
      } finally {
        setLoading(false);
      }
    };

  /* =============================
     INITIAL LOAD
  ============================= */

  useEffect(() => {
    fetchHistory();
  }, []);

  /* =============================
     LOADING
  ============================= */

  if (loading) {
    return (
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          sm:rounded-[32px]
          p-8
          flex
          items-center
          justify-center
          min-h-[350px]
        "
      >
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-orange-200
              border-t-orange-500
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-sm font-bold text-gray-500">
            Loading History...
          </p>
        </div>
      </div>
    );
  }

  /* =============================
     EMPTY
  ============================= */

  if (history.length === 0) {
    return (
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          sm:rounded-[32px]
          p-8
          text-center
        "
      >
        <div className="text-6xl mb-5">
          🎁
        </div>

        <h2 className="text-2xl font-black text-black">
          No Lucky Draw
          History
        </h2>

        <p className="text-gray-500 mt-3">
          Completed lucky
          draw history will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-[28px]
        sm:rounded-[32px]
        p-4
        sm:p-6
        lg:p-8
        font-['DM_Sans',sans-serif]
      "
    >
      {/* TOP */}

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
          Lucky Draw History
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight">
          Participation
          History
        </h2>
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              {[
                "Reward",
                "Winners",
                "Tickets Sold",
                "Completed",
                "Status",
              ].map(
                (
                  item,
                  index
                ) => (
                  <th
                    key={index}
                    className="
                      text-left
                      text-xs
                      uppercase
                      tracking-widest
                      text-gray-400
                      font-black
                      px-4
                      pb-2
                    "
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {history.map(
              (
                item,
                index
              ) => (
                <tr
                  key={index}
                  className="
                    bg-gray-50
                  "
                >
                  {/* REWARD */}

                  <td className="px-4 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-3">
                      {item.rewardImage ? (
                        <img
                          src={
                            item.rewardImage
                          }
                          alt="reward"
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            object-cover
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                            text-xl
                          "
                        >
                          🎁
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-black text-black">
                          {
                            item.rewardTitle
                          }
                        </p>

                        <p className="text-xs text-gray-400 font-semibold mt-1">
                          ID: #
                          {
                            item._id?.slice(
                              -6
                            )
                          }
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* WINNERS */}

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-600">
                      {
                        item.totalWinners
                      }{" "}
                      Users
                    </p>
                  </td>

                  {/* SOLD */}

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-600">
                      {
                        item.ticketsSold
                      }{" "}
                      Tickets
                    </p>
                  </td>

                  {/* DATE */}

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-gray-600">
                      {new Date(
                        item.completedAt ||
                          item.updatedAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",

                          month:
                            "short",

                          year: "numeric",
                        }
                      )}
                    </p>
                  </td>

                  {/* STATUS */}

                  <td className="px-4 py-4 rounded-r-2xl">
                    <span
                      className="
                        inline-flex
                        items-center
                        justify-center
                        px-4
                        py-2
                        rounded-xl
                        text-xs
                        font-black
                        bg-green-50
                        text-green-600
                        border
                        border-green-100
                      "
                    >
                      Completed
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}

      <div className="lg:hidden space-y-4">
        {history.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="
                rounded-[24px]
                border
                border-gray-100
                bg-gray-50
                p-4
              "
            >
              {/* TOP */}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {item.rewardImage ? (
                    <img
                      src={
                        item.rewardImage
                      }
                      alt="reward"
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        text-2xl
                      "
                    >
                      🎁
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-black text-orange-500">
                      #
                      {item._id?.slice(
                        -6
                      )}
                    </p>

                    <h3 className="text-sm font-black text-black mt-2 leading-relaxed">
                      {
                        item.rewardTitle
                      }
                    </h3>
                  </div>
                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-3
                    py-1.5
                    rounded-xl
                    text-[11px]
                    font-black
                    shrink-0
                    bg-green-50
                    text-green-600
                    border
                    border-green-100
                  "
                >
                  Completed
                </span>
              </div>

              {/* INFO */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-4
                "
              >
                {/* WINNERS */}

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                  "
                >
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
                    Winners
                  </p>

                  <h4 className="text-xs font-black text-black">
                    {
                      item.totalWinners
                    }{" "}
                    Users
                  </h4>
                </div>

                {/* SOLD */}

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                  "
                >
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
                    Tickets
                  </p>

                  <h4 className="text-xs font-black text-black">
                    {
                      item.ticketsSold
                    }{" "}
                    Sold
                  </h4>
                </div>

                {/* DATE */}

                <div
                  className="
                    rounded-2xl
                    bg-white
                    border
                    border-gray-100
                    p-3
                    col-span-2
                  "
                >
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">
                    Completed Date
                  </p>

                  <h4 className="text-xs font-black text-black">
                    {new Date(
                      item.completedAt ||
                        item.updatedAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",

                        month:
                          "long",

                        year: "numeric",
                      }
                    )}
                  </h4>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Lucky_Draw_History;