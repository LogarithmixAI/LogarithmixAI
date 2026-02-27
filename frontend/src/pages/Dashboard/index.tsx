// src/pages/Dashboard/index.jsx
import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Cpu, 
  Database,
  Server,
  Users,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, Button } from '../../components/common/UI';
import StatsCards from '../../components/dashboard/StatsCards';
import RealTimeLogs from '../../components/dashboard/RealTimeLogs';
import SystemHealth from '../../components/dashboard/SystemHealth';
import QuickActions from '../../components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your logs.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Export Report</Button>
          <Button variant="primary">Add Service</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Logs */}
          <RealTimeLogs />
          
          {/* System Health Chart */}
          <SystemHealth />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Recent Anomalies */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                Recent Anomalies
              </h3>
              <span className="text-sm text-gray-500">Last 24h</span>
            </div>
            <div className="space-y-3">
              {[
                { service: 'API Gateway', type: 'High Latency', time: '10 min ago', severity: 'high' },
                { service: 'Database', type: 'Connection Spikes', time: '25 min ago', severity: 'medium' },
                { service: 'Cache', type: 'Memory Leak', time: '1 hour ago', severity: 'low' },
              ].map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">{anomaly.service}</div>
                    <div className="text-sm text-gray-500">{anomaly.type}</div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs ${
                      anomaly.severity === 'high' ? 'bg-red-100 text-red-800' :
                      anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {anomaly.severity}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{anomaly.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Log Ingestor', status: 'active', uptime: '99.99%' },
                { name: 'AI Processor', status: 'active', uptime: '99.98%' },
                { name: 'Alert Engine', status: 'warning', uptime: '99.95%' },
                { name: 'Storage', status: 'active', uptime: '99.99%' },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      service.status === 'active' ? 'bg-green-500' :
                      service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span>{service.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">{service.uptime}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;