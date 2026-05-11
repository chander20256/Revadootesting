import React from "react";

import InstantHero from "../../components/user_dashboard/user_local_comp/dashboard_Dailyrewards_comp/DailyRewards_Hero";
import Instantexp from "../../components/user_dashboard/user_local_comp/dashboard_Dailyrewards_comp/DailyRewards_exp";
import InstantStreak from "../../components/user_dashboard/user_local_comp/dashboard_Dailyrewards_comp/DailyRewards_Streak";
import RecoverStreak from "../../components/user_dashboard/user_local_comp/dashboard_Dailyrewards_comp/RecoverStreak";


function DashboardDailyRewards() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 space-y-6">
      {/* Hero */}

      <InstantHero />

      {/* Daily Rewards */}

      <Instantexp />

      {/* Recover Lost Streak */}

      <RecoverStreak />

      {/* Streak Progress */}

      <InstantStreak />
    </div>
  );
}

export default DashboardDailyRewards;