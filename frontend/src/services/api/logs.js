import apiClient from './client';

export const logApi = {
  // Get logs with filters
  getLogs: (params = {}) => {
    return apiClient.get('/logs', { params });
  },

  // Get log by ID
  getLogById: (id) => {
    return apiClient.get(`/logs/${id}`);
  },

  // Search logs
  searchLogs: (query, filters = {}) => {
    return apiClient.get('/logs/search', {
      params: { q: query, ...filters }
    });
  },

  // Get log statistics
  getLogStats: () => {
    return apiClient.get('/logs/stats');
  },

  // Export logs
  exportLogs: (format = 'json', filters = {}) => {
    return apiClient.get('/logs/export', {
      params: { format, ...filters },
      responseType: 'blob'
    });
  },

  // Stream logs (Server-Sent Events)
  streamLogs: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return new EventSource(`${apiClient.defaults.baseURL}/logs/stream?${params}`);
  },

  // Create new log (for testing)
  createLog: (logData) => {
    return apiClient.post('/logs', logData);
  },

  // Bulk delete logs
  deleteLogs: (logIds) => {
    return apiClient.delete('/logs/bulk', { data: { ids: logIds } });
  }
};