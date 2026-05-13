import React, {
  useState,
} from "react";

function Lucky_Draw_Header({
  onRefresh,
  loading,
}) {
  const [openForm, setOpenForm] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [formData, setFormData] =
    useState({
      rewardTitle: "",

      rewardImage: "",

      entryFee: 500,

      totalWinners: 1,

      maxTicketsPerUser: 5,

      durationDays: 7,

      description: "",
    });

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

    /* TEXT */

    if (
      name ===
        "rewardTitle" ||
      name ===
        "rewardImage" ||
      name ===
        "description"
    ) {
      setFormData({
        ...formData,

        [name]:
          value,
      });

      return;
    }

    /* NUMBER */

    let numberValue =
      Number(value);

    if (
      numberValue < 1
    ) {
      numberValue = 1;
    }

    /* MAX 5 */

    if (
      name ===
        "maxTicketsPerUser" &&
      numberValue > 5
    ) {
      numberValue = 5;
    }

    setFormData({
      ...formData,

      [name]:
        numberValue,
    });
  };

  /* -----------------------------
     CREATE DRAW
  ----------------------------- */
const handleCreateDraw =
  async (e) => {
    e.preventDefault();

    try {
      setCreating(
        true
      );

      const adminData =
        JSON.parse(
          localStorage.getItem(
            "adminData"
          )
        );

      /* API URL */

      const API_URL =
        "https://YOUR-RENDER-BACKEND.onrender.com";

      const response =
        await fetch(
          `${API_URL}/api/admin/lucky-draw/create`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                ...formData,

                createdBy:
                  adminData?._id,
              }
            ),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {
        alert(
          data.message
        );

        return;
      }

      alert(
        "Lucky draw created successfully"
      );

      /* RESET */

      setFormData({
        rewardTitle:
          "",

        rewardImage:
          "",

        entryFee:
          500,

        totalWinners:
          1,

        maxTicketsPerUser:
          5,

        durationDays:
          7,

        description:
          "",
      });

      /* CLOSE */

      setOpenForm(
        false
      );

      /* REFRESH */

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
        "Failed to create lucky draw"
      );
    } finally {
      setCreating(
        false
      );
    }
  };
  return (
    <>
      {/* HEADER */}

      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-[28px]
          sm:rounded-[32px]
          p-5
          sm:p-6
          lg:p-7
          font-['DM_Sans',sans-serif]
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >
          {/* LEFT */}

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500 mb-2">
              Lucky Draw Management
            </p>

            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Revadoo Lucky Draw
            </h1>

            <p className="text-sm text-gray-500 leading-relaxed mt-3 max-w-2xl">
              Manage active lucky draw events, monitor participants,
              track ticket sales, and control reward distribution from
              the Revadoo admin dashboard.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
            "
          >
            {/* REFRESH */}

            <button
              onClick={
                onRefresh
              }
              disabled={
                loading
              }
              className="
                px-5
                py-3
                rounded-2xl
                border
                border-gray-200
                bg-white
                text-sm
                font-black
                text-black
                hover:border-orange-200
                transition-all
                duration-200
                disabled:opacity-50
              "
            >
              {loading
                ? "Refreshing..."
                : "Refresh Data"}
            </button>

            {/* CREATE DRAW */}

            <button
              onClick={() =>
                setOpenForm(
                  true
                )
              }
              className="
                px-6
                py-3
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
              Create New Draw
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}

      {openForm && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/60
            p-4
          "
        >
          {/* BOX */}

          <div
            className="
              w-full
              max-w-2xl
              bg-white
              rounded-[30px]
              border
              border-gray-100
              p-5
              sm:p-7
              max-h-[95vh]
              overflow-y-auto
              font-['DM_Sans',sans-serif]
            "
          >
            {/* TOP */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                mb-6
              "
            >
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-500 mb-2">
                  Create Event
                </p>

                <h2 className="text-2xl font-black text-black">
                  New Lucky Draw
                </h2>
              </div>

              <button
                onClick={() =>
                  setOpenForm(
                    false
                  )
                }
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-gray-100
                  text-black
                  text-xl
                  font-black
                "
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleCreateDraw
              }
              className="space-y-5"
            >
              {/* REWARD TITLE */}

              <div>
                <label className="text-sm font-black text-black block mb-2">
                  Reward Title
                </label>

                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Name of the lucky draw reward users will win.
                </p>

                <input
                  type="text"
                  name="rewardTitle"
                  value={
                    formData.rewardTitle
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="₹500 Amazon Gift Card"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    text-sm
                    outline-none
                    focus:border-orange-400
                  "
                  required
                />
              </div>

              {/* IMAGE */}

              <div>
                <label className="text-sm font-black text-black block mb-2">
                  Reward Image URL
                </label>

                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Image link used to display the reward visually.
                </p>

                <input
                  type="url"
                  name="rewardImage"
                  value={
                    formData.rewardImage
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://example.com/image.png"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    px-4
                    text-sm
                    outline-none
                    focus:border-orange-400
                  "
                />
              </div>

              {/* GRID */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >
                {/* ENTRY */}

                <div>
                  <label className="text-sm font-black text-black block mb-2">
                    Entry Fee
                  </label>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Number of creds required to buy one ticket.
                  </p>

                  <input
                    type="number"
                    min="1"
                    name="entryFee"
                    value={
                      formData.entryFee
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="500"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-orange-400
                    "
                    required
                  />
                </div>

                {/* WINNERS */}

                <div>
                  <label className="text-sm font-black text-black block mb-2">
                    Total Winners
                  </label>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Total number of users that will win the draw.
                  </p>

                  <input
                    type="number"
                    min="1"
                    name="totalWinners"
                    value={
                      formData.totalWinners
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="5"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-orange-400
                    "
                    required
                  />
                </div>

                {/* MAX TICKETS */}

                <div>
                  <label className="text-sm font-black text-black block mb-2">
                    Max Tickets Per User
                  </label>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Maximum tickets a single user can purchase in this
                    draw.
                  </p>

                  <input
                    type="number"
                    min="1"
                    max="5"
                    name="maxTicketsPerUser"
                    value={
                      formData.maxTicketsPerUser
                    }
                    onChange={
                      handleChange
                    }
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-orange-400
                    "
                    required
                  />
                </div>

                {/* DURATION */}

                <div>
                  <label className="text-sm font-black text-black block mb-2">
                    Duration (Days)
                  </label>

                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Total number of days the lucky draw stays active.
                  </p>

                  <input
                    type="number"
                    min="1"
                    name="durationDays"
                    value={
                      formData.durationDays
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="7"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-gray-200
                      px-4
                      text-sm
                      outline-none
                      focus:border-orange-400
                    "
                    required
                  />
                </div>
              </div>

              {/* TICKET INFO */}

              <div
                className="
                  rounded-2xl
                  border
                  border-orange-100
                  bg-orange-50
                  p-4
                "
              >
                <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">
                  Ticket Format
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-black">
                    Format:
                    <span className="text-orange-500">
                      {" "}
                      REVA-LD-111111
                    </span>
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Every ticket purchased in the lucky draw will
                    receive a unique sequential ticket number
                    automatically generated by the system.
                  </p>

                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Maximum ticket purchase limit per user:
                    <span className="font-black text-orange-500">
                      {" "}
                      5 Tickets
                    </span>
                  </p>
                </div>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="text-sm font-black text-black block mb-2">
                  Description
                </label>

                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Short explanation about the reward and event details.
                </p>

                <textarea
                  rows="5"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter lucky draw description..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    p-4
                    text-sm
                    outline-none
                    resize-none
                    focus:border-orange-400
                  "
                />
              </div>

              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  pt-2
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenForm(
                      false
                    )
                  }
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    text-black
                    text-sm
                    font-black
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    creating
                  }
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    text-sm
                    font-black
                    transition-all
                    duration-200
                    disabled:opacity-50
                  "
                >
                  {creating
                    ? "Creating..."
                    : "Create Lucky Draw"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Lucky_Draw_Header;