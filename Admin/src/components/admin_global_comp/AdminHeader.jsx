/* eslint-disable no-empty */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth";

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({
    username: "Admin",
    initial: "A",
    balance: 0,
    avatar: null,
  });

  useEffect(() => {
    if (!document.getElementById("dashboard-fonts")) {
      const link = document.createElement("link");
      link.id = "dashboard-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }

    const loadUser = () => {
      let initialUser = null;
      try {
        const stored = localStorage.getItem("user");
        if (stored) initialUser = JSON.parse(stored);
      } catch {}

      let avatar = null;
      try {
        avatar = localStorage.getItem("userAvatar") || null;
      } catch {}

      if (initialUser) {
        setUserData({
          username: initialUser.username || "Admin",
          initial: (initialUser.username || "A").charAt(0).toUpperCase(),
          balance: initialUser.creds || 0,
          avatar,
        });
      }
    };

    loadUser();

    const fetchMe = async () => {
      try {
       const token =
  localStorage.getItem(
    "adminToken"
  );
        if (!token) return;

        const res = await fetch(
          "https://revadoobackend.onrender.com/api/admin/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (data && data.id) {
          const avatar = localStorage.getItem("userAvatar") || null;

          setUserData({
            username: data.username || "Admin",
            initial: (data.username || "A").charAt(0).toUpperCase(),
            balance: data.creds || 0,
            avatar: data.avatar || avatar,
          });

          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to fetch admin user", err);
      }
    };

    fetchMe();

    const handleBalanceUpdate = (event) => {
      const nextBalance = event?.detail?.newBalance;

      if (typeof nextBalance === "number") {
        setUserData((prev) => ({ ...prev, balance: nextBalance }));

        try {
          const rawUser = localStorage.getItem("user");
          if (rawUser) {
            const parsed = JSON.parse(rawUser);
            localStorage.setItem(
              "user",
              JSON.stringify({ ...parsed, creds: nextBalance })
            );
          }
        } catch {}
      }

      fetchMe();
    };

    window.addEventListener("balanceUpdated", handleBalanceUpdate);
    window.addEventListener("walletUpdated", handleBalanceUpdate);

    return () => {
      window.removeEventListener("balanceUpdated", handleBalanceUpdate);
      window.removeEventListener("walletUpdated", handleBalanceUpdate);
    };
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/", { replace: true });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6"
      style={{
        background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,107,0,0.15)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
        height: "65px",
      }}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className="text-white lg:hidden"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        {/* LOGO */}
        <Link
          to="/admin"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.8rem",
            letterSpacing: "0.08em",
            textDecoration: "none",
            color: "white",
          }}
        >
          REVADOO{" "}
          <span style={{ color: "#FF6B00" }}>
            ADMIN
          </span>
        </Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 24,
            background: "rgba(255,255,255,0.08)",
          }}
        />

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-orange-500/30 px-3 py-1.5 text-xs sm:text-sm text-orange-400 hover:bg-orange-500/10"
        >
          Logout
        </button>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #FF6B00 50%, transparent 100%)",
        }}
      />
    </header>
  );
};

export default AdminHeader;