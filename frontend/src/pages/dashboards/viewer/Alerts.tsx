// pages/Alerts.tsx
import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  RefreshCw,
} from "lucide-react";
import { alertApi } from "../../../services/api";

interface Alert {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "acknowledged" | "resolved";
  source: string;
  time: string;
  description: string;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const params: any = { status: statusFilter };
      if (severityFilter !== "all") params.severity = severityFilter;
      const response = await alertApi.getAlerts(params);
      setAlerts(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [severityFilter, statusFilter]);

  const handleAcknowledge = async (alertId: string) => {
    try {
      await alertApi.acknowledgeAlert(alertId);
      fetchAlerts(); // refresh
    } catch (error) {
      console.error("Failed to acknowledge alert:", error);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "high":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-red-500/20 text-red-300",
      acknowledged: "bg-yellow-500/20 text-yellow-300",
      resolved: "bg-green-500/20 text-green-300",
    };
    return (
      colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-300"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Alerts</h1>
          <p className="text-blue-200 mt-1">Security and system alerts</p>
        </div>
        <button
          onClick={fetchAlerts}
          className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          <RefreshCw className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-12 text-center text-gray-400">
            No alerts found
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-gray-800/50 rounded-xl p-5 border-l-4 border-l-red-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div>
                    <h3 className="text-white font-semibold">{alert.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {alert.description}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Source: {alert.source}</span>
                      <span>Time: {new Date(alert.time).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusBadge(alert.status)}`}
                  >
                    {alert.status}
                  </span>
                  {alert.status === "active" && (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1 bg-blue-600 rounded text-white text-sm hover:bg-blue-700"
                    >
                      Acknowledge
                    </button>
                  )}
                  {alert.status === "acknowledged" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
