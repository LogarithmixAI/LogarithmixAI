import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white shadow">
        <div className="p-4">
          <h2 className="text-lg font-bold">Log Monitoring</h2>
        </div>
        <nav className="mt-4">
          <a href="/app/dashboard" className="block p-3 hover:bg-gray-100">Dashboard</a>
          <a href="/app/logs" className="block p-3 hover:bg-gray-100">Logs</a>
          <a href="/app/alerts" className="block p-3 hover:bg-gray-100">Alerts</a>
          <a href="/app/ai-insights" className="block p-3 hover:bg-gray-100">AI Insights</a>
          <a href="/app/settings" className="block p-3 hover:bg-gray-100">Settings</a>
        </nav>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;