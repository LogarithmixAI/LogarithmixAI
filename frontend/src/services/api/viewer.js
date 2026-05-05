// src/services/api/viewer.js
import apiClient from './client';

export const viewerApi = {
  // Existing methods (keep as is)
  getStats: (params) => apiClient.get('/dashboard/viewer/stats', { params }),
  getReports: (params) => apiClient.get('/dashboard/viewer/reports', { params }),
  getPopularDashboards: (params) => apiClient.get('/dashboard/viewer/dashboards/popular', { params }),
  getQuickView: (params) => apiClient.get('/dashboard/viewer/quick-view', { params }),
  exportData: (payload) => apiClient.post('/dashboard/viewer/export', payload, { responseType: 'blob' }),
  getAvailableServices: () => apiClient.get('/dashboard/viewer/services'),

  // Resource management
  getResources: (params) => apiClient.get('/dashboard/viewer/resources', { params }),
  addResource: (data) => apiClient.post('/dashboard/viewer/resources', data),
  deleteResource: (id) => apiClient.delete(`/dashboard/viewer/resources/${id}`),

  // Anomalies & AI
  getAnomalies: (params) => apiClient.get('/dashboard/viewer/anomalies', { params }),
  getAIRecommendations: (params) => apiClient.get('/dashboard/viewer/ai-recommendations', { params }),
  applyAIRecommendation: (payload) => apiClient.post('/dashboard/viewer/ai-recommendations/apply', payload),

  // Live logs & Analytics
  getLiveLogs: (resourceId, since) => apiClient.get('/dashboard/viewer/logs/live', { params: { resourceId, since } }),
  getResourceAnalytics: (resourceId) => apiClient.get(`/dashboard/viewer/analytics/resource/${resourceId}`),

  // Alerts
  getAlerts: (params) => apiClient.get('/dashboard/viewer/alerts', { params }),
};