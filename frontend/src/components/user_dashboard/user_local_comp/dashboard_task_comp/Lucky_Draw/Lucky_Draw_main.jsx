import React from "react";

import Lucky_Draw_Hero from "./Lucky_Draw_Hero";

import Lucky_Draw_Active from "./Lucky_Draw_Active";

function Lucky_Draw_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-5
      "
    >
      <Lucky_Draw_Hero />

      <Lucky_Draw_Active />
    </div>
  );
}

export default Lucky_Draw_main;