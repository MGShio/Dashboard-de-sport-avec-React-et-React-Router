import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login user and return token
export const login = async (username, password) => {
  try {
    const response = await api.post('/api/login', { username, password });
    const { token, userId } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    return { token, userId };
  } catch (error) {
    throw error;
  }
};

// Get user info (profile and statistics)
export const getUserInfo = async () => {
  try {
    const response = await api.get('/api/user-info');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user activity for a specific week range
export const getUserActivity = async (startWeek, endWeek) => {
  try {
    const response = await api.get('/api/user-activity', {
      params: { startWeek, endWeek },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user weekly goal progress
export const getUserGoal = async () => {
  try {
    const response = await api.get("/api/user-goal");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout - clear token
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default api;
