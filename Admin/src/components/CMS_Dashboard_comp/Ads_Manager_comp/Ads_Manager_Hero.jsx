import React from "react";

import { FaBullhorn } from "react-icons/fa";

function Ads_Manager_Hero() {
  return (
    <div className="mb-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4">
      <h1 className="flex items-center gap-2 text-lg font-bold text-zinc-900">
        <FaBullhorn className="text-orange-500" />
        Ads Manager
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        Manage all website ads, scripts, publisher IDs,
        iframe ads, HTML ads, and API-based ad systems
        from one centralized CMS dashboard.
      </p>
    </div>
  );
}

export default Ads_Manager_Hero;