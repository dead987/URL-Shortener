// api-client.js
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle 401 responses (invalid/expired token)
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
