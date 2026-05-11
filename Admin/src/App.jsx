import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin dashboard pages
import AdminUsers from "./pages/admin_dashboard/AdminUsers";
import Creds_claim from "./pages/admin_dashboard/Creds_claim";

// CMS
import CMS_AdsManager from "./pages/CMS_dashboard/CMS_AdsManager";

import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Login Page */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        {/* ✅ Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT */}

          <Route
            index
            element={<AdminUsers />}
          />

          {/* USERS */}

          <Route
            path="users"
            element={<AdminUsers />}
          />

          {/* CREDS CODES */}

          <Route
            path="credscodes"
            element={<Creds_claim />}
          />

          {/* ADS MANAGER */}

          <Route
            path="ads"
            element={<CMS_AdsManager />}
          />
        </Route>

        {/* ✅ 404 */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;