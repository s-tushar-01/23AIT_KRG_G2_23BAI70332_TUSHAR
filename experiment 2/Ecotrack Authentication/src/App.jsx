import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardSummary from "./pages/DashboardSummary";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Logs from "./pages/Logs";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/summary"
          element={
            <ProtectedRoute>
              <DashboardSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute>
              <DashboardAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
