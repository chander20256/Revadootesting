import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Swal from "sweetalert2";

function PTC_HistoryTable() {
  const [ads, setAds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================================
     FETCH ADS
  ========================================= */

  const fetchAds =
    async () => {
      try {
        const response =
          await axios.get(
            "https://revadoobackend.onrender.com/api/admin/ptc-ads/all"
          );

        if (
          response.data.success
        ) {
          setAds(
            response.data
              .data || []
          );
        }
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================================
     DELETE AD
  ========================================= */

  const handleDelete =
    async (id) => {
      const result =
        await Swal.fire({
          title:
            "Delete PTC Ad?",

          text: "This action cannot be undone.",

          icon: "warning",

          showCancelButton:
            true,

          confirmButtonColor:
            "#ef4444",

          cancelButtonColor:
            "#9ca3af",

          confirmButtonText:
            "Delete",
        });

      if (
        !result.isConfirmed
      ) {
        return;
      }

      try {
        const response =
          await axios.delete(
            `https://revadoobackend.onrender.com/api/admin/ptc-ads/delete/${id}`
          );

        if (
          response.data.success
        ) {
          setAds((prev) =>
            prev.filter(
              (ad) =>
                ad._id !== id
            )
          );

          Swal.fire({
            icon:
              "success",

            title:
              "Deleted",

            text: "PTC Ad removed successfully.",

            confirmButtonColor:
              "#FF6B00",
          });
        }
      } catch (error) {
        console.error(
          "DELETE ERROR:",
          error
        );

        Swal.fire({
          icon:
            "error",

          title:
            "Delete Failed",

          text:
            "Unable to delete ad.",

          confirmButtonColor:
            "#FF6B00",
        });
      }
    };

  /* =========================================
     LOAD DATA
  ========================================= */

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <section
      className="
        w-full
        rounded-[24px]
        p-4
        sm:p-6
        overflow-hidden
      "
      style={{
        background:
          "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}

      <div className="mb-5">
        <h2
          className="
            text-xl
            sm:text-2xl
            font-black
          "
          style={{
            color:
              "#030712",
          }}
        >
          PTC Ads History
        </h2>

        <p
          className="
            mt-2
            text-xs
            sm:text-sm
            leading-relaxed
          "
          style={{
            color:
              "#6b7280",
          }}
        >
          Manage active daily
          reward campaigns.
        </p>
      </div>

      {/* LOADING */}

      {loading ? (
        <div
          className="
            py-20
            text-center
            text-sm
            font-semibold
          "
          style={{
            color:
              "#6b7280",
          }}
        >
          Loading PTC Ads...
        </div>
      ) : ads.length === 0 ? (
        /* EMPTY */

        <div
          className="
            py-20
            text-center
          "
        >
          <h3
            className="
              text-lg
              font-bold
            "
            style={{
              color:
                "#111827",
            }}
          >
            No PTC Ads Found
          </h3>

          <p
            className="
              mt-2
              text-sm
            "
            style={{
              color:
                "#9ca3af",
            }}
          >
            Create your first PTC
            campaign above.
          </p>
        </div>
      ) : (
        /* TABLE */

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            {/* HEAD */}

            <thead>
              <tr
                style={{
                  borderBottom:
                    "1px solid rgba(0,0,0,0.06)",
                }}
              >
                {[
                  "Title",

                  "Reward",

                  "Timer",

                  "Status",

                  "Action",
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <th
                      key={index}
                      className="
                        text-left
                        py-4
                        px-3
                        text-xs
                        font-black
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color:
                          "#6b7280",
                      }}
                    >
                      {item}
                    </th>
                  )
                )}
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {ads.map(
                (
                  ad,
                  index
                ) => (
                  <tr
                    key={
                      ad._id ||
                      index
                    }
                    style={{
                      borderBottom:
                        "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* TITLE */}

                    <td className="py-4 px-3">
                      <div>
                        <h3
                          className="
                            text-sm
                            font-bold
                          "
                          style={{
                            color:
                              "#111827",
                          }}
                        >
                          {ad.title}
                        </h3>

                        <p
                          className="
                            text-xs
                            mt-1
                          "
                          style={{
                            color:
                              "#9ca3af",
                          }}
                        >
                          Daily Reward Campaign
                        </p>
                      </div>
                    </td>

                    {/* REWARD */}

                    <td className="py-4 px-3">
                      <span
                        className="
                          text-sm
                          font-bold
                        "
                        style={{
                          color:
                            "#FF6B00",
                        }}
                      >
                        {ad.reward} Creds
                      </span>
                    </td>

                    {/* TIMER */}

                    <td className="py-4 px-3">
                      <span
                        className="
                          text-sm
                          font-semibold
                        "
                        style={{
                          color:
                            "#374151",
                        }}
                      >
                        {ad.timer}s
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="py-4 px-3">
                      <div
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-bold
                        "
                        style={{
                          background:
                            ad.status ===
                            "active"
                              ? "rgba(34,197,94,0.10)"
                              : "rgba(239,68,68,0.10)",

                          color:
                            ad.status ===
                            "active"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {ad.status}
                      </div>
                    </td>

                    {/* DELETE */}

                    <td className="py-4 px-3">
                      <button
                        onClick={() =>
                          handleDelete(
                            ad._id
                          )
                        }
                        className="
                          h-10
                          px-4
                          rounded-xl
                          text-xs
                          font-bold
                          transition-all
                          duration-300
                        "
                        style={{
                          background:
                            "rgba(239,68,68,0.10)",

                          color:
                            "#dc2626",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PTC_HistoryTable;