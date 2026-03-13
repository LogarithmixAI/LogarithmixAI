// components/common/Layout/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  BarChart3,
  Settings,
  Users,
  Shield,
  Brain,
  FileText,
  Globe,
  Bell,
  TrendingUp,
  Cpu,
  Server,
  Lock,
  Eye,
  Code,
  Key,
  X,
  Database,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { path: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/app/logs", icon: Activity, label: "Live Logs" },
      { path: "/app/analytics", icon: BarChart3, label: "Analytics" },
      { path: "/app/alerts", icon: AlertTriangle, label: "Alerts" },
    ];

    const roleSpecificItems: Record<string, any[]> = {
      super_admin: [
        { path: "/admin/organizations", icon: Globe, label: "Organizations" },
        { path: "/admin/users", icon: Users, label: "Users" },
        { path: "/admin/system", icon: Server, label: "System" },
        { path: "/admin/billing", icon: Database, label: "Billing" },
        { path: "/app/ai-insights", icon: Brain, label: "AI Insights" },
        { path: "/app/settings", icon: Settings, label: "Settings" },
      ],
      org_admin: [
        { path: "/app/team", icon: Users, label: "Team" },
        { path: "/app/integrations", icon: Globe, label: "Integrations" },
        { path: "/app/api-keys", icon: Key, label: "API Keys" },
        { path: "/app/ai-insights", icon: Brain, label: "AI Insights" },
        { path: "/app/settings", icon: Settings, label: "Settings" },
      ],
      security_analyst: [
        { path: "/app/threats", icon: Shield, label: "Threats" },
        { path: "/app/incidents", icon: AlertTriangle, label: "Incidents" },
        { path: "/app/compliance", icon: Lock, label: "Compliance" },
        { path: "/app/reports", icon: FileText, label: "Reports" },
        { path: "/app/ai-insights", icon: Brain, label: "AI Insights" },
      ],
      devops_engineer: [
        { path: "/app/services", icon: Server, label: "Services" },
        { path: "/app/containers", icon: Cpu, label: "Containers" },
        { path: "/app/network", icon: Globe, label: "Network" },
        { path: "/app/deployments", icon: Code, label: "Deployments" },
      ],
      ai_analyst: [
        { path: "/app/models", icon: Brain, label: "Models" },
        { path: "/app/insights", icon: TrendingUp, label: "Insights" },
        { path: "/app/training", icon: Cpu, label: "Training" },
        { path: "/app/anomalies", icon: Activity, label: "Anomalies" },
      ],
      viewer: [
        { path: "/app/reports", icon: FileText, label: "Reports" },
        { path: "/app/dashboards", icon: LayoutDashboard, label: "Dashboards" },
      ],
    };

    return [...baseItems, ...(roleSpecificItems[user?.role || "viewer"] || [])];
  };

  const menuItems = getMenuItems();

  // Handle menu item click - only close on mobile
  const handleMenuItemClick = () => {
    // Check if we're on mobile (window width < 1024px)
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 z-50 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transform-none lg:top-16 lg:h-[calc(100vh-4rem)]`}
      >
        <div className="flex flex-col h-full">
          {/* Close button - mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* User info - mobile only */}
          <div className="lg:hidden p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={
                    item.path === "/app/dashboard" ||
                    item.path === "/admin/dashboard"
                  }
                  onClick={handleMenuItemClick} // Only closes on mobile
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-2">Need help?</p>
              <a
                href="/docs"
                className="block w-full text-xs text-blue-400 hover:text-blue-300 transition-colors text-center"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
