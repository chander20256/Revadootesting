

import { Outlet } from "react-router-dom";
import { useState } from "react";

import DashboardHeader from "../components/user_dashboard/user_global_comp/DashboardHeader";

import DashboardSidebar from "../components/user_dashboard/user_global_comp/DashboardSidebar";

import DashboardFooter from "../components/user_dashboard/user_global_comp/DashbordFooter";

import ScrollToTop from "../components/globalcomp/ScrollToTop";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isCollapsed, setIsCollapsed] =
    useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <ScrollToTop />

      {/* HEADER */}

      <DashboardHeader
        onMenuToggle={() =>
          setSidebarOpen(
            (prev) => !prev
          )
        }
      />

      {/* BODY */}

      <div className="flex flex-1 pt-[65px]">
        {/* SIDEBAR */}

        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
          isCollapsed={isCollapsed}
          onToggleCollapse={() =>
            setIsCollapsed(
              (prev) => !prev
            )
          }
        />

        {/* MAIN CONTENT */}

        <main
          className="
            flex-1 
            min-w-0 
            bg-white

            p-1
            sm:p-2
            md:p-0
          "
        >
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}

      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;