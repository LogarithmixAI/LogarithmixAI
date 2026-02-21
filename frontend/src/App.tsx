// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/common/Layout/MainLayout";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import "./index.css";

// Role-based route protection
interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gray-900 p-6 rounded-full">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="mt-6 text-blue-300 font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected app routes - all under /app/* */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Logs - accessible by multiple roles */}
            <Route
              path="logs"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "super_admin",
                    "org_admin",
                    "security_analyst",
                    "devops_engineer",
                  ]}
                >
                  <Logs />
                </ProtectedRoute>
              }
            />

            {/* Analytics - accessible by most roles */}
            <Route
              path="analytics"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "super_admin",
                    "org_admin",
                    "security_analyst",
                    "ai_analyst",
                    "viewer",
                  ]}
                >
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Alerts - security focused */}
            <Route
              path="alerts"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "super_admin",
                    "org_admin",
                    "security_analyst",
                    "devops_engineer",
                  ]}
                >
                  <Alerts />
                </ProtectedRoute>
              }
            />

            {/* AI Insights - for AI analysts and security */}
            <Route
              path="ai-insights"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "super_admin",
                    "ai_analyst",
                    "security_analyst",
                  ]}
                >
                  <AIInsights />
                </ProtectedRoute>
              }
            />

            {/* Settings - admin only */}
            <Route
              path="settings"
              element={
                <ProtectedRoute allowedRoles={["super_admin", "org_admin"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Profile - accessible by all authenticated users */}
            <Route path="profile" element={<div>Profile Page</div>} />
          </Route>

          {/* Super Admin specific routes (optional - can also be under /app) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["super_admin"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<div>User Management</div>} />
            <Route
              path="organizations"
              element={<div>Organization Management</div>}
            />
            <Route path="billing" element={<div>Billing</div>} />
            <Route path="system" element={<div>System Settings</div>} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
