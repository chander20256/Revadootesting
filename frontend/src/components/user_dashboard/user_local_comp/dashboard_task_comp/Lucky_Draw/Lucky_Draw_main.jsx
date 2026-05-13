import React from "react";

import Lucky_Draw_Hero from "./Lucky_Draw_Hero";

import Lucky_Draw_Active from "./Lucky_Draw_Active";

import Lucky_Draw_Past from "./Lucky_Draw_Past";

import Lucky_Draw_History from "./Lucky_Draw_History";

function Lucky_Draw_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-5
      "
    >
      {/* HERO */}

      <Lucky_Draw_Hero />

      {/* MAIN SECTION */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-10
          gap-5
          items-start
        "
      >
        {/* LEFT SIDE - 70% */}

        <div
          className="
            w-full
            xl:col-span-7
            space-y-5
          "
        >
          {/* ACTIVE */}

          <Lucky_Draw_Active />

          {/* HISTORY */}

          <Lucky_Draw_History />
        </div>

        {/* RIGHT SIDEBAR - 30% */}

        <div
          className="
            w-full
            xl:col-span-3
          "
        >
          <Lucky_Draw_Past />
        </div>
      </div>
    </div>
  );
}

export default Lucky_Draw_main;