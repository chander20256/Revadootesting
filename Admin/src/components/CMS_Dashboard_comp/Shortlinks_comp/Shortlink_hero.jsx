import React from "react";

function Shortlink_hero() {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        p-5
        sm:p-6
        flex
        flex-col
        gap-4
        bg-white
      "
      style={{
        borderColor:
          "rgba(0,0,0,0.08)",
      }}
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
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
              sm:text-2xl
              font-bold
            "
            style={{
              color: "#111827",
            }}
          >
            Shortlinks CMS
          </h1>

          <p
            className="
              text-sm
              mt-2
              leading-relaxed
              max-w-2xl
            "
            style={{
              color: "#6b7280",
            }}
          >
            Manage shortlinks,
            rewards, timers,
            visibility, and user
            earning settings from
            the CMS dashboard.
          </p>
        </div>

        {/* STATUS */}

        <div
          className="
            px-3
            py-2
            rounded-xl
            text-xs
            font-semibold
          "
          style={{
            background:
              "rgba(249,115,22,0.10)",

            color: "#f97316",
          }}
        >
          CMS PANEL
        </div>
      </div>

      {/* INFO ROW */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-3
        "
      >
        {[
          "Add Links",
          "Manage Rewards",
          "Track Visits",
          "Control Status",
        ].map((item, index) => (
          <div
            key={index}
            className="
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-medium
            "
            style={{
              borderColor:
                "rgba(0,0,0,0.06)",

              background:
                "#fafafa",

              color: "#374151",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shortlink_hero;