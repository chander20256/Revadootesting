import React from "react";

function PTC_hero() {
  return (
    <section
      className="
        w-full
        rounded-[24px]
        p-4
        sm:p-6
      "
      style={{
        background: "#ffffff",

        border:
          "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* TOP */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          flex-wrap
        "
      >
        {/* LEFT */}

        <div>
          <h1
            className="
              text-xl
              sm:text-3xl
              font-black
            "
            style={{
              color: "#030712",
            }}
          >
            PTC Ads CMS
          </h1>

          <p
            className="
              mt-2
              text-xs
              sm:text-sm
              leading-relaxed
            "
            style={{
              color: "#6b7280",
            }}
          >
            Manage paid-to-click
            ads, reward tasks,
            iframe campaigns,
            and sponsor offers.
          </p>
        </div>

        {/* RIGHT */}

     
      </div>
    </section>
  );
}

export default PTC_hero;