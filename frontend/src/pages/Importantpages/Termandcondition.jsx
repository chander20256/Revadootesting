import React from "react";

import {
  FaFileContract,
  FaCoins,
  FaUserShield,
  FaExclamationTriangle,
  FaBan,
  FaGavel,
} from "react-icons/fa";

const sections = [
  {
    icon: <FaUserShield />,
    title: "Account Responsibilities",
    content:
      "Users are responsible for maintaining the security of their Revadoo account, login credentials, and activity. Sharing accounts, exploiting bugs, or using automated systems is strictly prohibited.",
  },

  {
    icon: <FaCoins />,
    title: "Rewards & Earnings",
    content:
      "Revadoo rewards users for completing valid activities such as surveys, tasks, games, referrals, and engagement actions. Fraudulent or invalid activity may result in reward removal or account suspension.",
  },

  {
    icon: <FaExclamationTriangle />,
    title: "Fraud Prevention",
    content:
      "Any attempt to abuse the reward system, manipulate referrals, automate tasks, exploit surveys, or bypass platform rules may result in permanent suspension and loss of rewards.",
  },

  {
    icon: <FaBan />,
    title: "Restricted Activities",
    content:
      "Users may not use VPN abuse, bots, fake identities, multiple accounts, automated clicks, or unauthorized third-party software while using Revadoo services.",
  },

  {
    icon: <FaGavel />,
    title: "Platform Rights",
    content:
      "Revadoo reserves the right to modify rewards, features, earning rates, policies, or suspend accounts that violate platform rules or create risks to the ecosystem.",
  },

  {
    icon: <FaFileContract />,
    title: "Agreement Acceptance",
    content:
      "By accessing or using Revadoo, users agree to follow all platform policies, earning rules, privacy practices, and future policy updates.",
  },
];

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-10 relative overflow-hidden">
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO */}

        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6"
            style={{
              background: "#ffffff",
              border:
                "1px solid rgba(255,107,0,0.12)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <FaFileContract
              className="text-lg"
              style={{
                color: "#FF6B00",
              }}
            />

            <span className="text-sm text-gray-600 tracking-wide font-semibold">
              Revadoo Legal Center
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
            style={{
              color: "#030712",
            }}
          >
            Terms &{" "}
            <span
              style={{
                color: "#FF6B00",
              }}
            >
              Conditions
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-8">
            These Terms & Conditions
            explain the rules,
            responsibilities, and
            platform policies for
            using Revadoo rewards,
            earning systems,
            referrals, games, and
            services.
          </p>
        </div>

        {/* MAIN CARD */}

        <div
          className="rounded-[32px] p-6 md:p-10"
          style={{
            background: "#ffffff",
            border:
              "1px solid rgba(255,107,0,0.08)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.05)",
          }}
        >
          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sections.map(
              (item, index) => (
                <div
                  key={index}
                  className="group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      "#fffaf5",

                    border:
                      "1px solid rgba(255,107,0,0.08)",
                  }}
                >
                  {/* ICON */}

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background:
                        "rgba(255,107,0,0.08)",

                      color:
                        "#FF6B00",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* TITLE */}

                  <h2
                    className="text-xl font-black mt-5"
                    style={{
                      color: "#030712",
                    }}
                  >
                    {item.title}
                  </h2>

                  {/* TEXT */}

                  <p className="text-gray-600 leading-7 text-sm md:text-base mt-4">
                    {item.content}
                  </p>
                </div>
              )
            )}
          </div>

          {/* EXTRA */}

          <div
            className="mt-12 pt-8"
            style={{
              borderTop:
                "1px solid rgba(255,107,0,0.08)",
            }}
          >
            <h3
              className="text-3xl font-black mb-5"
              style={{
                color: "#030712",
              }}
            >
              Fair Usage & Platform
              Safety
            </h3>

            <div className="space-y-5">
              <p className="text-gray-600 leading-8">
                Revadoo is committed
                to maintaining a fair,
                transparent, and
                secure rewards
                ecosystem. Users are
                expected to interact
                honestly with all
                surveys, games,
                advertisements, and
                earning systems.
              </p>

              <p className="text-gray-600 leading-8">
                Violation of platform
                rules may result in
                reward deductions,
                temporary suspension,
                permanent bans, or
                removal of access to
                certain earning
                features.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500 font-medium">
            Last Updated: May 2026
            • Revadoo Terms &
            Conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;