// pages/dashboards/ViewerDashboard.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  BarChart3,
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  PieChart,
  Activity,
  Clock,
  Shield,
  Users,
  Server,
  Globe,
} from "lucide-react";

const ViewerDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Logs",
      value: "2.3M",
      change: "+15%",
      icon: FileText,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Active Sources",
      value: "24",
      change: "+3",
      icon: Server,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Reports Available",
      value: "18",
      change: "+2",
      icon: BarChart3,
      color: "from-purple-500 to-violet-600",
    },
    {
      label: "Uptime",
      value: "99.99%",
      change: "0%",
      icon: Activity,
      color: "from-orange-500 to-red-600",
    },
  ];

  const recentReports = [
    {
      name: "Security Audit Q1 2024",
      type: "Security",
      date: "2024-03-15",
      size: "2.4 MB",
    },
    {
      name: "Application Performance",
      type: "Performance",
      date: "2024-03-14",
      size: "1.8 MB",
    },
    {
      name: "User Activity Analysis",
      type: "Analytics",
      date: "2024-03-13",
      size: "3.1 MB",
    },
    {
      name: "Compliance Report",
      type: "Compliance",
      date: "2024-03-12",
      size: "4.2 MB",
    },
  ];

  const topDashboards = [
    { name: "System Overview", views: 234, lastUpdated: "5 min ago" },
    { name: "Security Monitoring", views: 189, lastUpdated: "2 min ago" },
    { name: "Application Metrics", views: 156, lastUpdated: "10 min ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Viewer Dashboard
          </h1>
          <p className="text-blue-200">
            Read-only access to dashboards and reports
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl text-white font-medium flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
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
            {recentReports.map((report, index) => (
              <div
                key={index}
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
            {topDashboards.map((dashboard, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{dashboard.name}</h3>
                  <span className="text-sm text-gray-400">
                    {dashboard.views} views
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Updated {dashboard.lastUpdated}
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

      {/* Time Range Selector */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Quick View</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-white hover:bg-gray-700 transition-colors">
              Today
            </button>
            <button className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-white hover:bg-gray-700 transition-colors">
              Week
            </button>
            <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm text-white">
              Month
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Log Volume</span>
            </div>
            <p className="text-2xl font-bold text-white">2.3M</p>
            <p className="text-xs text-gray-400">+12% from last month</p>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-white">1,234</p>
            <p className="text-xs text-gray-400">Peak: 2,100</p>
          </div>
          <div className="p-4 bg-gray-800/30 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Security Events</span>
            </div>
            <p className="text-2xl font-bold text-white">45</p>
            <p className="text-xs text-gray-400">Last 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerDashboard;
