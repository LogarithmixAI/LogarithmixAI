import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',   
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor – no token needed (session cookie is sent automatically)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} request to: ${config.url}`, config.data || '');
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – return response.data directly
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response.data;
  },
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;