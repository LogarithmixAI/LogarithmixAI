import apiClient from './client';

export const aiApi = {
  // Get AI predictions
  getPredictions: (params = {}) => {
    return apiClient.get('/ai/predictions', { params });
  },

  // Get anomalies detected
  getAnomalies: (params = {}) => {
    return apiClient.get('/ai/anomalies', { params });
  },

  // Get pattern recognition
  getPatterns: (params = {}) => {
    return apiClient.get('/ai/patterns', { params });
  },

  // Get root cause analysis
  getRootCauseAnalysis: (incidentId) => {
    return apiClient.get(`/ai/root-cause/${incidentId}`);
  },

  // Train AI model
  trainModel: (config = {}) => {
    return apiClient.post('/ai/train', config);
  },

  // Get model status
  getModelStatus: () => {
    return apiClient.get('/ai/model-status');
  },

  // Get AI insights summary
  getInsightsSummary: () => {
    return apiClient.get('/ai/insights');
  },

  // Get prediction accuracy
  getPredictionAccuracy: () => {
    return apiClient.get('/ai/accuracy');
  }
};