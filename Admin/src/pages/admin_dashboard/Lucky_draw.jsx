import React, {
  useEffect,
  useState,
} from "react";

import Lucky_Draw_Header from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Header";

import Lucky_Draw_Stats from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Stats";

import Lucky_Draw_Details from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Details";

function Lucky_draw() {
  /* -----------------------------
     STATES
  ----------------------------- */

  const [loading, setLoading] =
    useState(false);

  const [statsData, setStatsData] =
    useState(null);

  const [drawData, setDrawData] =
    useState(null);

  /* -----------------------------
     API URL
  ----------------------------- */

  const API_URL =
    "https://revadoobackend.onrender.com/api/admin";

  /* -----------------------------
     FETCH STATS
  ----------------------------- */

  const fetchStats =
    async () => {
      try {
        const response =
          await fetch(
            `${API_URL}/lucky-draw/stats`
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          setStatsData(
            data
          );
        }
      } catch (error) {
        console.log(
          "Stats Error:",
          error
        );
      }
    };

  /* -----------------------------
     FETCH CURRENT DRAW
  ----------------------------- */

  const fetchCurrentDraw =
    async () => {
      try {
        const response =
          await fetch(
            `${API_URL}/lucky-draw/current`
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          setDrawData(
            data
          );
        }
      } catch (error) {
        console.log(
          "Current Draw Error:",
          error
        );
      }
    };

  /* -----------------------------
     REFRESH
  ----------------------------- */

  const refreshData =
    async () => {
      try {
        setLoading(
          true
        );

        await Promise.all([
          fetchStats(),
          fetchCurrentDraw(),
        ]);
      } catch (error) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  /* -----------------------------
     INITIAL LOAD
  ----------------------------- */

  useEffect(() => {
    refreshData();

    /* TIMER AUTO REFRESH */

    const interval =
      setInterval(() => {
        fetchCurrentDraw();
      }, 1000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-5
        font-['DM_Sans',sans-serif]
      "
    >
      {/* HEADER */}

      <Lucky_Draw_Header
        onRefresh={
          refreshData
        }
        loading={
          loading
        }
      />

      {/* STATS */}

      <Lucky_Draw_Stats
        statsData={{
          ...statsData,

          timeLeft:
            drawData?.timer
              ? `${drawData.timer.days}D : ${drawData.timer.hours}H : ${drawData.timer.minutes}M`
              : "00D : 00H",
        }}
        drawData={
          drawData
        }
        loading={
          loading
        }
      />

      {/* DETAILS */}

      <Lucky_Draw_Details
        drawData={
          drawData
        }
        loading={
          loading
        }
      />
    </div>
  );
}

export default Lucky_draw;