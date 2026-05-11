import {
  useState,
  useEffect,
} from "react";

import Swal from "sweetalert2";

const BASE =
  "https://revadoobackend.onrender.com";

const Toast = Swal.mixin({
  background: "#ffffff",

  color: "#111827",

  customClass: {
    popup: "revadoo-alert",

    title:
      "revadoo-alert-title",

    htmlContainer:
      "revadoo-alert-text",

    confirmButton:
      "revadoo-alert-btn",
  },

  buttonsStyling: false,

  showClass: {
    popup:
      "animate__animated animate__fadeInUp animate__faster",
  },

  hideClass: {
    popup:
      "animate__animated animate__fadeOutDown animate__faster",
  },
});

const ProfileCard = () => {
  const [user, setUser] =
    useState(null);

  const [avatar, setAvatar] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    username,
    setUsername,
  ] = useState("");

  const [saving, setSaving] =
    useState(false);

  /* FETCH USER */

  const fetchUser =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          `${BASE}/api/auth/me`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        const data =
          await res.json();

        const currentUser =
          data?.user;

        if (currentUser) {
          setUser(currentUser);

          setUsername(
            currentUser.username ||
              ""
          );

          setAvatar(
            currentUser.avatar ||
              null
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              currentUser
            )
          );
        }

        setLoading(false);
      } catch (err) {
        console.error(err);

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUser();

    /* LIVE AVATAR SYNC */

    const onAvatar = (e) => {
      setAvatar(
  e.detail.avatar
);

setUser((prev) => ({
  ...prev,
  avatar: e.detail.avatar,
}));
    };

    window.addEventListener(
      "avatarUpdated",
      onAvatar
    );

    return () =>
      window.removeEventListener(
        "avatarUpdated",
        onAvatar
      );
  }, []);

  /* UPDATE USERNAME */

 

const handleUsernameUpdate =
  async () => {
    try {
      /* VALIDATION */

      if (
        !username.trim()
      ) {
        return Toast.fire({
          icon: "warning",

          title:
            "Username Required",

          text: "Please enter a username.",
        });
      }

      if (
        username.trim()
          .length < 3
      ) {
        return Toast.fire({
          icon: "warning",

          title:
            "Invalid Username",

          text: "Username must be at least 3 characters.",
        });
      }

      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      /* SAVE PREVIOUS USERNAME */

      const previousUsername =
        user?.username || "";

      /* API REQUEST */

      const res = await fetch(
        `${BASE}/api/auth/update-username`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            username:
              username.trim(),
          }),
        }
      );

      const data =
        await res.json();

      /* HANDLE ERRORS */

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to update username"
        );
      }

      /* UPDATE USER STATE */

      if (data.user) {
        setUser(data.user);

        setUsername(
          data.user.username
        );

        /* UPDATE LOCAL STORAGE */

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        /* UPDATE HEADER + OTHER COMPONENTS */

        window.dispatchEvent(
          new CustomEvent(
            "userUpdated",
            {
              detail:
                data.user,
            }
          )
        );
      }

      /* PREMIUM SUCCESS ALERT */

      Toast.fire({
        icon: "success",

        title:
          "Identity Updated",
      

        html: `
        <div style="
  text-align:center;
  margin-bottom:6px;
">
  <div style="
    font-size:1.1rem;
    font-weight:800;
    color:#111827;
    letter-spacing:-0.03em;
    margin-bottom:6px;
  ">
    Congrats, your identity is now upgraded ✨
  </div>

  <div style="
    font-size:0.84rem;
    color:#6b7280;
    line-height:1.6;
    font-weight:500;
  ">
    Your new username is now visible across your Revadoo dashboard and profile.
  </div>
</div>
          <div style="
            display:flex;
            flex-direction:column;
            gap:18px;
            margin-top:12px;
          ">

            <div style="
              position:relative;
              overflow:hidden;

              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:14px;

              padding:18px;
              border-radius:26px;

              background:
                linear-gradient(
                  135deg,
                  rgba(255,255,255,0.96),
                  rgba(249,250,251,0.94)
                );

              border:
                1px solid
                rgba(255,107,0,0.08);

              box-shadow:
                0 10px 35px rgba(0,0,0,0.05),
                inset 0 1px 0 rgba(255,255,255,0.7);
            ">

              <!-- GLOW -->

            <!-- TOP RIGHT GLOW -->

<div style="
  position:absolute;
  top:-40px;
  right:-40px;
  width:120px;
  height:120px;
  background:
    radial-gradient(
      circle,
      rgba(255,107,0,0.18),
      transparent 70%
    );
"></div>

<!-- DECORATIVE LINES -->

<div style="
  position:absolute;
  top:14px;
  left:-20px;

  width:140px;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,107,0,0.18),
      transparent
    );

  transform:rotate(-8deg);
"></div>

<div style="
  position:absolute;
  bottom:18px;
  right:-30px;

  width:160px;
  height:1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,140,0,0.18),
      transparent
    );

  transform:rotate(8deg);
"></div>

<div style="
  position:absolute;
  top:50%;
  left:50%;

  width:220px;
  height:220px;

  border-radius:50%;

  border:
    1px solid
    rgba(255,107,0,0.05);

  transform:
    translate(-50%, -50%);
"></div>

              <!-- OLD -->

              <div style="
                position:relative;
                z-index:2;

                display:flex;
                flex-direction:column;
                align-items:flex-start;

                flex:1;
              ">
                <span style="
                  font-size:0.68rem;
                  color:#9ca3af;
                  font-weight:800;
                  text-transform:uppercase;
                  letter-spacing:.14em;
                  margin-bottom:7px;
                ">
                  Previous
                </span>

                <span style="
                  font-size:1rem;
                  font-weight:800;
                  color:#111827;
                  word-break:break-word;
                ">
                  ${previousUsername}
                </span>
              </div>

              <!-- ARROW -->

              <div style="
                position:relative;
                z-index:2;

                width:52px;
                height:52px;
                min-width:52px;

                border-radius:18px;

                background:
                  linear-gradient(
                    135deg,
                    #FF6B00,
                    #FF8C00
                  );

                display:flex;
                align-items:center;
                justify-content:center;

                color:white;

                font-size:1.2rem;
                font-weight:900;

                box-shadow:
                  0 16px 34px rgba(255,107,0,0.32);

                transform:
                  rotate(-2deg);
              ">
                →
              </div>

              <!-- NEW -->

              <div style="
                position:relative;
                z-index:2;

                display:flex;
                flex-direction:column;
                align-items:flex-end;

                flex:1;
              ">
                <span style="
                  font-size:0.68rem;
                  color:#9ca3af;
                  font-weight:800;
                  text-transform:uppercase;
                  letter-spacing:.14em;
                  margin-bottom:7px;
                ">
                  Updated
                </span>

                <span style="
                  font-size:1rem;
                  font-weight:900;
                  color:#FF6B00;
                  word-break:break-word;
                ">
                  ${data.user.username}
                </span>
              </div>

            </div>

          </div>
          <div style="
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;

  margin-top:4px;

  font-size:0.8rem;
  color:#9ca3af;
  font-weight:600;
">

  <span style="
    width:6px;
    height:6px;
    border-radius:50%;
    background:#10b981;
    box-shadow:
      0 0 12px rgba(16,185,129,0.5);
  "></span>

  Synced successfully across your account
</div>
        `,

        confirmButtonText:
          "Perfect",

        timer: 3400,
      });
    } catch (err) {
      console.error(err);

      /* ERROR ALERT */

      Toast.fire({
        
        icon: "error",

        title:
          "Update Failed",

        text:
          err.message ||
          "Something went wrong.",
      });
    } finally {
      setSaving(false);
    }
  };

  const initial = (
    user?.username || "U"
  )
    .charAt(0)
    .toUpperCase();

  const joinedDate =
    user?.createdAt
      ? new Date(
          user.createdAt
        ).toLocaleDateString(
          "en-US",
          {
            month: "long",
            year: "numeric",
          }
        )
      : "—";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

        .pc-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .pc-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: linear-gradient(
            135deg,
            rgba(255,107,0,0.08),
            rgba(255,140,0,0.04)
          );
          border-radius: 20px 20px 60% 60%;
        }

        .pc-input {
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 12px;
  padding: 12px 14px;
  outline: none;

  font-size: 16px;

  font-weight: 500;

  background: #fff;

  transition: all 0.2s ease;
}

        .pc-btn {
          width: 100%;
          border: none;
          background: #FF6B00;
          color: white;
          border-radius: 12px;
          padding: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }

        .pc-btn:hover {
          opacity: 0.92;
        }
        
        .revadoo-alert {
  border-radius: 24px !important;
  padding: 1.5rem !important;
  box-shadow:
    0 24px 70px rgba(0,0,0,0.18) !important;
  border: 1px solid rgba(255,107,0,0.08) !important;
  font-family: 'DM Sans', sans-serif !important;
}

.revadoo-alert-title {
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  color: #111827 !important;
  letter-spacing: -0.03em !important;
}

.revadoo-alert-text {
  font-size: 0.92rem !important;
  color: #6b7280 !important;
  font-weight: 500 !important;
  line-height: 1.5 !important;
}

.revadoo-alert-btn {
  background: linear-gradient(
    135deg,
    #ff6b00,
    #ff8c00
  ) !important;

  color: white !important;

  border: none !important;

  border-radius: 14px !important;

  padding: 12px 22px !important;

  font-size: 0.92rem !important;

  font-weight: 700 !important;

  transition: all 0.2s ease !important;

  box-shadow:
    0 10px 24px
    rgba(255,107,0,0.24) !important;
}

.revadoo-alert-btn:hover {
  transform: translateY(-1px);
  opacity: 0.96;
}

.swal2-icon {
  transform: scale(0.88);
  border-width: 3px !important;
}

.swal2-success-ring,
.swal2-success-fix {
  background: transparent !important;
}

@media (max-width: 640px) {
  .revadoo-alert {
    width: 90% !important;
    padding: 1.2rem !important;
  }

  .revadoo-alert-title {
    font-size: 1rem !important;
  }

  .revadoo-alert-text {
    font-size: 0.85rem !important;
  }
}
      `}</style>

      <div className="pc-card">
        {/* AVATAR */}

        <div
          style={{
            position:
              "relative",

            width: 100,

            height: 100,

            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 100,

              height: 100,

              borderRadius:
                "50%",

              border:
                "3.5px solid #FF6B00",

              overflow:
                "hidden",

              background:
                "linear-gradient(135deg,#FF6B00,#FF8C00)",

              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              boxShadow:
                "0 4px 20px rgba(255,107,0,0.22)",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: 40,

                  height: 40,

                  borderRadius:
                    "50%",

                  background:
                    "rgba(255,255,255,0.2)",
                }}
              />
            ) : avatar ? (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "100%",

                  height:
                    "100%",

                  objectFit:
                    "cover",
                }}
              />
            ) : (
              <span
                style={{
                  color:
                    "#fff",

                  fontWeight: 700,

                  fontSize:
                    "2.2rem",

                  fontFamily:
                    "'Bebas Neue', sans-serif",
                }}
              >
                {initial}
              </span>
            )}
          </div>
        </div>

        {/* USERNAME */}

        {loading ? (
          <div
            style={{
              height: 32,

              width: 120,

              borderRadius: 8,

              background:
                "#f0f0f0",

              marginBottom: 12,
            }}
          />
        ) : (
          <>
            <h2
              style={{
                fontFamily:
                  "'Bebas Neue', sans-serif",

                fontSize:
                  "2rem",

                letterSpacing:
                  "0.06em",

                color:
                  "#0a0a0a",

                margin:
                  "0 0 16px",

                lineHeight: 1,
              }}
            >
              {user?.username ||
                "User"}
            </h2>

            {/* CHANGE USERNAME */}

            <div
              style={{
                width: "100%",

                display: "flex",

                flexDirection:
                  "column",

                gap: 10,

                marginBottom: 18,
              }}
            >
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                placeholder="Username"
                className="pc-input"
              />

              <button
                onClick={
                  handleUsernameUpdate
                }
                disabled={saving}
                className="pc-btn"
              >
                {saving
                  ? "Saving..."
                  : "Update Username"}
              </button>
            </div>
          </>
        )}

        {/* EMAIL */}

        <div
          style={{
            width: "100%",

            background:
              "#fafafa",

            border:
              "1px solid #f0f0f0",

            borderRadius: 14,

            padding:
              "14px 16px",

            marginBottom: 18,
          }}
        >
          <p
            style={{
              fontSize:
                "0.72rem",

              color:
                "#999",

              marginBottom: 6,

              textTransform:
                "uppercase",

              fontWeight: 700,
            }}
          >
            Email
          </p>

          <p
            style={{
              fontSize:
                "0.92rem",

              color:
                "#222",

              fontWeight: 600,
            }}
          >
            {user?.email ||
              "No Email"}
          </p>
        </div>

        {/* JOINED */}

        <div
          style={{
            fontSize:
              "0.78rem",

            color:
              "#FF6B00",

            fontWeight: 700,
          }}
        >
          Joined {joinedDate}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;