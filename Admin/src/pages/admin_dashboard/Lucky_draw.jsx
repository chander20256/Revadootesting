import React, {
  useEffect,
  useState,
} from "react";

import Lucky_Draw_Header from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Header";

import Lucky_Draw_Stats from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Stats";

import Lucky_Draw_Details from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_Details";

import Lucky_Draw_History from "../../components/admin_Dashboard_comp/Lucky_Draw_comp/Lucky_Draw_History";

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

  const [historyData, setHistoryData] =
    useState([]);

  /* -----------------------------
     FETCH DATA
  ----------------------------- */

  const fetchLuckyDrawData =
    async () => {
      try {
        setLoading(true);

        // STATS API

        const statsRes =
          await fetch(
            "http://localhost:5000/api/lucky-draw/stats"
          );

        const stats =
          await statsRes.json();

        // ACTIVE DRAW API

        const drawRes =
          await fetch(
            "http://localhost:5000/api/lucky-draw/current"
          );

        const draw =
          await drawRes.json();

        // HISTORY API

        const historyRes =
          await fetch(
            "http://localhost:5000/api/lucky-draw/history"
          );

        const history =
          await historyRes.json();

        // SET DATA

        setStatsData(
          stats
        );

        setDrawData(
          draw
        );

        setHistoryData(
          history
        );
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
     LOAD
  ----------------------------- */

  useEffect(() => {
    fetchLuckyDrawData();
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
          fetchLuckyDrawData
        }
        loading={
          loading
        }
      />

      {/* STATS */}

      <Lucky_Draw_Stats
        statsData={
          statsData
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

      {/* HISTORY */}

      <Lucky_Draw_History
        historyData={
          historyData
        }
        loading={
          loading
        }
      />
    </div>
  );
}

export default Lucky_draw;