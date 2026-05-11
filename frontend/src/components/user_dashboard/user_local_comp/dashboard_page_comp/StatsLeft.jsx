import React, {
  useState,
  useEffect,
} from "react";

const FILTERS = [
  {
    key: "today",
    label: "Today",
  },

  {
    key: "yesterday",
    label: "Yesterday",
  },

  {
    key: "7days",
    label: "7 Days",
  },

  {
    key: "30days",
    label: "30 Days",
  },

  {
    key: "lifetime",
    label: "Lifetime",
  },
];

const StatCard = ({
  label,
  value,
  icon,
  color,
  statKey,
  selectedStat,
  onSelectStat,
}) => {
  const isSelected =
    selectedStat === statKey;

  return (
    <div
      onClick={() =>
        onSelectStat(statKey)
      }
      className="
        flex 
        flex-col 
        justify-between
        h-full
        rounded-2xl 
        p-2
        sm:p-3
        min-h-[145px]
        sm:min-h-[165px]
        transition-all 
        duration-200 
        cursor-pointer
      "
      style={{
        background: isSelected
          ? "#fff8f4"
          : "#ffffff",

        border: isSelected
          ? `1.5px solid ${color}`
          : "1.5px solid rgba(0,0,0,0.07)",

        boxShadow: isSelected
          ? `0 4px 24px rgba(255,107,0,0.10)`
          : "0 1px 4px rgba(0,0,0,0.04)",

        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* TOP */}

      <div className="flex items-center justify-between gap-1">
        <p
          className="
            text-[8px]
            sm:text-[10px]
            font-semibold
            uppercase
            tracking-widest
            leading-tight
          "
          style={{
            color: isSelected
              ? color
              : "#9ca3af",
          }}
        >
          {label}
        </p>

        <div
          className="
            flex 
            items-center 
            justify-center 
            rounded-xl 
            shrink-0
          "
          style={{
            width: 26,
            height: 26,

            background:
              isSelected
                ? color
                : "rgba(0,0,0,0.05)",

            color: isSelected
              ? "#ffffff"
              : "#6b7280",
          }}
        >
          {React.cloneElement(icon, {
            width: 12,
            height: 12,
          })}
        </div>
      </div>

      {/* VALUE */}

      <div className="flex-1 flex items-center">
        <h3
          className="
            text-lg
            sm:text-2xl
            font-black
            leading-none
          "
          style={{
            color: "#030712",
          }}
        >
          {value}
        </h3>
      </div>

      {/* LINE */}

      <div
        className="rounded-full"
        style={{
          height: 2,

          width: isSelected
            ? 32
            : 14,

          background: isSelected
            ? color
            : "rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

const StatsLeft = ({
  selectedStat,
  onSelectStat,
}) => {
  const [stats, setStats] =
    useState({
      completedTasks: 0,
      totalEarnings: 0,
      completedSurveys: 0,
      totalReferrals: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [activeFilter, setActiveFilter] =
    useState("today");

  const getLabelPrefix = () => {
    switch (activeFilter) {
      case "today":
        return "Today's";

      case "yesterday":
        return "Yesterday's";

      case "7days":
        return "7 Days";

      case "30days":
        return "30 Days";

      case "lifetime":
        return "Lifetime";

      default:
        return "Today's";
    }
  };

  const fetchStats = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://revadoobackend.onrender.com/api/user/dashboard-stats?filter=${activeFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await res.json();

      if (
        data.success &&
        data.stats
      ) {
        setStats({
          completedTasks:
            data.stats
              .completedTasks || 0,

          totalEarnings:
            data.stats
              .totalEarnings || 0,

          completedSurveys:
            data.stats
              .completedSurveys || 0,

          totalReferrals:
            data.stats
              .totalReferrals || 0,
        });
      }
    } catch (err) {
      console.error(
        "Failed to fetch stats",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeFilter]);

  const cards = [
    {
      statKey: "tasks",

      label: `${getLabelPrefix()} Tasks`,

      value:
        stats.completedTasks,

      color: "#FF6B00",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 11l3 3L22 4" />

          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },

    {
  statKey: "earnings",

  label: `${getLabelPrefix()} Creds`,

  value: stats.totalEarnings,

  color: "#FF6B00",

  icon: (
    <img
      src="/Revadoocoin.png"
      alt="REV Coin"
      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain rounded-full"
    />
  ),
},

    {
      statKey: "surveys",

      label: `${getLabelPrefix()} Surveys`,

      value:
        stats.completedSurveys,

      color: "#FF6B00",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        </svg>
      ),
    },

    {
      statKey: "referrals",

      label: `${getLabelPrefix()} Referrals`,

      value:
        stats.totalReferrals,

      color: "#FF6B00",

      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle
            cx="9"
            cy="7"
            r="4"
          />
        </svg>
      ),
    },
  ];

  return (
  <div className="h-full">
    {/* DESKTOP LAYOUT */}

    <div className="hidden lg:flex gap-4 h-full items-stretch">
      
      {/* LEFT FILTERS */}

      <div
        className="
          flex 
          flex-col 
          gap-3 
          shrink-0
          rounded-3xl
          p-3
          self-stretch
        "
        style={{
          background: "#ffffff",

          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 2px 14px rgba(0,0,0,0.04)",
        }}
      >
        {FILTERS.map((filter) => {
          const active =
            activeFilter ===
            filter.key;

          return (
            <button
              key={filter.key}
              onClick={() =>
                setActiveFilter(
                  filter.key
                )
              }
              className="
                px-4
                py-3
                rounded-2xl
                text-sm
                font-bold
                transition-all
                duration-300
                text-left
                min-w-[115px]
                relative
                overflow-hidden
              "
              style={{
                background: active
                  ? "linear-gradient(135deg, #FF6B00 0%, #ff8533 100%)"
                  : "#ffffff",

                color: active
                  ? "#ffffff"
                  : "#6b7280",

                border: active
                  ? "1px solid #FF6B00"
                  : "1px solid rgba(0,0,0,0.06)",

                boxShadow: active
                  ? "0 8px 20px rgba(255,107,0,0.22)"
                  : "0 1px 3px rgba(0,0,0,0.03)",
              }}
            >
              <span className="relative z-10">
                {filter.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* RIGHT CARDS */}

      <div className="grid grid-cols-2 gap-4 flex-1 auto-rows-fr">
        {loading
          ? [1, 2, 3, 4].map(
              (i) => (
                <div
                  key={i}
                  className="
                    rounded-3xl
                    p-4
                    animate-pulse
                    bg-gray-100
                    h-full
                    min-h-[215px]
                  "
                >
                  <div className="h-4 w-20 bg-gray-300 rounded mb-5" />

                  <div className="h-10 w-14 bg-gray-300 rounded" />
                </div>
              )
            )
          : cards.map(
              (card, i) => (
                <div
                  key={i}
                  className="h-full"
                >
                  <StatCard
                    {...card}
                    selectedStat={
                      selectedStat
                    }
                    onSelectStat={
                      onSelectStat
                    }
                  />
                </div>
              )
            )}
      </div>
    </div>

    {/* MOBILE LAYOUT */}

    <div className="lg:hidden space-y-2 h-full">
      {/* FILTERS */}

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() =>
              setActiveFilter(
                filter.key
              )
            }
            className="
              px-2
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold
              transition-all
              duration-200
            "
            style={{
              background:
                activeFilter ===
                filter.key
                  ? "#FF6B00"
                  : "#ffffff",

              color:
                activeFilter ===
                filter.key
                  ? "#ffffff"
                  : "#6b7280",

              border:
                activeFilter ===
                filter.key
                  ? "1px solid #FF6B00"
                  : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 h-full">
        {loading
          ? [1, 2, 3, 4].map(
              (i) => (
                <div
                  key={i}
                  className="
                    rounded-2xl
                    p-3
                    animate-pulse
                    bg-gray-100
                    min-h-[145px]
                    sm:min-h-[165px]
                  "
                >
                  <div className="h-4 w-16 bg-gray-300 rounded mb-4" />

                  <div className="h-8 w-10 bg-gray-300 rounded" />
                </div>
              )
            )
          : cards.map(
              (card, i) => (
                <StatCard
                  key={i}
                  {...card}
                  selectedStat={
                    selectedStat
                  }
                  onSelectStat={
                    onSelectStat
                  }
                />
              )
            )}
      </div>
    </div>
  </div>
);
};

export default StatsLeft;