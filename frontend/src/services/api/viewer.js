// services/api/viewer.js
import apiClient from './client';

export const viewerApi = {
  getDashboards: () => apiClient.get('/viewer/dashboards'),
  getReports: (params) => apiClient.get('/viewer/reports', { params }),
  exportData: (format, params) => apiClient.get(`/viewer/export.${format}`, { params }),
};