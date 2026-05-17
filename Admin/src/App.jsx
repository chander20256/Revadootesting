import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

import ProtectedRoute from "./components/ProtectedRoute";

// ADMIN DASHBOARD PAGES

import AdminUsers from "./pages/admin_dashboard/AdminUsers";

import Creds_claim from "./pages/admin_dashboard/Creds_claim";

import Lucky_draw from "./pages/admin_dashboard/Lucky_draw";

// CMS

import CMS_AdsManager from "./pages/CMS_dashboard/CMS_AdsManager";

import CMS_Shortlinks from "./pages/CMS_dashboard/CMS_Shortlinks";

import CMS_PTCAds from "./pages/CMS_dashboard/CMS_PTCAds";

import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}

        <Route
          path="/"
          element={
            <LoginPage />
          }
        />

        {/* ADMIN DASHBOARD */}

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
            element={
              <AdminUsers />
            }
          />

          {/* USERS */}

          <Route
            path="users"
            element={
              <AdminUsers />
            }
          />

          {/* CREDS CODES */}

          <Route
            path="credscodes"
            element={
              <Creds_claim />
            }
          />

          {/* LUCKY DRAW */}

          <Route
            path="lucky-draw"
            element={
              <Lucky_draw />
            }
          />

          {/* ADS MANAGER */}

          <Route
            path="ads"
            element={
              <CMS_AdsManager />
            }
          />

          {/* CMS SHORTLINKS */}

          <Route
            path="cms/shortlinks"
            element={
              <CMS_Shortlinks />
            }
          />

          {/* CMS PTC ADS */}

          <Route
            path="cms/ptc-ads"
            element={
              <CMS_PTCAds />
            }
          />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;