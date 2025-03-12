import axios from 'axios';

// Use environment variable for API URL with fallback to production URL
const API_URL = process.env.REACT_APP_API_URL || 'https://superkidslimes.onrender.com/api';

// Create an axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    // Log outgoing requests in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network error detected. Please check your connection.');
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out. The server might be experiencing high load.');
    }
    
    // Handle aborted requests
    if (axios.isCancel(error)) {
      console.log('Request was canceled', error.message);
    }
    
    // Log detailed error information
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message
    });
    
    return Promise.reject(error);
  }
);

export default api;
export { API_URL }; 