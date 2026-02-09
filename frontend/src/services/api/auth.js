import apiClient from './client';

export const authApi = {
  // Login
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  // Register
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // Logout
  logout: () => {
    return apiClient.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },

  // Refresh token
  refreshToken: () => {
    return apiClient.post('/auth/refresh');
  },

  // Forgot password
  forgotPassword: (email) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: (token, password) => {
    return apiClient.post('/auth/reset-password', { token, password });
  },

  // Update profile
  updateProfile: (userData) => {
    return apiClient.put('/auth/profile', userData);
  }
};