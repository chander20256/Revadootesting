import React from "react";

import Creds_generate from "../../components/admin_Dashboard_comp/Creds_claim_comp/Creds_generate";

import Creds_table from "../../components/admin_Dashboard_comp/Creds_claim_comp/Creds_table";

function Creds_claim() {
  return (
    <div
      className="
        w-full
        space-y-6
      "
    >
      {/* GENERATE CODE */}

      <Creds_generate />

      {/* GENERATED CODES TABLE */}

      <Creds_table />
    </div>
  );
}

export default Creds_claim;