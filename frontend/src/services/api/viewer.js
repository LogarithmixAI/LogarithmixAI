// services/api/viewer.js
import apiClient from './client';

export const viewerApi = {
  // Statistics for top cards
  getStats: () => apiClient.get('/dashboard/viewer/stats'),
  
  // Available reports (with optional filters)
  getReports: (params) => apiClient.get('/dashboard/viewer/reports', { params }),
  
  // Popular dashboards (sidebar list)
  getPopularDashboards: () => apiClient.get('/dashboard/viewer/dashboards/popular'),
  
  // Quick view numbers (log volume, active users, security events)
  getQuickView: () => apiClient.get('/dashboard/viewer/quick-view'),
  
  // Export data (POST with JSON body, returns a file blob)
  exportData: (payload) => apiClient.post('/dashboard/viewer/export', payload, { responseType: 'blob' })
};