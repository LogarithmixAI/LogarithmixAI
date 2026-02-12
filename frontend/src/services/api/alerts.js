import apiClient from './client';

export const alertApi = {
  // Get all alerts
  getAlerts: (params = {}) => {
    return apiClient.get('/alerts', { params });
  },

  // Get alert by ID
  getAlertById: (id) => {
    return apiClient.get(`/alerts/${id}`);
  },

  // Create alert rule
  createAlertRule: (ruleData) => {
    return apiClient.post('/alerts/rules', ruleData);
  },

  // Update alert rule
  updateAlertRule: (id, ruleData) => {
    return apiClient.put(`/alerts/rules/${id}`, ruleData);
  },

  // Delete alert rule
  deleteAlertRule: (id) => {
    return apiClient.delete(`/alerts/rules/${id}`);
  },

  // Get alert history
  getAlertHistory: (params = {}) => {
    return apiClient.get('/alerts/history', { params });
  },

  // Update alert status
  updateAlertStatus: (id, status) => {
    return apiClient.patch(`/alerts/${id}/status`, { status });
  },

  // Bulk update alerts
  bulkUpdateAlerts: (alertIds, data) => {
    return apiClient.patch('/alerts/bulk', { ids: alertIds, ...data });
  },

  // Get alert statistics
  getAlertStats: () => {
    return apiClient.get('/alerts/stats');
  }
};