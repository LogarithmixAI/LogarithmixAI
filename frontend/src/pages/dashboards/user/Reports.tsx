// pages/Reports.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Filter, Search, Eye } from "lucide-react";
import { viewerApi } from "../../../services/api";

const Reports: React.FC = () => {
  // ✅ Ensure reports is always an array
  const [reports, setReports] = useState<any[]>([]); // [9†L23-L24]
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchReports();
  }, [filterType]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = filterType !== "all" ? { type: filterType } : {};
      const response = await viewerApi.getReports(params);

      // ✅ Debug: Log the actual response to see what the API returns
      console.log("Reports API response:", response);

      // ✅ Ensure we're working with an array
      let reportsArray: any[] = [];

      // Case 1: Response is already an array
      if (Array.isArray(response)) {
        reportsArray = response;
      }
      // Case 2: Response is an object with a data property that is an array
      else if (response && Array.isArray(response.data)) {
        reportsArray = response.data;
      }
      // Case 3: Response is a single object (not an array)
      else if (
        response &&
        typeof response === "object" &&
        !Array.isArray(response)
      ) {
        // Convert single object to array
        reportsArray = [response];
        console.warn(
          "API returned a single object instead of an array. Wrapping in array.",
        );
      }
      // Case 4: Response is null or undefined
      else {
        console.warn("API returned invalid data. Defaulting to empty array.");
        reportsArray = [];
      }

      setReports(reportsArray);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setReports([]); // ✅ Fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (reportId?: string) => {
    setExporting(true);
    try {
      const blob = await viewerApi.exportData({
        type: reportId ? "report" : "logs",
        reportId,
        format: "csv",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${new Date().toISOString()}.csv`;
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

  const filteredReports = reports.filter(
    (r) =>
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-blue-200">Access and export system reports</p>
        </div>
        <button
          onClick={() => handleExport()}
          disabled={exporting}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{exporting ? "Exporting..." : "Export All Logs"}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Security">Security</option>
              <option value="Performance">Performance</option>
              <option value="Analytics">Analytics</option>
              <option value="Compliance">Compliance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Report Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">
                  Size
                </th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No reports found
                  </td>
                </tr>
              ) : (
                filteredReports.map((report, index) => (
                  <motion.tr
                    key={report.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-gray-700 rounded-lg text-xs text-gray-300">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{report.date}</td>
                    <td className="py-4 px-6 text-gray-300">{report.size}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleExport(report.id)}
                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
