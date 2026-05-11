const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_USER_KEY = "adminUser";

const API_URL = "https://revadoobackend.onrender.com";

/* -----------------------------
   DEFAULT ADMIN (OPTIONAL)
----------------------------- */
export const ADMIN_CREDENTIALS = {
  email: "admin@revadoo.com",
  password: "Admin@12345",
};

/* -----------------------------
   TOKEN HELPERS
----------------------------- */
export const getAdminToken = () =>
  localStorage.getItem(ADMIN_TOKEN_KEY);

export const isAdminAuthenticated = () => {
  const token = getAdminToken();
  return Boolean(token);
};

/* -----------------------------
   LOGIN ADMIN (FIXED URL)
----------------------------- */
export const loginAdmin = async ({ email, password }) => {
  const response = await fetch(
    `${API_URL}/api/admin/auth/login`, // ✅ FIXED
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Admin login failed");
  }

  // ✅ Store token
  localStorage.setItem(ADMIN_TOKEN_KEY, data.token);

  // optional (for reuse in user APIs)
  localStorage.setItem("token", data.token);

  // ✅ Store user
  localStorage.setItem(
    ADMIN_USER_KEY,
    JSON.stringify(data.user)
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  return data.user;
};

/* -----------------------------
   GET CURRENT ADMIN (/me)
----------------------------- */
export const fetchAdminProfile = async () => {
  const token = getAdminToken();

  if (!token) throw new Error("No token found");

  const res = await fetch(
    `${API_URL}/api/admin/auth/me`, // ✅ FIXED
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch admin");
  }

  return data.user;
};

/* -----------------------------
   LOGOUT
----------------------------- */
export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};