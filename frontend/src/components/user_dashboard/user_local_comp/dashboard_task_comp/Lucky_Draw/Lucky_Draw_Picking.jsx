import React from "react";

function Lucky_Draw_Picking() {
  return (
    <div
      className="
        bg-white
        border
        border-orange-100
        rounded-[32px]
        p-6
        sm:p-10
        text-center
        font-['DM_Sans',sans-serif]
      "
    >
      {/* ICON */}

      <div
        className="
          w-24
          h-24
          sm:w-28
          sm:h-28
          rounded-full
          bg-orange-100
          flex
          items-center
          justify-center
          mx-auto
          animate-pulse
        "
      >
        <span className="text-5xl">
          🎯
        </span>
      </div>

      {/* TITLE */}

      <h2
        className="
          text-2xl
          sm:text-4xl
          font-black
          text-black
          mt-8
          tracking-tight
        "
      >
        Picking Winners...
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          text-sm
          sm:text-lg
          text-gray-500
          font-medium
          leading-relaxed
          mt-4
          max-w-[600px]
          mx-auto
        "
      >
        The lucky draw has ended.
        Our system is now
        securely selecting the
        winning tickets.
        Please wait while results
        are being finalized.
      </p>

      {/* LOADER */}

      <div
        className="
          flex
          justify-center
          gap-3
          mt-8
        "
      >
        {[1, 2, 3].map(
          (item) => (
            <div
              key={item}
              className="
                w-4
                h-4
                rounded-full
                bg-orange-500
                animate-bounce
              "
            />
          )
        )}
      </div>

      {/* FOOTER */}

      <p
        className="
          text-xs
          sm:text-sm
          text-orange-500
          font-black
          uppercase
          tracking-widest
          mt-8
        "
      >
        Results Will Be Announced Shortly
      </p>
    </div>
  );
}

export default Lucky_Draw_Picking;