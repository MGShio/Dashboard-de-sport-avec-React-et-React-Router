import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  login as apiLogin,
  logout as apiLogout,
  getUserInfo,
  getUserActivity,
  isAuthenticated as checkAuth,
} from '../services/api';

/**
 * App Context for global state management
 * Manages: authentication, user data, activity data, loading states
 */
const AppContext = createContext(null);

/**
 * App Provider Component
 * Wraps the application and provides global state
 */
export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on mount
  const [auth, setAuth] = useState(() => checkAuth());

  /**
   * Fetch user data and activity from API
   * @param {string} startWeek - Start date for activity query
   * @param {string} endWeek - End date for activity query
   */
  const fetchData = useCallback(async (startWeek, endWeek) => {
    if (!checkAuth()) {
      setAuth(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get user info
      const userInfo = await getUserInfo();
      setUserData(userInfo);

      // Get activity data
      if (startWeek && endWeek) {
        const activity = await getUserActivity(startWeek, endWeek);
        setActivityData(activity);
      } else {
        // Default: get last 4 weeks
        const today = new Date();
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(today.getDate() - 28);

        const startWeek = fourWeeksAgo.toISOString().split('T')[0];
        const endWeek = today.toISOString().split('T')[0];

        const activity = await getUserActivity(startWeek, endWeek);
        setActivityData(activity);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
      console.error('Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login user and set auth state
   * Note: navigation is handled by the component calling login
   * @param {string} username - User username
   * @param {string} password - User password
   * @returns {Promise<void>}
   */
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiLogin(username, password);
      setAuth(true);
      await fetchData();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setAuth(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  /**
   * Logout user and clear data
   * Note: navigation is handled by the component calling logout
   */
  const logout = useCallback(() => {
    apiLogout();
    setAuth(false);
    setUserData(null);
    setActivityData([]);
  }, []);

  // Initial data fetch on auth change
  useEffect(() => {
    if (auth) {
      fetchData();
    } else {
      setUserData(null);
      setActivityData([]);
    }
  }, [auth, fetchData]);

  // Sync auth state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newAuth = checkAuth();
      if (newAuth !== auth) {
        setAuth(newAuth);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [auth]);

  const value = {
    // State
    userData,
    activityData,
    isLoading,
    auth,
    error,
    // Actions
    login,
    logout,
    fetchData,
    setIsLoading,
    setError,
    setAuth,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use AppContext
 * @returns {Object} Context value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
