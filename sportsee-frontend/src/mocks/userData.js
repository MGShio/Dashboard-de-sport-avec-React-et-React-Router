/**
 * Mock Data for SportSee Dashboard Development
 * 
 * This file contains mock data that mirrors the structure returned by the backend API.
 * Use these during frontend development when the backend is not available.
 * 
 * Structure based on backend API endpoints:
 * - GET /api/user-info → user profile + statistics
 * - GET /api/user-activity → running sessions by date range
 */

// ============================================================================
// USER 123 - Sophie Martin (Main mock user)
// ============================================================================

/**
 * Mock response for GET /api/user-info (user123)
 * Returns: { profile, statistics }
 */
export const mockUserProfile = {
  profile: {
    firstName: 'Sophie',
    lastName: 'Martin',
    age: 32,
    gender: 'female',
    height: 165,
    weight: 60,
    profilePicture: 'http://localhost:8000/images/sophie.jpg',
    createdAt: '2025-01-01',
  },
  statistics: {
    totalDistance: '2250.2',
    totalSessions: 348,
    totalDuration: 14625,
  },
};

/**
 * Mock response for GET /api/user-activity
 * Returns: Array of running sessions for a date range
 * 
 * Structure used by charts:
 * - DailyActivity: distance, caloriesBurned per day
 * - AverageSessions: duration per day
 * - Performance: heartRate data
 */
export const mockActivityData = [
  {
    date: '2025-01-04',
    distance: 5.8,
    duration: 38,
    heartRate: { min: 140, max: 178, average: 163 },
    caloriesBurned: 422,
  },
  {
    date: '2025-01-05',
    distance: 3.2,
    duration: 20,
    heartRate: { min: 148, max: 184, average: 171 },
    caloriesBurned: 248,
  },
  {
    date: '2025-01-09',
    distance: 6.4,
    duration: 42,
    heartRate: { min: 140, max: 176, average: 163 },
    caloriesBurned: 468,
  },
  {
    date: '2025-01-12',
    distance: 7.5,
    duration: 50,
    heartRate: { min: 138, max: 178, average: 162 },
    caloriesBurned: 532,
  },
  {
    date: '2025-01-19',
    distance: 5.1,
    duration: 34,
    heartRate: { min: 141, max: 177, average: 165 },
    caloriesBurned: 378,
  },
  {
    date: '2025-01-25',
    distance: 4.8,
    duration: 32,
    heartRate: { min: 143, max: 179, average: 166 },
    caloriesBurned: 352,
  },
  {
    date: '2025-01-26',
    distance: 3.5,
    duration: 22,
    heartRate: { min: 146, max: 183, average: 170 },
    caloriesBurned: 265,
  },
];

// ============================================================================
// USER 789 - Emma Leroy
// ============================================================================

export const mockUserProfileEmma = {
  profile: {
    firstName: 'Emma',
    lastName: 'Leroy',
    age: 28,
    gender: 'female',
    height: 170,
    weight: 62,
    profilePicture: 'http://localhost:8000/images/emma.jpg',
    createdAt: '2025-01-01',
  },
  statistics: {
    totalDistance: '1520.5',
    totalSessions: 285,
    totalDuration: 12850,
  },
};

// ============================================================================
// USER 456 - Marc Dubois
// ============================================================================

export const mockUserProfileMarc = {
  profile: {
    firstName: 'Marc',
    lastName: 'Dubois',
    age: 45,
    gender: 'male',
    height: 180,
    weight: 85,
    profilePicture: 'http://localhost:8000/images/marc.jpg',
    createdAt: '2025-01-01',
  },
  statistics: {
    totalDistance: '850.3',
    totalSessions: 120,
    totalDuration: 5875,
  },
};

// ============================================================================
// DATA STRUCTURES FOR CHARTS
// ============================================================================

/**
 * Daily Activity Data (for bar charts)
 * Structure: { day: string, kilogram: number, calories: number }
 */
export const mockDailyActivity = [
  { day: '2025-01-01', kilogram: 60, calories: 200 },
  { day: '2025-01-02', kilogram: 60, calories: 240 },
  { day: '2025-01-03', kilogram: 59, calories: 180 },
  { day: '2025-01-04', kilogram: 59, calories: 422 },
  { day: '2025-01-05', kilogram: 58, calories: 248 },
  { day: '2025-01-06', kilogram: 58, calories: 320 },
  { day: '2025-01-07', kilogram: 60, calories: 390 },
];

/**
 * Average Sessions Data (for line charts)
 * Structure: { day: number (1-7), sessionLength: number }
 */
export const mockAverageSessions = [
  { day: 1, sessionLength: 30 },
  { day: 2, sessionLength: 40 },
  { day: 3, sessionLength: 50 },
  { day: 4, sessionLength: 38 },
  { day: 5, sessionLength: 25 },
  { day: 6, sessionLength: 45 },
  { day: 7, sessionLength: 60 },
];

/**
 * Performance Data (for radar charts)
 * Structure: { value: number, kind: number | string }
 * Kind mapping: 1=Cardio, 2=Energy, 3=Endurance, 4=Strength, 5=Speed, 6=Intensity
 */
export const mockPerformanceData = [
  { value: 80, kind: 1 }, // Cardio
  { value: 75, kind: 2 }, // Energy
  { value: 90, kind: 3 }, // Endurance
  { value: 65, kind: 4 }, // Strength
  { value: 85, kind: 5 }, // Speed
  { value: 70, kind: 6 }, // Intensity
];

/**
 * Today's Score (for radial progress chart)
 * Value between 0 and 1 (or 0-100%)
 */
export const mockTodayScore = 0.75; // 75%

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format running data for daily activity chart
 * @param {Array} runningData - Array of running sessions
 * @returns {Array} - Formatted for chart consumption
 */
export const formatDailyActivity = (runningData) => {
  return runningData.map((session) => ({
    day: session.date,
    kilogram: 60, // Mock weight - would be dynamic in real app
    calories: session.caloriesBurned,
  }));
};

/**
 * Format running data for average sessions chart
 * @param {Array} runningData - Array of running sessions
 * @returns {Array} - Formatted for chart consumption
 */
export const formatAverageSessions = (runningData) => {
  return runningData.map((session, index) => ({
    day: index + 1,
    sessionLength: session.duration,
  }));
};

/**
 * Get mock user data by ID
 * @param {string} userId - User identifier
 * @returns {Object} - User profile and statistics
 */
export const getMockUserById = (userId) => {
  const mockUsers = {
    user123: mockUserProfile,
    user789: mockUserProfileEmma,
    user456: mockUserProfileMarc,
  };
  return mockUsers[userId] || mockUserProfile;
};

/**
 * Get mock activity data by user ID
 * @param {string} userId - User identifier
 * @param {string} startWeek - Start date
 * @param {string} endWeek - End date
 * @returns {Array} - Running sessions
 */
export const getMockActivityByUser = (userId, startWeek, endWeek) => {
  // Filter mock data by date range
  return mockActivityData.filter((session) => {
    return session.date >= startWeek && session.date <= endWeek;
  });
};

// ============================================================================
// DEFAULT EXPORTS
// ============================================================================

export default {
  mockUserProfile,
  mockActivityData,
  mockDailyActivity,
  mockAverageSessions,
  mockPerformanceData,
  mockTodayScore,
  getMockUserById,
  getMockActivityByUser,
  formatDailyActivity,
  formatAverageSessions,
};
