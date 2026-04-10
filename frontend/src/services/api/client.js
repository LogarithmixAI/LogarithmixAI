import axios from 'axios';

// Create axios instance with relative base URL (empty = same origin)
const apiClient = axios.create({
  baseURL: '', // Requests go to the same origin, then Vite proxies /api to backend
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging (optional, helps trace requests)
    console.log(`🚀 ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`, config.data || '');
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error('❌ API Error:', {
      url: originalRequest?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    // Handle token expiration (401) - attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await apiClient.post('/api/auth/refresh');
        const newToken = refreshResponse.data?.token || refreshResponse.data?.access_token;
        
        if (newToken) {
          localStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle network errors (connection refused, etc.)
    if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Network error - is the backend server running on port 8001?');
      // Optionally show a toast message
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;