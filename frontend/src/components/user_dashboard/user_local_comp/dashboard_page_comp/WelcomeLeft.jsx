import React, {
  useEffect,
  useState,
} from "react";

const WelcomeLeft = () => {
  const [userData, setUserData] =
    useState({
      username: "User",
      creds: 0,
      streak: 0,
    });

  /* -----------------------------
     GREETING
  ----------------------------- */

  const getGreeting = () => {
    const hour =
      new Date().getHours();

    if (hour < 12)
      return "Good Morning";

    if (hour < 17)
      return "Good Afternoon";

    return "Good Evening";
  };

  /* -----------------------------
     FETCH USER DATA
  ----------------------------- */

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) return;

          const res = await fetch(
            "https://revadoobackend.onrender.com/api/progress/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data =
            await res.json();

          const user =
            data.user || data.data;

          if (user) {
            setUserData({
              username:
                user.username ||
                "User",

              creds:
                user.creds || 0,

              streak:
                user.streak || 0,
            });

            /* UPDATE LOCAL STORAGE */

            localStorage.setItem(
              "user",
              JSON.stringify(user)
            );
          }
        } catch (err) {
          console.error(err);
        }
      };

    fetchUser();

    /* AUTO REFRESH */

    const interval =
      setInterval(
        fetchUser,
        5000
      );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col gap-6 w-full"
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* Greeting Badge */}

      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{
            background:
              "rgba(255,107,0,0.1)",
          }}
        >
          <span
            style={{
              fontSize: "20px",
            }}
          >
            👋
          </span>
        </div>

        <div>
          <p
            className="text-xs uppercase font-bold tracking-wider"
            style={{
              color: "#FF6B00",
            }}
          >
            {getGreeting()}
          </p>

          <p
            className="text-sm font-medium mt-0.5"
            style={{
              color: "#6b7280",
            }}
          >
            Welcome back to your
            dashboard
          </p>
        </div>
      </div>

      {/* Welcome Message */}

      <div className="space-y-2">
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
          style={{
            color: "#030712",
            lineHeight: 1.2,
          }}
        >
          Welcome Back,
        </p>

        <p
          className="text-2xl sm:text-3xl md:text-4xl font-black"
          style={{
            color: "#FF6B00",
            lineHeight: 1.2,
          }}
        >
          {userData.username}!
        </p>
      </div>

      {/* Description */}

      <div className="space-y-2">
        <p
          className="text-sm sm:text-base font-semibold"
          style={{
            color: "#030712",
          }}
        >
          Ready to unlock your
          earning potential today?
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: "#6b7280",
          }}
        >
          Complete surveys, play
          games, and earn rewards.
          Keep your daily streak
          alive and grow your
          portfolio faster.
        </p>
      </div>

      {/* Dynamic Stats */}

      <div
        className="grid grid-cols-2 gap-3 pt-4 border-t"
        style={{
          borderColor:
            "rgba(0,0,0,0.05)",
        }}
      >
        {/* Total Creds */}

        <div>
          <p
            className="text-xs uppercase font-bold mb-1"
            style={{
              color: "#6b7280",
            }}
          >
            Total Creds
          </p>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <p
              className="text-base sm:text-lg font-black"
              style={{
                color: "#FF6B00",
              }}
            >
              {userData.creds}
            </p>

            <img
              src="/Revadoocoin.png"
              alt="REV Coin"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain rounded-full"
            />
          </div>
        </div>

        {/* Active Streak */}

        <div>
          <p
            className="text-xs uppercase font-bold mb-1"
            style={{
              color: "#6b7280",
            }}
          >
            Active Streaks
          </p>

          <p
            className="text-lg font-black flex items-center gap-1"
            style={{
              color: "#FF6B00",
            }}
          >
            🔥 {userData.streak} Day
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeLeft;