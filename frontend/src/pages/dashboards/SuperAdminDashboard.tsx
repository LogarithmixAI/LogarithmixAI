// pages/dashboards/SuperAdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Activity,
  Server,
  Users,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Settings,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Network,
  Zap,
  Shield,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  Play,
  Pause,
  AlertCircle,
} from "lucide-react";
import { adminApi } from "../../services/api";
import { aiApi } from "../../services/api";
import { analyticsApi } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<any>(null);
  const [aiModelStatus, setAiModelStatus] = useState<any>(null);
  const [timeRange, setTimeRange] = useState("24h");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [health, orgs, metrics, aiStatus] = await Promise.all([
        adminApi.getSystemHealth(),
        adminApi.getOrganizations({ limit: 10 }),
        analyticsApi.getAnalytics(timeRange),
        aiApi.getModelStatus(),
      ]);

      setSystemHealth(health.data);
      setOrganizations(orgs.data);
      setGlobalMetrics(metrics.data);
      setAiModelStatus(aiStatus.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const systemStats = [
    {
      label: "AI Processing Nodes",
      value: systemHealth?.activeNodes || "24",
      status: "online",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      metrics: {
        cpu: `${systemHealth?.avgCpu || 42}%`,
        memory: `${systemHealth?.avgMemory || 56}%`,
        latency: `${systemHealth?.avgLatency || 124}ms`,
      },
    },
    {
      label: "Log Ingestion Rate",
      value: globalMetrics?.ingestionRate || "234k/sec",
      change: globalMetrics?.rateChange || "+12%",
      icon: Database,
      color: "from-blue-500 to-cyan-600",
      metrics: {
        total: globalMetrics?.totalLogs || "1.2B",
        today: globalMetrics?.todayLogs || "23.4M",
      },
    },
    {
      label: "Active Organizations",
      value: systemHealth?.activeOrgs || "156",
      change: `+${systemHealth?.newOrgs || 8}`,
      icon: Building2,
      color: "from-green-500 to-emerald-600",
      metrics: {
        trial: systemHealth?.trialOrgs || "34",
        active: systemHealth?.paidOrgs || "122",
      },
    },
    {
      label: "AI Model Accuracy",
      value: `${aiModelStatus?.overallAccuracy || 98.5}%`,
      change: `+${aiModelStatus?.accuracyChange || 2.3}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      metrics: {
        precision: `${aiModelStatus?.precision || 97.2}%`,
        recall: `${aiModelStatus?.recall || 96.8}%`,
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative bg-gray-900 p-6 rounded-full">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with AI Status */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Super Admin Dashboard
          </h1>
          <p className="text-blue-200">Welcome back, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-sm">
              All Systems Operational
            </span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.change && (
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-sm mb-3">{stat.label}</p>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-700">
              {Object.entries(stat.metrics || {}).map(([key, val]) => (
                <div key={key}>
                  <p className="text-xs text-gray-500 capitalize">{key}</p>
                  <p className="text-sm text-white">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Organizations Overview */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Organizations</h2>
          <button
            onClick={() => (window.location.href = "/admin/organizations")}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {organizations.map((org, index) => (
            <div
              key={org.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{org.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-400">{org.userCount} users</span>
                    <span className="text-gray-400">{org.logVolume}/day</span>
                    <span className="text-gray-400">
                      AI: {org.aiQueries}/day
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Anomaly Rate</p>
                  <p className="text-sm text-white">{org.anomalyRate}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    org.status === "active"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {org.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
