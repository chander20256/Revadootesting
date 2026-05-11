import React from "react";

import Creds_Hero from "./Creds_Hero";
import Creds_claim from "./Creds_claim";
import Creds_history from "./Creds_history";
import Creds_rewards from "./Creds_rewards";

import DashboardGlobalads from "../../../user_global_comp/DashboardGlobalads";

function Creds_main() {
  return (
    <div
      className="
        w-full
        min-h-screen
        space-y-4
        sm:space-y-5
      "
      style={{
        fontFamily:
          "'DM Sans', sans-serif",
      }}
    >
      {/* HERO */}

      <Creds_Hero />

      {/* TOP 468x60 */}

      <div
        className="
          flex
          items-center
          justify-center
          overflow-hidden
          rounded-[24px]
          bg-white
          p-2
        "
        style={{
          border:
            "1px solid rgba(0,0,0,0.06)",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        <DashboardGlobalads
          adId="797073"
          className="
            flex
            items-center
            justify-center
            h-[60px]
            w-full
            max-w-[468px]
          "
        />
      </div>

      {/* TELEGRAM REWARDS */}

      <Creds_rewards />

      {/* MAIN SECTION */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_300px]
          gap-4
          sm:gap-5
          items-start
        "
      >
        {/* LEFT SIDE */}

        <div className="space-y-4 sm:space-y-5">
          {/* CLAIM */}

          <Creds_claim />

          {/* RESPONSIVE BANNER */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
              bg-white
              p-2
              flex
              items-center
              justify-center
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <DashboardGlobalads
              adId="797073"
              className="
                flex
                items-center
                justify-center
                h-[60px]
                w-full
                max-w-[468px]
              "
            />
          </div>

          {/* HISTORY */}

          <Creds_history />

          {/* MOBILE 300x250 */}

          <div
            className="
              block
              xl:hidden
              rounded-[24px]
              overflow-hidden
              bg-white
              p-2
              flex
              items-center
              justify-center
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <DashboardGlobalads
              adId="161753"
              className="
                flex
                items-center
                justify-center
                min-h-[250px]
                w-full
                max-w-[300px]
              "
            />
          </div>

          {/* NATIVE STYLE */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
              bg-white
              p-2
              flex
              items-center
              justify-center
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <DashboardGlobalads
              adId="518210"
              className="
                flex
                items-center
                justify-center
                min-h-[250px]
                w-full
              "
            />
          </div>
        </div>

        {/* SIDEBAR */}

        <div
          className="
            hidden
            xl:flex
            flex-col
            gap-5
            sticky
            top-24
          "
        >
          {/* 300x250 */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
              bg-white
              p-2
              flex
              items-center
              justify-center
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <DashboardGlobalads
              adId="161753"
              className="
                flex
                items-center
                justify-center
                min-h-[250px]
                w-full
              "
            />
          </div>

          {/* NATIVE */}

          <div
            className="
              rounded-[24px]
              overflow-hidden
              bg-white
              p-2
              flex
              items-center
              justify-center
            "
            style={{
              border:
                "1px solid rgba(0,0,0,0.06)",

              boxShadow:
                "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <DashboardGlobalads
              adId="518210"
              className="
                flex
                items-center
                justify-center
                min-h-[250px]
                w-full
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creds_main;