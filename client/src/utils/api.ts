import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// Fix API URL construction - ensure it doesn't have double slashes
const getBaseUrl = () => {
  const envUrl = process.env.REACT_APP_API_URL || 'https://superkidslimes.onrender.com/api';
  // Remove trailing slash if present to prevent // in URLs
  return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
};

// Use the properly formatted API URL
const API_URL = getBaseUrl();

console.log('API URL configured as:', API_URL); // Log the configured API URL

// Maximum number of retries for failed requests
const MAX_RETRIES = 2;

// Extend the Axios request config to include our custom properties
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

// Create an axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds - increased to account for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log full URL for debugging
    const fullUrl = `${API_URL}${config.url}`;
    console.log(`Making request to: ${fullUrl}`);
    
    // Cast to our custom type
    const customConfig = config as CustomRequestConfig;
    // Initialize retry count
    customConfig.retryCount = customConfig.retryCount || 0;
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`API Request: ${customConfig.method?.toUpperCase()} ${customConfig.url}`);
    }
    return customConfig;
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
    if (!error.config) {
      return Promise.reject(error);
    }
    
    // Cast to our custom type
    const config = error.config as CustomRequestConfig;

    // If we've already retried the maximum times, or the error is not retryable, reject
    if (!config || (config.retryCount ?? 0) >= MAX_RETRIES || error.response) {
      // Handle network errors
      if (error.message === 'Network Error') {
        console.error('Network error detected. Please check your connection.');
      }
      
      // Handle timeout errors
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out. The server might be experiencing high load or a cold start.');
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

    // Increment the retry count
    config.retryCount = (config.retryCount || 0) + 1;

    // Log retry attempt
    console.log(`Retrying API call to ${config.url} (attempt ${config.retryCount} of ${MAX_RETRIES})...`);

    // Delay before retrying - exponential backoff (1s, 2s, 4s, etc.)
    const delay = Math.pow(2, config.retryCount - 1) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Return a new request
    return api(config);
  }
);

export default api;
export { API_URL }; 