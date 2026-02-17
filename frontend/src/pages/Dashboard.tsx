// pages/Dashboard.tsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import SuperAdminDashboard from "./dashboards/SuperAdminDashboard";
import OrgAdminDashboard from "./dashboards/OrgAdminDashboard";
import SecurityAnalystDashboard from "./dashboards/SecurityAnalystDashboard";
import DevOpsDashboard from "./dashboards/DevOpsDashboard";
import AIAnalystDashboard from "./dashboards/AIAnalystDashboard";
import ViewerDashboard from "./dashboards/ViewerDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case "super_admin":
        return <SuperAdminDashboard />;
      case "org_admin":
        return <OrgAdminDashboard />;
      case "security_analyst":
        return <SecurityAnalystDashboard />;
      case "devops_engineer":
        return <DevOpsDashboard />;
      case "ai_analyst":
        return <AIAnalystDashboard />;
      case "viewer":
        return <ViewerDashboard />;
      default:
        return <SecurityAnalystDashboard />;
    }
  };

  return renderDashboard();
};

export default Dashboard;
