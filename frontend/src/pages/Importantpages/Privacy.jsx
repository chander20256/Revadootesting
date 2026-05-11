import React from "react";

import {
  FaShieldAlt,
  FaUserLock,
  FaCookieBite,
  FaServer,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const sections = [
  {
    icon: <FaShieldAlt />,
    title: "Your Privacy Matters",
    content:
      "At Revadoo, we believe your personal information should stay protected and transparent. This Privacy Policy explains what information we collect, how we use it, and how we keep your data safe while you use our platform.",
  },

  {
    icon: <FaUserLock />,
    title: "Information We Collect",
    content:
      "When you create an account on Revadoo, we may collect information such as your username, email address, login details, reward activity, completed tasks, and account progress.",
  },

  {
    icon: <FaCookieBite />,
    title: "Cookies & Sessions",
    content:
      "Revadoo uses cookies and secure sessions to improve your experience, remember preferences, and protect accounts from suspicious activity.",
  },

  {
    icon: <FaServer />,
    title: "How We Use Your Data",
    content:
      "We use your information to manage rewards, improve platform features, prevent abuse, and provide a smoother experience for all users.",
  },

  {
    icon: <FaGlobe />,
    title: "Third-Party Services",
    content:
      "Some Revadoo features may use third-party services such as surveys, analytics tools, advertising networks, and hosting providers.",
  },

  {
    icon: <FaEnvelope />,
    title: "Contact & Support",
    content:
      "If you have questions regarding your account or privacy, you can contact the Revadoo support team anytime.",
  },
];

const Privacy = () => {
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
            <FaShieldAlt
              className="text-lg"
              style={{
                color: "#FF6B00",
              }}
            />

            <span className="text-sm text-gray-600 tracking-wide font-semibold">
              Revadoo Privacy Center
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
            style={{
              color: "#030712",
            }}
          >
            Privacy{" "}
            <span
              style={{
                color: "#FF6B00",
              }}
            >
              Policy
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-8">
            Your trust matters to
            us. This page explains
            how Revadoo collects,
            protects, and manages
            your information while
            using rewards, surveys,
            games, and earning
            features.
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
              Data Protection &
              Transparency
            </h3>

            <div className="space-y-5">
              <p className="text-gray-600 leading-8">
                Revadoo continuously
                improves platform
                security and user
                protection. Passwords
                are securely stored,
                suspicious activity
                may be monitored for
                fraud prevention, and
                sensitive information
                is never sold to
                third parties.
              </p>

              <p className="text-gray-600 leading-8">
                By continuing to use
                Revadoo, you agree to
                this Privacy Policy
                and acknowledge that
                certain platform
                features may require
                limited data
                collection for
                rewards verification,
                analytics, and
                functionality.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500 font-medium">
            Last Updated: May 2026
            • Revadoo Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;