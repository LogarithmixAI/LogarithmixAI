// pages/dashboards/ViewerDashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  BarChart3,
  FileText,
  Download,
  Filter,
  Activity,
  Users,
  Shield,
  Server,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { viewerApi } from "../../../services/api";

const ViewerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [popularDashboards, setPopularDashboards] = useState<any[]>([]);
  const [quickView, setQuickView] = useState<any>({});
  const [timeRange, setTimeRange] = useState("24h");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // ✅ Add null checks and default values
      const statsRes = await viewerApi.getStats().catch((err) => {
        console.error("Stats API error:", err);
        return null;
      });
      const reportsRes = await viewerApi.getReports().catch((err) => {
        console.error("Reports API error:", err);
        return [];
      });
      const dashboardsRes = await viewerApi
        .getPopularDashboards()
        .catch((err) => {
          console.error("Dashboards API error:", err);
          return [];
        });
      const quickViewRes = await viewerApi.getQuickView().catch((err) => {
        console.error("QuickView API error:", err);
        return {};
      });

      // ✅ Use fallback values if response is null/undefined
      const statsData = statsRes
        ? [
            {
              label: "Total Logs",
              value: statsRes.totalLogs || "0",
              change: statsRes.changes?.totalLogs || "0%",
              icon: FileText,
              color: "from-blue-500 to-cyan-600",
            },
            {
              label: "Active Sources",
              value: statsRes.activeSources || 0,
              change: statsRes.changes?.activeSources || "0",
              icon: Server,
              color: "from-green-500 to-emerald-600",
            },
            {
              label: "Reports Available",
              value: statsRes.reportsAvailable || 0,
              change: statsRes.changes?.reportsAvailable || "0",
              icon: BarChart3,
              color: "from-purple-500 to-violet-600",
            },
            {
              label: "Uptime",
              value: statsRes.uptime || "0%",
              change: statsRes.changes?.uptime || "0%",
              icon: Activity,
              color: "from-orange-500 to-red-600",
            },
          ]
        : [
            {
              label: "Total Logs",
              value: "0",
              change: "0%",
              icon: FileText,
              color: "from-blue-500 to-cyan-600",
            },
            {
              label: "Active Sources",
              value: 0,
              change: "0",
              icon: Server,
              color: "from-green-500 to-emerald-600",
            },
            {
              label: "Reports Available",
              value: 0,
              change: "0",
              icon: BarChart3,
              color: "from-purple-500 to-violet-600",
            },
            {
              label: "Uptime",
              value: "0%",
              change: "0%",
              icon: Activity,
              color: "from-orange-500 to-red-600",
            },
          ];

      setStats(statsData);
      setReports(Array.isArray(reportsRes) ? reportsRes : []);
      setPopularDashboards(Array.isArray(dashboardsRes) ? dashboardsRes : []);
      setQuickView(quickViewRes || {});
    } catch (error) {
      console.error("Failed to fetch viewer data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format = "csv") => {
    setExporting(true);
    try {
      const blob = await viewerApi.exportData({
        type: "logs",
        format,
        timeRange,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export_logs_${new Date().toISOString()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <div className="relative bg-gray-900 p-6 rounded-full">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Viewer Dashboard
          </h1>
          <p className="text-blue-200">
            Welcome back, {user?.name} – read-only access
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleExport("csv")}
            disabled={exporting}
            className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl text-white font-medium flex items-center space-x-2 hover:from-gray-700 hover:to-gray-800 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{exporting ? "Exporting..." : "Export Data"}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
              <span className="text-green-400 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">
              Available Reports
            </h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="space-y-4">
            {reports.map((report, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{report.name}</h3>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400">{report.type}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{report.size}</span>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Dashboards */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Popular Dashboards
          </h2>
          <div className="space-y-4">
            {popularDashboards.map((dash, idx) => (
              <div key={idx} className="p-4 bg-gray-800/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{dash.name}</h3>
                  <span className="text-sm text-gray-400">
                    {dash.views} views
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Updated {dash.lastUpdated}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300">
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
            <p className="text-sm text-white text-center">
              <Eye className="w-4 h-4 inline mr-1" />
              You have read-only access
            </p>
          </div>
        </div>
      </div>

      {/* Quick View with Time Range Selector */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Quick View</h2>
          <div className="flex items-center space-x-2">
            {["24h", "7d", "30d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  timeRange === range
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {range === "24h" ? "Today" : range === "7d" ? "Week" : "Month"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Log Volume</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {quickView.logVolume || "0"}
            </p>
            <p className="text-xs text-gray-400">
              {quickView.changes?.logVolume || "0%"} from last period
            </p>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {quickView.activeUsers || 0}
            </p>
            <p className="text-xs text-gray-400">
              Peak: {Math.round((quickView.activeUsers || 0) * 1.2)}
            </p>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Security Events</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {quickView.securityEvents || 0}
            </p>
            <p className="text-xs text-gray-400">
              Last{" "}
              {timeRange === "24h"
                ? "24 hours"
                : timeRange === "7d"
                  ? "7 days"
                  : "30 days"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerDashboard;
