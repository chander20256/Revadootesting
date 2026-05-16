import React from "react";

import Short_link_Header from "./Shortlink_Header";

import Shortlink_stats from "./Shortlink_stats";

import Shortlinks_grid from "./Shortlinks_grid";

function Shortlinks_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        flex
        flex-col
        gap-6
      "
    >
      <Short_link_Header />

      {/* STATS WRAPPER */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-[28px]
          p-3
          sm:p-4
        "
        style={{
          background: "#ffffff",
          border:
            "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.04)",
        }}
      >
        <Shortlink_stats />
      </div>

      {/* GRID WRAPPER */}

      <div
        className="
          w-full
          overflow-hidden
          rounded-[28px]
          p-3
          sm:p-4
        "
        style={{
          background: "#ffffff",
          border:
            "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.04)",
        }}
      >
        <Shortlinks_grid />
      </div>
    </div>
  );
}

export default Shortlinks_main;