// pages/Logs.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { logApi } from "../../../services/api";
import { useService } from "../../../contexts/ServiceContext";
import ServiceSelector from "../../../components/ServiceSelector";

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  severity: "info" | "warning" | "error" | "critical";
  message: string;
  user_id?: string;
}

const FASTAPI_BASE = "http://localhost:8000";
const WS_BASE = "ws://localhost:8000";

const Logs: React.FC = () => {
  const { currentService } = useService();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [liveEnabled, setLiveEnabled] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const formatLog = (raw: any): LogEntry => ({
    id: raw._id || crypto.randomUUID(),
    timestamp: raw.timestamp,
    source: raw.service || raw.source,
    severity: mapSeverity(raw.level || raw.severity),
    message: raw.message,
    user_id: raw.user_id,
  });

  const mapSeverity = (level: string): LogEntry["severity"] => {
    const l = level.toLowerCase();
    if (l === "error") return "error";
    if (l === "critical") return "critical";
    if (l === "warn" || l === "warning") return "warning";
    return "info";
  };

  const fetchLogs = useCallback(async () => {
    if (!currentService) {
      setLogs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const url = `${FASTAPI_BASE}/api/logs/${currentService}`;
      const response = await fetch(url);
      const data = await response.json();
      let rawLogs = data.logs || [];
      // client-side filtering
      if (searchTerm) {
        rawLogs = rawLogs.filter((log: any) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }
      if (severityFilter !== "all") {
        rawLogs = rawLogs.filter(
          (log: any) => mapSeverity(log.level) === severityFilter,
        );
      }
      setLogs(rawLogs.map(formatLog));
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  }, [currentService, searchTerm, severityFilter]);

  const setupWebSocket = useCallback(() => {
    if (!liveEnabled || !currentService) {
      if (wsRef.current) wsRef.current.close();
      setWsConnected(false);
      return;
    }
    const wsUrl = `${WS_BASE}/ws/logs/${currentService}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onopen = () => {
      console.log(`WebSocket connected for ${currentService}`);
      setWsConnected(true);
    };
    ws.onmessage = (event) => {
      try {
        const newLogsRaw = JSON.parse(event.data);
        if (Array.isArray(newLogsRaw) && newLogsRaw.length > 0) {
          const newFormatted = newLogsRaw.map(formatLog);
          setLogs((prev) => {
            const existingIds = new Set(prev.map((l) => l.id));
            const uniqueNew = newFormatted.filter(
              (l) => !existingIds.has(l.id),
            );
            return [...uniqueNew, ...prev].slice(0, 500);
          });
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsConnected(false);
    };
    ws.onclose = () => {
      console.log("WebSocket closed");
      setWsConnected(false);
    };
  }, [liveEnabled, currentService]);

  useEffect(() => {
    if (!liveEnabled) {
      fetchLogs();
    }
  }, [fetchLogs, liveEnabled]);

  useEffect(() => {
    setupWebSocket();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [setupWebSocket]);

  const handleExport = async () => {
    try {
      const blob = await logApi.exportLogs({
        format: "csv",
        ...(searchTerm && { search: searchTerm }),
        ...(severityFilter !== "all" && { severity: severityFilter }),
        ...(currentService && { service: currentService }),
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

  const handleRefresh = () => {
    if (liveEnabled) {
      if (wsRef.current) wsRef.current.close();
      setupWebSocket();
    } else {
      fetchLogs();
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
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Logs</h1>
          <p className="text-blue-200 mt-1">Real‑time log monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <ServiceSelector />
          <button
            onClick={() => setLiveEnabled(!liveEnabled)}
            className={`p-2 rounded-lg flex items-center gap-2 ${liveEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"}`}
            title={liveEnabled ? "Live mode on" : "Live mode off"}
          >
            {liveEnabled && wsConnected ? (
              <Wifi className="w-5 h-5 text-white" />
            ) : (
              <WifiOff className="w-5 h-5 text-yellow-400" />
            )}
            <span className="text-white text-sm">
              {liveEnabled ? (wsConnected ? "LIVE" : "Reconnecting") : "Paused"}
            </span>
          </button>
          <button
            onClick={handleRefresh}
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
        {liveEnabled && !currentService && (
          <span className="text-yellow-400 text-sm">
            ⚠️ Select a service for live logs
          </span>
        )}
      </div>

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
              {loading && !liveEnabled ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    Loading logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    {currentService
                      ? "No logs found"
                      : "Select a service to view logs"}
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
