import React from "react";

import Short_link_Header from "./Shortlink_Header";

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
    </div>
  );
}

export default Shortlinks_main;