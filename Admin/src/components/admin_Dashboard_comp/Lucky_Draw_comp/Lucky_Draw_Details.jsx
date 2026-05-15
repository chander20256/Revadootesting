import React, {
  useState,
  useEffect,
} from "react";

function Lucky_Draw_Details({
  drawData,
  loading,
  onRefresh,
}) {
  /* -----------------------------
     STATES
  ----------------------------- */

  const [openEdit, setOpenEdit] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  /* -----------------------------
     API
  ----------------------------- */

  const API_URL =
    "https://revadoobackend.onrender.com/api/admin";

  /* -----------------------------
     TOKEN
  ----------------------------- */

  const token =
    localStorage.getItem(
      "token"
    );

  /* -----------------------------
     BACKEND DATA
  ----------------------------- */

  const activeDraw = {
    id:
      drawData?._id,

    reward:
      drawData?.rewardTitle ??
      "No Active Draw",

    tickets:
      drawData?.ticketsSold ??
      "0",

    participants:
      drawData?.participants ??
      "0",

    winners:
      drawData?.totalWinners ??
      "0",

    entryFee:
      drawData?.entryFee ?? "0",

    duration:
      drawData?.durationDays ??
      "0",

    status:
      drawData?.status ??
      "Inactive",

    description:
      drawData?.description ??
      "No description available.",

    image:
      drawData?.rewardImage ??
      "",

    timer: {
      days: String(
        Math.max(
          0,
          Number(
            drawData?.timer
              ?.days || 0
          )
        )
      ).padStart(2, "0"),

      hours: String(
        Math.max(
          0,
          Number(
            drawData?.timer
              ?.hours || 0
          )
        )
      ).padStart(2, "0"),

      minutes: String(
        Math.max(
          0,
          Number(
            drawData?.timer
              ?.minutes || 0
          )
        )
      ).padStart(2, "0"),

      seconds: String(
        Math.max(
          0,
          Number(
            drawData?.timer
              ?.seconds || 0
          )
        )
      ).padStart(2, "0"),
    },
  };

  /* -----------------------------
     FORM DATA
  ----------------------------- */

  const [formData, setFormData] =
    useState({
      rewardTitle: "",

      rewardImage: "",

      description: "",

      entryFee: "",

      totalWinners: "",

      durationDays: "",
    });

  /* -----------------------------
     AUTO FILL
  ----------------------------- */
useEffect(() => {
  if (
    openEdit
  ) {
    setFormData({
      rewardTitle:
        drawData?.rewardTitle ||
        "",

      rewardImage:
        drawData?.rewardImage ||
        "",

      description:
        drawData?.description ||
        "",

      entryFee:
        drawData?.entryFee ||
        "",

      totalWinners:
        drawData?.totalWinners ||
        "",

      durationDays:
        drawData?.durationDays ||
        "",
    });
  }
}, [openEdit]);
  /* -----------------------------
     HANDLE CHANGE
  ----------------------------- */

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(
      (
        prev
      ) => ({
        ...prev,

        [name]:
          value,
      })
    );
  };

  /* -----------------------------
     UPDATE DRAW
  ----------------------------- */

  const handleUpdateDraw =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(
          true
        );

        const response =
          await fetch(
            `${API_URL}/lucky-draw/update/${activeDraw.id}`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          alert(
            data.message ||
              "Update failed"
          );

          return;
        }

        alert(
          "Lucky draw updated successfully"
        );

        setOpenEdit(
          false
        );

        if (
          onRefresh
        ) {
          onRefresh();
        }
      } catch (error) {
        console.log(
          error
        );

        alert(
          "Update failed"
        );
      } finally {
        setSaving(
          false
        );
      }
    };
  return (
    <>
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          sm:rounded-[32px]
          p-4
          sm:p-6
          font-['DM_Sans',sans-serif]
        "
      >
        {/* TOP */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-6
          "
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500 mb-2">
              Active Event
            </p>

            <h2 className="text-2xl font-black text-black tracking-tight">
              Lucky Draw Details
            </h2>
          </div>

          <div
            className="
              inline-flex
              items-center
              justify-center
              px-4
              py-2
              rounded-2xl
              bg-orange-50
              border
              border-orange-100
              text-xs
              font-black
              text-orange-500
              uppercase
              tracking-wider
              w-fit
            "
          >
            {loading
              ? "Loading..."
              : activeDraw.status}
          </div>
        </div>

        {/* MAIN */}

        <div
          className="
            rounded-[28px]
            border
            border-gray-100
            bg-gray-50
            p-5
            sm:p-6
          "
        >
          {/* TOP */}

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-start
              xl:justify-between
              gap-6
            "
          >
            {/* LEFT */}

            <div className="flex-1">
              {/* IMAGE */}

              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-orange-50
                  border
                  border-orange-100
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >
                {activeDraw.image ? (
                  <img
                    src={
                      activeDraw.image
                    }
                    alt="reward"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <div className="text-4xl">
                    🎁
                  </div>
                )}
              </div>

              {/* TITLE */}

              <h3 className="text-xl sm:text-3xl font-black text-black mt-5 tracking-tight">
                {loading
                  ? "Loading..."
                  : activeDraw.reward}
              </h3>

              {/* DESCRIPTION */}

              <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">
                {loading
                  ? "Fetching lucky draw details..."
                  : activeDraw.description}
              </p>

              {/* TIMER */}

              <div
                className="
                  grid
                  grid-cols-4
                  gap-3
                  mt-6
                  max-w-[520px]
                "
              >
                {[
                  {
                    value:
                      activeDraw.timer
                        .days,
                    label:
                      "Days",
                  },

                  {
                    value:
                      activeDraw.timer
                        .hours,
                    label:
                      "Hours",
                  },

                  {
                    value:
                      activeDraw.timer
                        .minutes,
                    label:
                      "Minutes",
                  },

                  {
                    value:
                      activeDraw.timer
                        .seconds,
                    label:
                      "Seconds",
                  },
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        bg-white
                        border
                        border-orange-100
                        rounded-2xl
                        py-4
                        px-2
                        text-center
                      "
                    >
                      <h4 className="text-lg sm:text-3xl font-black text-black leading-none">
                        {loading
                          ? "--"
                          : item.value}
                      </h4>

                      <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-500 font-black mt-2">
                        {item.label}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RIGHT */}

           <div
  className="
    w-full
    xl:w-[220px]
  "
>
  <button
    onClick={() =>
      setOpenEdit(
        true
      )
    }
    className="
      w-full
      px-6
      py-3.5
      rounded-2xl
      bg-orange-500
      hover:bg-orange-600
      text-white
      text-sm
      font-black
      transition-all
      duration-200
      shadow-lg
      shadow-orange-500/20
    "
  >
    Manage Draw
  </button>
</div>
          </div>

          {/* STATS */}

          <div
            className="
              grid
              grid-cols-2
              xl:grid-cols-5
              gap-4
              mt-7
            "
          >
            {[
              {
                title:
                  "Tickets Sold",

                value:
                  activeDraw.tickets,
              },

              {
                title:
                  "Participants",

                value:
                  activeDraw.participants,
              },

              {
                title:
                  "Winners",

                value:
                  activeDraw.winners,
              },

              {
                title:
                  "Entry Fee",

                value: `${activeDraw.entryFee} Creds`,
              },

              {
                title:
                  "Duration",

                value: `${activeDraw.duration} Days`,
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    p-4
                  "
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-black mb-2">
                    {item.title}
                  </p>

                  <h4 className="text-lg sm:text-2xl font-black text-black">
                    {loading
                      ? "..."
                      : item.value}
                  </h4>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}

      {openEdit && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/60
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-2xl
              bg-white
              rounded-[30px]
              p-5
              sm:p-7
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">
                Edit Lucky Draw
              </h2>

              <button
                onClick={() =>
                  setOpenEdit(
                    false
                  )
                }
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-gray-100
                  font-black
                "
              >
                ×
              </button>
            </div>

            <form
              onSubmit={
                handleUpdateDraw
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="rewardTitle"
                value={
                  formData.rewardTitle
                }
                onChange={
                  handleChange
                }
                placeholder="Reward Title"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                "
              />

              <input
                type="text"
                name="rewardImage"
                value={
                  formData.rewardImage
                }
                onChange={
                  handleChange
                }
                placeholder="Reward Image"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                "
              />

              <textarea
                rows="4"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                placeholder="Description"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  p-4
                "
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="entryFee"
                  value={
                    formData.entryFee
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Entry Fee"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                  "
                />

                <input
                  type="number"
                  name="totalWinners"
                  value={
                    formData.totalWinners
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Total Winners"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                  "
                />

                <input
                  type="number"
                  name="durationDays"
                  value={
                    formData.durationDays
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Duration"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                  "
                />
              </div>

              <button
                type="submit"
                disabled={
                  saving
                }
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-orange-500
                  text-white
                  font-black
                "
              >
                {saving
                  ? "Updating..."
                  : "Update Draw"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Lucky_Draw_Details;