// pages/Logs.tsx
import React, { useState, useEffect } from "react";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import { logApi } from "../../../services/api";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  severity: "info" | "warning" | "error" | "critical";
  message: string;
  user_id?: string;
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (severityFilter !== "all") params.severity = severityFilter;
      if (sourceFilter !== "all") params.source = sourceFilter;
      const response = await logApi.getLogs(params);
      // Assume response.data is array of logs
      setLogs(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [searchTerm, severityFilter, sourceFilter]);

  const handleExport = async () => {
    try {
      const blob = await logApi.exportLogs({
        format: "csv",
        ...(searchTerm && { search: searchTerm }),
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `logs_${new Date().toISOString()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      info: "bg-blue-500/20 text-blue-300",
      warning: "bg-yellow-500/20 text-yellow-300",
      error: "bg-orange-500/20 text-orange-300",
      critical: "bg-red-500/20 text-red-300",
    };
    return (
      colors[severity as keyof typeof colors] || "bg-gray-500/20 text-gray-300"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Logs</h1>
          <p className="text-blue-200 mt-1">Real‑time log monitoring</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchLogs}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <RefreshCw className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 rounded-xl p-4 flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />
        </div>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2"
        >
          <option value="all">All Severities</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="critical">Critical</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-2"
        >
          <option value="all">All Sources</option>
          <option value="api-gateway">API Gateway</option>
          <option value="auth-service">Auth Service</option>
          <option value="database">Database</option>
          <option value="ai-processor">AI Processor</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300">Timestamp</th>
                <th className="text-left p-4 text-gray-300">Source</th>
                <th className="text-left p-4 text-gray-300">Severity</th>
                <th className="text-left p-4 text-gray-300">Message</th>
                <th className="text-left p-4 text-gray-300">User ID</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    Loading logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-gray-700 hover:bg-gray-700/30"
                  >
                    <td className="p-4 text-gray-300 font-mono text-sm">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 text-white">{log.source}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getSeverityBadge(log.severity)}`}
                      >
                        {log.severity}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{log.message}</td>
                    <td className="p-4 text-gray-400">{log.user_id || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;
