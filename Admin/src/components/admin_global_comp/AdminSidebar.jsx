import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaUsers,
  FaCode,
  FaBullhorn,
} from "react-icons/fa";

const AdminSidebar = ({
  isOpen,
  closeSidebar,
}) => {
  const [activePanel, setActivePanel] =
    useState("admin");

  const navClass = ({
    isActive,
  }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${isActive
      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
      : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  const content = (
    <div className="flex h-full flex-col bg-zinc-950 text-white">
      {/* HEADER */}

      <div className="border-b border-white/10 px-5 py-6">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
          Revadoo
        </div>

        <div className="mt-2 text-xl font-semibold">
          Dashboard Console
        </div>

        <div className="mt-1 text-sm text-white/45">
          Admin access only
        </div>
      </div>

      {/* TOGGLE */}

      <div className="px-4 pt-4">
        <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10">
          {/* ADMIN */}

          <button
            onClick={() =>
              setActivePanel("admin")
            }
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all duration-300 ${activePanel === "admin"
                ? "bg-orange-500 text-white"
                : "text-white/60 hover:text-white"
              }`}
          >
            Admin
          </button>

          {/* CMS */}

          <button
            onClick={() =>
              setActivePanel("cms")
            }
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all duration-300 ${activePanel === "cms"
                ? "bg-orange-500 text-white"
                : "text-white/60 hover:text-white"
              }`}
          >
            CMS
          </button>
        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto p-4">
        {/* ADMIN CONSOLE */}

        {activePanel === "admin" && (
          <div className="space-y-2">
            <div className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
              Admin Console
            </div>

            {/* USERS */}

            <NavLink
              to="/admin/users"
              onClick={closeSidebar}
              className={navClass}
            >
              <FaUsers size={15} />
              Users
            </NavLink>

            {/* CREDS CODES */}

            <NavLink
              to="/admin/credscodes"
              onClick={closeSidebar}
              className={navClass}
            >
              <FaCode size={15} />
              Creds Codes
            </NavLink>
          </div>
        )}

        {/* CMS CONSOLE */}


        {activePanel === "cms" && (
          <div className="space-y-2">
            <div className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
              CMS Console
            </div>

            {/* ADS MANAGER */}

            <NavLink
              to="/admin/ads"
              onClick={closeSidebar}
              className={navClass}
            >
              <FaBullhorn size={15} />
              Ads Manager
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* DESKTOP */}

      <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 lg:block">
        {content}
      </aside>

      {/* MOBILE */}

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
            onClick={closeSidebar}
          />

          <aside className="fixed left-0 top-0 z-[70] h-full w-[280px] max-w-[86vw] shadow-2xl lg:hidden">
            {content}
          </aside>
        </>
      )}
    </>
  );
};

export default AdminSidebar;