import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import UserProtectedRoute from "./routes/UserProtectedRoute";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import Infopage from "./pages/Infopage";
import NotFoundPage from "./pages/NotFoundPage";

import Privacy from "./pages/Importantpages/Privacy";
import TermsConditions from "./pages/Importantpages/Termandcondition";

import DashboardPage from "./pages/userdashboard/DashboardPage";
import DashboardWallet from "./pages/userdashboard/DashboardWallet";
import DashboardGames from "./pages/userdashboard/DashboardGames";
import DashboardSurveys from "./pages/userdashboard/DashboardSurveys";
import DashboardTasks from "./pages/userdashboard/DashboardTasks";
import DashboardLeaderboard from "./pages/userdashboard/DashboardLeaderboard";
import DashboardReferrals from "./pages/userdashboard/DashboardReferrals";
import DashboardSettings from "./pages/userdashboard/DashboardSettings";
import DashboardProfile from "./pages/userdashboard/DashboardProfile";
import DashboardDailyRewards from "./pages/userdashboard/DashboardDailyRewards";
import DashboardInstanttask from "./pages/userdashboard/DashboardInstanttask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<PublicLayout />}
        >
          <Route
            index
            element={<LandingPage />}
          />

          <Route
            path="about"
            element={<AboutPage />}
          />

          <Route
            path="contact"
            element={<ContactPage />}
          />

          <Route
            path="infopage"
            element={<Infopage />}
          />

          <Route
            path="privacy"
            element={<Privacy />}
          />

          <Route
            path="terms"
            element={
              <TermsConditions />
            }
          />

          <Route
            path="authpage"
            element={<AuthPage />}
          />
        </Route>

        {/* DASHBOARD ROUTES */}

        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <DashboardLayout />
            </UserProtectedRoute>
          }
        >
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="wallet"
            element={
              <DashboardWallet />
            }
          />

          <Route
            path="games"
            element={
              <DashboardGames />
            }
          />

          <Route
            path="surveys"
            element={
              <DashboardSurveys />
            }
          />

          <Route
  path="tasks"
  element={<DashboardTasks />}
/>

<Route
  path="tasks/:category"
  element={<DashboardTasks />}
/>

          {/* DAILY REWARDS */}

          <Route
            path="daily-rewards"
            element={
              <DashboardDailyRewards />
            }
          />

          {/* INSTANT TASKS */}

          <Route
            path="instant-tasks"
            element={
              <DashboardInstanttask />
            }
          />

          <Route
            path="leaderboard"
            element={
              <DashboardLeaderboard />
            }
          />

          <Route
            path="referrals"
            element={
              <DashboardReferrals />
            }
          />

  

          <Route
            path="settings"
            element={
              <DashboardSettings />
            }
          />

          <Route
            path="profile"
            element={
              <DashboardProfile />
            }
          />
        </Route>

        {/* NOT FOUND */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;