import React from "react";

import Instant_hero from "../../components/user_dashboard/user_local_comp/dashboard_Instanttask/Instant_hero";

import Instant_Task from "../../components/user_dashboard/user_local_comp/dashboard_Instanttask/Instant_Task";

function DashboardInstanttask() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 space-y-6">
      <Instant_hero />

      <Instant_Task />
    </div>
  );
}

export default DashboardInstanttask;