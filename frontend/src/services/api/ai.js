import apiClient from './client';

export const aiApi = {
  detectAnomalies: (data) => apiClient.post('/api/ai/anomalies', data),
  
  // Get AI model statuses
  getModelStatus: () => apiClient.get('/api/ai/models/status'),
  
  // Add other AI-related endpoints
  getTrainingJobs: () => apiClient.get('/api/ai/training-jobs'),
};