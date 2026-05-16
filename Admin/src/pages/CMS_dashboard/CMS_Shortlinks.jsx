import React from "react";

import Shortlink_hero from "../../components/CMS_Dashboard_comp/Shortlinks_comp/Shortlink_hero";

import Shortlink_generate from "../../components/CMS_Dashboard_comp/Shortlinks_comp/Shortlink_generate";

function CMS_Shortlinks() {
  return (
    <div
      className="
        w-full
        min-h-screen
        p-4
        sm:p-6
        flex
        flex-col
        gap-6
      "
    >
      <Shortlink_hero />

      <Shortlink_generate />
    </div>
  );
}

export default CMS_Shortlinks;