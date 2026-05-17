import React from "react";

import PTC_hero from "../../components/CMS_Dashboard_comp/PTC_ADS_comp/PTC_hero";

import PTC_CreateAds from "../../components/CMS_Dashboard_comp/PTC_ADS_comp/PTC_CreateAds";

import PTC_HistoryTable from "../../components/CMS_Dashboard_comp/PTC_ADS_comp/PTC_HistoryTable";

function CMS_PTCAds() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-5
      "
    >
      {/* HERO */}

      <PTC_hero />

      {/* CREATE PTC ADS */}

      <PTC_CreateAds />

      {/* PTC HISTORY TABLE */}

      <PTC_HistoryTable />
    </div>
  );
}

export default CMS_PTCAds;