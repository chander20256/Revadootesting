import React, {
  useState,
} from "react";

import axios from "axios";

function Shortlink_generate() {
  const [
    useDeveloperApi,
    setUseDeveloperApi,
  ] = useState(false);

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

      provider: "internal",

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

      provider: "internal",

      apiKey: "",
    });

    setUseDeveloperApi(false);
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

          apiMode:
            useDeveloperApi,
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
          Create and publish new
          shortlinks directly from
          the CMS dashboard.
        </p>
      </div>

      {/* TOGGLE */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          rounded-2xl
          border
          p-4
          mb-6
        "
        style={{
          borderColor:
            "rgba(0,0,0,0.08)",

          background:
            "#fafafa",
        }}
      >
        <div>
          <h3
            className="
              text-sm
              sm:text-base
              font-semibold
            "
            style={{
              color: "#111827",
            }}
          >
            Developer API Mode
          </h3>

          <p
            className="
              text-xs
              mt-1
              leading-relaxed
            "
            style={{
              color: "#6b7280",
            }}
          >
            Enable external
            provider integration
            using API keys.
          </p>
        </div>

        <button
          onClick={() =>
            setUseDeveloperApi(
              !useDeveloperApi
            )
          }
          className={`
            relative
            w-14
            h-8
            rounded-full
            transition-all
            duration-300
            ${
              useDeveloperApi
                ? "bg-orange-500"
                : "bg-gray-300"
            }
          `}
        >
          <div
            className={`
              absolute
              top-1
              w-6
              h-6
              rounded-full
              bg-white
              transition-all
              duration-300
              ${
                useDeveloperApi
                  ? "left-7"
                  : "left-1"
              }
            `}
          />
        </button>
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

        {/* API KEY */}

        {useDeveloperApi && (
          <div className="flex flex-col gap-2 lg:col-span-2">
            <label
              className="
                text-sm
                font-semibold
              "
            >
              Developer API Key
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
              placeholder="Enter API key"
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
        )}

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

        {/* TIMER */}

        <div className="flex flex-col gap-2">
          <label
            className="
              text-sm
              font-semibold
            "
          >
            Timer
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
            placeholder="Enter daily chances"
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
            "
          >
            <option value="active">
              Active
            </option>

            <option value="paused">
              Paused
            </option>
          </select>
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