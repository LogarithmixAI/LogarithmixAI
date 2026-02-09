import apiClient from './client';

export const analyticsApi = {
  // Get analytics data
  getAnalytics: (timeRange = '24h') => {
    return apiClient.get('/analytics', { params: { range: timeRange } });
  },

  // Get log volume data
  getLogVolume: (params = {}) => {
    return apiClient.get('/analytics/volume', { params });
  },

  // Get error trends
  getErrorTrends: (params = {}) => {
    return apiClient.get('/analytics/error-trends', { params });
  },

  // Get response time analytics
  getResponseTimeStats: (params = {}) => {
    return apiClient.get('/analytics/response-times', { params });
  },

  // Get service health metrics
  getServiceHealth: () => {
    return apiClient.get('/analytics/service-health');
  },

  // Get custom report
  getCustomReport: (reportConfig) => {
    return apiClient.post('/analytics/custom-report', reportConfig);
  },

  // Export analytics data
  exportAnalytics: (format = 'csv', params = {}) => {
    return apiClient.get('/analytics/export', {
      params: { format, ...params },
      responseType: 'blob'
    });
  }
};