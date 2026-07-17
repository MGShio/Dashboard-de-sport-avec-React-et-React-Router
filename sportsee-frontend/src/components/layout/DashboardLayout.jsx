import React, { useState } from 'react';
import Header from '../header/Header';
import ProfileCard from '../profile/ProfileCard';
import PerformanceSection from '../stats/PerformanceSection';
import WeeklySummary from '../stats/WeeklySummary';
import Footer from '../footer/Footer';
import { useAppContext } from '../../context/AppContext';
import './DashboardLayout.css';

/**
 * Format activity data for bar chart (distance by day)
 * @param {Array} activityData - Raw activity data from API
 * @returns {Array} - Formatted data for bar chart
 */
const formatSessionData = (activityData) => {
  if (!activityData || activityData.length === 0) return [];
  
  return activityData.map(session => ({
    value: session.distance || 0,
    label: new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'short' }),
    date: session.date,
    distance: session.distance,
  }));
};

/**
 * Format activity data for BPM/heart rate bar chart
 * @param {Array} activityData - Raw activity data from API
 * @returns {Array} - Formatted data for BPM chart
 */
const formatBpmData = (activityData) => {
  if (!activityData || activityData.length === 0) return [];
  
  return activityData.map((session, index) => ({
    sessionLength: session.duration || 0,
    day: index + 1,
    name: new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'short' }),
    bpm: session.heartRate?.average || 0,
  }));
};

/**
 * Format user data for performance radar chart
 * @param {Object} userData - User data from API
 * @returns {Array} - Formatted data for radar chart
 */
const formatPerformanceData = (userData) => {
  // This is mock data for the radar chart
  // In a real app, this would come from a dedicated API endpoint
  return [
    { value: 80, kind: 1, name: 'Cardio' },
    { value: 75, kind: 2, name: 'Énergie' },
    { value: 90, kind: 3, name: 'Endurance' },
    { value: 65, kind: 4, name: 'Force' },
    { value: 85, kind: 5, name: 'Vitesse' },
    { value: 70, kind: 6, name: 'Intensité' },
  ];
};

/**
 * Calculate today's score from user statistics
 * @param {Object} userData - User data from API
 * @returns {number} - Score between 0 and 1
 */
const calculateTodayScore = (userData) => {
  if (!userData || !userData.statistics) return 0.75;
  
  // This is a mock calculation
  // In a real app, this would be calculated from actual data
  const { totalDistance, totalSessions, totalDuration } = userData.statistics;
  
  // Simple calculation based on available data
  const distanceScore = Math.min(parseFloat(totalDistance || 0) / 3000, 1);
  const sessionsScore = Math.min((totalSessions || 0) / 500, 1);
  const durationScore = Math.min((totalDuration || 0) / 20000, 1);
  
  const averageScore = (distanceScore + sessionsScore + durationScore) / 3;
  return Math.min(averageScore, 1);
};

/**
 * Main Dashboard Layout Component
 * Assemble all dashboard sections
 * Uses global state from AppContext
 */
function DashboardLayout({ onLogout }) {
  const { userData, activityData, isLoading } = useAppContext();
  const [dateRange, setDateRange] = useState({
    startWeek: '',
    endWeek: '',
  });

  // Format data for charts
  const sessionData = formatSessionData(activityData);
  const bpmData = formatBpmData(activityData);
  const performanceData = formatPerformanceData(userData);
  const todayScore = calculateTodayScore(userData);

  // Calculate stats for WeeklySummary
  const totalDistance = userData?.statistics?.totalDistance || 0;
  const totalSessions = userData?.statistics?.totalSessions || 0;
  const totalDuration = userData?.statistics?.totalDuration || 0;
  const averageDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;

  if (isLoading) {
    return (
      <div className="dashboard-layout">
        <Header onLogout={onLogout} />
        <main className="dashboard-main">
          <p>Chargement du dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Header onLogout={onLogout} />
      
      <main className="dashboard-main">
        {/* Profile Section */}
        <ProfileCard userData={userData} />
        
        {/* Performance Charts */}
        <PerformanceSection 
          sessionData={sessionData}
          bpmData={bpmData}
          performanceData={performanceData}
          todayScore={todayScore}
        />
        
        {/* Weekly Summary */}
        <WeeklySummary 
          completedSessions={totalSessions}
          totalSessions={totalSessions + 10}
          averageDuration={averageDuration}
          totalDistance={totalDistance}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default DashboardLayout;
