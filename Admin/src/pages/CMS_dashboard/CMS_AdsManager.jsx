import React from "react";

import Ads_Manager_Hero from "../../components/CMS_Dashboard_comp/Ads_Manager_comp/Ads_Manager_Hero";

import Ads_Manager_Table from "../../components/CMS_Dashboard_comp/Ads_Manager_comp/Ads_Manager_Table";

import Ads_Create_Form from "../../components/CMS_Dashboard_comp/Ads_Manager_comp/Ads_Create_Form";

function CMS_AdsManager() {
  return (
    <div className="min-h-screen bg-white p-4">
      {/* HERO */}

      <Ads_Manager_Hero />

      {/* CREATE FORM */}

      <div className="mt-4">
        <Ads_Create_Form />
      </div>

      {/* TABLE */}

      <div className="mt-4">
        <Ads_Manager_Table />
      </div>
    </div>
  );
}

export default CMS_AdsManager;