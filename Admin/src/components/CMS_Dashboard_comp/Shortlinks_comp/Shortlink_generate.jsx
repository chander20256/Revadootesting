import React, {
  useState,
} from "react";

import axios from "axios";

function Shortlink_generate() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",

      description: "",

      originalUrl: "",

      reward: 0,

      expReward: 0,

      timer: 0,

      dailyLimit: 1,

      cooldown: 0,

      category: "general",

      status: "active",

      provider: "gplinks",

      apiKey: "",
    });

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /* =========================================
     RESET FORM
  ========================================= */

  const handleReset = () => {
    setFormData({
      title: "",

      description: "",

      originalUrl: "",

      reward: 0,

      expReward: 0,

      timer: 0,

      dailyLimit: 1,

      cooldown: 0,

      category: "general",

      status: "active",

      provider: "gplinks",

      apiKey: "",
    });
  };

  /* =========================================
     CREATE SHORTLINK
  ========================================= */

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        const payload = {
          ...formData,

          apiMode: true,
        };

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const response =
          await axios.post(
            "https://revadoobackend.onrender.com/api/admin/shortlinks/create",

            payload,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (
          response.data.success
        ) {
          alert(
            "Shortlink created successfully"
          );

          handleReset();
        }
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to create shortlink"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        bg-white
        p-5
        sm:p-6
      "
      style={{
        borderColor:
          "rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h2
          className="
            text-lg
            sm:text-xl
            font-bold
          "
          style={{
            color: "#111827",
          }}
        >
          Generate Shortlink
        </h2>

        <p
          className="
            text-sm
            mt-2
            leading-relaxed
          "
          style={{
            color: "#6b7280",
          }}
        >
          Create and publish
          multi-provider reward
          shortlinks directly from
          the CMS dashboard.
        </p>
      </div>

      {/* FORM */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-4
        "
      >
        {/* TITLE */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Shortlink Title
          </label>

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Enter shortlink title"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* URL */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Destination URL
          </label>

          <input
            type="text"
            name="originalUrl"
            value={
              formData.originalUrl
            }
            onChange={
              handleChange
            }
            placeholder="https://example.com"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* PROVIDER */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Shortlink Provider
          </label>

          <select
            name="provider"
            value={
              formData.provider
            }
            onChange={
              handleChange
            }
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
              bg-white
            "
          >
            <option value="gplinks">
              GPlinks
            </option>

            <option value="shrinkme">
              ShrinkMe
            </option>

            <option value="exeio">
              Exe.io
            </option>

            <option value="linkvertise">
              Linkvertise
            </option>
          </select>
        </div>

        {/* API KEY */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Provider API Key
          </label>

          <input
            type="text"
            name="apiKey"
            value={
              formData.apiKey
            }
            onChange={
              handleChange
            }
            placeholder="Enter provider API key"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* REWARD */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Reward Amount
          </label>

          <input
            type="number"
            min="0"
            name="reward"
            value={
              formData.reward
            }
            onChange={
              handleChange
            }
            placeholder="Enter reward"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* EXP */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            EXP Reward
          </label>

          <input
            type="number"
            min="0"
            name="expReward"
            value={
              formData.expReward
            }
            onChange={
              handleChange
            }
            placeholder="Enter EXP reward"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* TIMER */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Timer (Seconds)
          </label>

          <input
            type="number"
            min="0"
            name="timer"
            value={
              formData.timer
            }
            onChange={
              handleChange
            }
            placeholder="Enter timer"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* DAILY LIMIT */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Daily Usage Limit
          </label>

          <input
            type="number"
            min="0"
            name="dailyLimit"
            value={
              formData.dailyLimit
            }
            onChange={
              handleChange
            }
            placeholder="Daily chances"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* COOLDOWN */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Cooldown (Minutes)
          </label>

          <input
            type="number"
            min="0"
            name="cooldown"
            value={
              formData.cooldown
            }
            onChange={
              handleChange
            }
            placeholder="Cooldown time"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* CATEGORY */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Category
          </label>

          <input
            type="text"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            placeholder="general"
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
            "
          />
        </div>

        {/* STATUS */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Status
          </label>

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="
              h-12
              rounded-xl
              border
              px-4
              text-sm
              outline-none
              bg-white
            "
          >
            <option value="active">
              Active
            </option>

            <option value="paused">
              Paused
            </option>

            <option value="disabled">
              Disabled
            </option>
          </select>
        </div>

        {/* DESCRIPTION */}

        <div className="flex flex-col gap-2 lg:col-span-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Enter shortlink description"
            className="
              rounded-xl
              border
              p-4
              text-sm
              outline-none
              resize-none
            "
          />
        </div>
      </div>

      {/* BUTTONS */}

      <div
        className="
          flex
          items-center
          justify-end
          gap-3
          mt-6
        "
      >
        <button
          onClick={handleReset}
          className="
            h-11
            px-5
            rounded-xl
            text-sm
            font-semibold
            border
          "
        >
          Reset
        </button>

        <button
          onClick={
            handleSubmit
          }
          disabled={loading}
          className="
            h-11
            px-5
            rounded-xl
            text-sm
            font-semibold
            text-white
          "
          style={{
            background:
              "#f97316",
          }}
        >
          {loading
            ? "Creating..."
            : "Generate Shortlink"}
        </button>
      </div>
    </div>
  );
}

export default Shortlink_generate;