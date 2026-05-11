import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Settings,
  CheckCircle,
  Calendar,
} from "lucide-react";

const WelcomeRight = () => {
  const navigate = useNavigate();

  const [userData, setUserData] =
    useState({
      username: "User",
      initial: "U",
      avatar: null,
      memberSince: "",
      exp: 0,
      dailyBonus: 5,
      streak: 0,
    });

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "user"
        );

      const avatar =
        localStorage.getItem(
          "userAvatar"
        ) || null;

      if (stored) {
        const user = JSON.parse(
          stored
        );

        setUserData({
          username:
            user.username || "User",

          initial: (
            user.username || "U"
          )
            .charAt(0)
            .toUpperCase(),

          avatar,

          exp:
            user.exp || 0,

          dailyBonus:
            user.dailyBonus ||
            5,

          streak:
            user.streak || 0,

          memberSince:
            user.createdAt
              ? new Date(
                  user.createdAt
                ).toLocaleDateString(
                  "en-US",
                  {
                    month:
                      "short",

                    year:
                      "numeric",
                  }
                )
              : "N/A",
        });
      }

      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (e) {}

    const fetchMe = async () => {
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

        /* ✅ FIX */

        const user =
          data.data || data.user;

        if (user) {
          const avatar =
            user.avatar ||
            localStorage.getItem(
              "userAvatar"
            ) ||
            null;

          setUserData({
            username:
              user.username ||
              "User",

            initial: (
              user.username ||
              "U"
            )
              .charAt(0)
              .toUpperCase(),

            avatar,

            exp:
              user.exp || 0,

            dailyBonus:
              user.dailyBonus ||
              5,

            streak:
              user.streak || 0,

            memberSince:
              user.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month:
                        "short",

                      year:
                        "numeric",
                    }
                  )
                : "N/A",
          });

          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );

          if (user.avatar) {
            localStorage.setItem(
              "userAvatar",
              user.avatar
            );
          }
        }
      } catch (err) {
        console.error(
          "Failed to fetch user",
          err
        );
      }
    };

    fetchMe();

    const handleAvatarUpdate = (
      e
    ) => {
      setUserData((prev) => ({
        ...prev,
        avatar:
          e.detail.avatar,
      }));
    };

    window.addEventListener(
      "avatarUpdated",
      handleAvatarUpdate
    );

    return () =>
      window.removeEventListener(
        "avatarUpdated",
        handleAvatarUpdate
      );
  }, []);

  return (
    <div
      className="flex flex-col w-full"
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* Invisible Top Spacer */}

      <div className="hidden lg:block h-12 xl:h-18 2xl:h-20" />

      {/* Small Screen Top Stats */}

      <div className="block lg:hidden mb-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Total EXP */}

          <div>
            <p
              className="text-xs uppercase font-bold mb-1"
              style={{
                color:
                  "#6b7280",
              }}
            >
              Total EXP
            </p>

            <p
              className="text-lg font-black"
              style={{
                color:
                  "#FF6B00",
              }}
            >
              {userData.exp || 0}
            </p>
          </div>

          {/* Daily Bonus */}

          <div>
            <p
              className="text-xs uppercase font-bold mb-1"
              style={{
                color:
                  "#6b7280",
              }}
            >
              Daily Bonus
            </p>

            <p
              className="text-lg font-black"
              style={{
                color:
                  "#FF6B00",
              }}
            >
              +
              {userData.dailyBonus ||
                5}
              %
            </p>
          </div>
        </div>

        {/* Divider */}

        <div
          className="w-full mt-5"
          style={{
            height: "1px",
            background:
              "rgba(0,0,0,0.06)",
          }}
        />
      </div>

      {/* Profile Card */}

      <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
        {/* Profile Info - Left Side */}

        <div className="flex-1">
          <p
            className="text-sm sm:text-base md:text-lg uppercase font-bold mb-1.5 sm:mb-2"
            style={{
              color: "#6b7280",
            }}
          >
            Your Profile
          </p>

          <div className="flex items-center gap-2 sm:gap-3 mt-1">
            <div
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2"
              style={{
                background:
                  "rgba(34,197,94,0.1)",
              }}
            >
              <CheckCircle
                width={16}
                height={16}
                style={{
                  color:
                    "#22c55e",
                }}
                className="sm:w-[18px] sm:h-[18px]"
              />

              <span
                className="text-sm sm:text-base md:text-lg font-semibold"
                style={{
                  color:
                    "#22c55e",
                  lineHeight: 1,
                }}
              >
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Avatar - Right Side */}

        <div className="relative flex-shrink-0 md:pr-4 lg:pr-6 xl:pr-8">
          <div
            className="flex items-center justify-center rounded-full overflow-hidden"
            style={{
              width: "110px",
              height: "110px",
              background:
                userData.avatar
                  ? "transparent"
                  : "#FF6B00",

              border:
                "2px solid rgba(255,107,0,0.2)",

              boxShadow:
                "0 4px 12px rgba(255,107,0,0.1)",
            }}
          >
            {userData.avatar ? (
              <img
                src={
                  userData.avatar
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                style={{
                  color:
                    "#fff",

                  fontSize:
                    "48px",

                  fontWeight: 800,
                }}
              >
                {
                  userData.initial
                }
              </span>
            )}
          </div>

          {/* Online Status */}

          <div
            className="absolute -left-1 bottom-0 rounded-full"
            style={{
              width: "18px",
              height: "18px",
              background:
                "#22c55e",

              border:
                "3px solid white",

              boxShadow:
                "0 2px 8px rgba(34,197,94,0.3)",
            }}
          />
        </div>
      </div>

      {/* Space */}

      <div className="h-6" />

      {/* Status Info Cards */}

      <div className="grid grid-cols-2 gap-3">
        {/* Member Since */}

        <div
          className="p-3 rounded-lg flex items-center gap-2"
          style={{
            background:
              "rgba(0,0,0,0.02)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{
              background:
                "rgba(255,107,0,0.1)",
            }}
          >
            <Calendar
              width={16}
              height={16}
              style={{
                color:
                  "#FF6B00",
              }}
            />
          </div>

          <div className="min-w-0">
            <p
              className="text-xs font-bold uppercase"
              style={{
                color:
                  "#6b7280",
              }}
            >
              Member Since
            </p>

            <p
              className="text-sm font-semibold truncate"
              style={{
                color:
                  "#030712",
              }}
            >
              {
                userData.memberSince
              }
            </p>
          </div>
        </div>

        {/* Account Button */}

        <button
          onClick={() =>
            navigate(
              "/dashboard/settings"
            )
          }
          className="p-3 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-md"
          style={{
            background:
              "#FF6B00",

            border:
              "1px solid rgba(255,107,0,0.2)",

            color: "#ffffff",
          }}
        >
          <Settings
            width={16}
            height={16}
          />

          <span className="text-xs font-bold uppercase">
            Settings
          </span>
        </button>
      </div>

      {/* Desktop Extra Stats */}

      <div className="hidden lg:block">
        {/* Divider */}

        <div
          className="w-full mt-6 mb-6"
          style={{
            height: "1px",
            background:
              "rgba(0,0,0,0.06)",
          }}
        />

        {/* Extra Stats */}

        <div className="grid grid-cols-2 gap-3">
          {/* Total EXP */}

          <div>
            <p
              className="text-xs uppercase font-bold mb-1"
              style={{
                color:
                  "#6b7280",
              }}
            >
              Total EXP
            </p>

            <p
              className="text-lg font-black"
              style={{
                color:
                  "#FF6B00",
              }}
            >
              {userData.exp || 0}
            </p>
          </div>

          {/* Daily Bonus */}

          <div>
            <p
              className="text-xs uppercase font-bold mb-1"
              style={{
                color:
                  "#6b7280",
              }}
            >
              Daily Bonus
            </p>

            <p
              className="text-lg font-black"
              style={{
                color:
                  "#FF6B00",
              }}
            >
              +
              {userData.dailyBonus ||
                5}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeRight;

