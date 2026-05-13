import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Swal from "sweetalert2";

function Lucky_Draw_Past() {
  /* =============================
     STATE
  ============================= */

  const [loading, setLoading] =
    useState(true);

  const [pastDraws, setPastDraws] =
    useState([]);

  /* =============================
     API
  ============================= */

  const API =
    "https://revadoobackend.onrender.com/api/admin/lucky-draw";

  /* =============================
     FETCH PAST DRAWS
  ============================= */

  const fetchPastDraws =
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

        /* ONLY LATEST 4 */

        const latestFour =
          (data || []).slice(
            0,
            4
          );

        setPastDraws(
          latestFour
        );
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
    fetchPastDraws();
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
          min-h-[500px]
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
            Loading Past
            Draws...
          </p>
        </div>
      </div>
    );
  }

  /* =============================
     EMPTY
  ============================= */

  if (
    pastDraws.length === 0
  ) {
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
          No Past Draws
        </h2>

        <p className="text-gray-500 mt-3">
          Completed lucky
          draws will appear
          here.
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
        h-full
      "
    >
      {/* TOP */}

      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
          Past Lucky Draws
        </p>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-tight">
          Previous Events
        </h2>
      </div>

      {/* LIST */}

      <div className="space-y-3 sm:space-y-4">
        {pastDraws.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="
                rounded-[22px]
                sm:rounded-[28px]
                border
                border-gray-100
                bg-gray-50
                p-4
                sm:p-5
                transition-all
                duration-200
                hover:border-orange-200
              "
            >
              {/* TOP */}

              <div className="flex items-start gap-3 sm:gap-4">
                {/* IMAGE */}

                {item.rewardImage ? (
                  <img
                    src={
                      item.rewardImage
                    }
                    alt="reward"
                    className="
                      w-12
                      h-12
                      sm:w-16
                      sm:h-16
                      rounded-2xl
                      object-cover
                      shrink-0
                    "
                  />
                ) : (
                  <div
                    className="
                      w-12
                      h-12
                      sm:w-16
                      sm:h-16
                      rounded-2xl
                      bg-white
                      border
                      border-gray-100
                      flex
                      items-center
                      justify-center
                      text-2xl
                      sm:text-3xl
                      shrink-0
                    "
                  >
                    🎁
                  </div>
                )}

                {/* CONTENT */}

                <div className="min-w-0">
                  <h3
                    className="
                      text-base
                      sm:text-lg
                      lg:text-xl
                      font-black
                      text-black
                      leading-tight
                    "
                  >
                    {
                      item.rewardTitle
                    }
                  </h3>

                  <p className="text-xs sm:text-sm text-orange-500 font-bold mt-2">
                    Completed
                  </p>
                </div>
              </div>

              {/* STATS */}

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
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Winners
                  </p>

                  <h4 className="text-xs sm:text-sm font-black text-black">
                    {
                      item.totalWinners
                    }{" "}
                    Winner
                    {item.totalWinners >
                    1
                      ? "s"
                      : ""}
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
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                    Date
                  </p>

                  <h4 className="text-xs sm:text-sm font-black text-black">
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
                  </h4>
                </div>

                {/* SOLD */}

                <div
                  className="
                    col-span-2
                    rounded-2xl
                    bg-orange-50
                    border
                    border-orange-100
                    p-3
                    sm:p-4
                  "
                >
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-orange-400 mb-1">
                    Tickets Sold
                  </p>

                  <h4 className="text-sm sm:text-base font-black text-orange-500">
                    {
                      item.ticketsSold
                    }{" "}
                    Tickets
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

export default Lucky_Draw_Past;