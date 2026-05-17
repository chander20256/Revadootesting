import React from "react";

import PTC_header from "./PTC_header";

import PTC_stats from "./PTC_stats";

import PTC_grid from "./PTC_grid";

function PTC_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-5
      "
    >
      {/* HEADER */}

      <PTC_header />

      {/* STATS SECTION */}

      <div
        className="
          w-full
          rounded-[28px]
          p-4
          sm:p-5
          lg:p-6
        "
        style={{
          background:
            "#ffffff",

          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 8px 25px rgba(0,0,0,0.04)",
        }}
      >
        <PTC_stats />
      </div>

      {/* PTC GRID SECTION */}

      <div
        className="
          w-full
          rounded-[28px]
          p-4
          sm:p-5
          lg:p-6
        "
        style={{
          background:
            "#ffffff",

          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 8px 25px rgba(0,0,0,0.04)",
        }}
      >
        <PTC_grid />
      </div>
    </div>
  );
}

export default PTC_main;