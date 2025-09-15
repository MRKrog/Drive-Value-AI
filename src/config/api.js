// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    PREFERENCES: `${API_BASE_URL}/user/preferences`,
    FAVORITES: `${API_BASE_URL}/user/favorites`,
    SEARCHES: `${API_BASE_URL}/user/searches`,
  },
  
  // Vehicle endpoints
  VEHICLE: {
    SEARCH: `${API_BASE_URL}/vehicle/search`,
    VALUATION: `${API_BASE_URL}/vehicle/valuation`,
    DETAILS: `${API_BASE_URL}/vehicle/details`,
  },
  
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  }
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return endpoint;
};

// Helper function for common fetch options
export const getFetchOptions = (method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // For cookies/auth
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return options;
};
