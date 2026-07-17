import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ProfileCardSimple from '../profile/ProfileCardSimple';
import ProfileInfoCard from '../profile/ProfileInfoCard';
import StatCard from '../stats/StatCard';
import { useAppContext } from '../../context/AppContext';
import './ProfileLayout.css';

/**
 * Calculate total time in hours and minutes from totalDuration (in minutes)
 * @param {number} totalMinutes - Total duration in minutes
 * @returns {string} - Formatted as "Xh Ymin"
 */
const formatTotalTime = (totalMinutes) => {
  if (!totalMinutes) return '0h';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
};

/**
 * Calculate rest days from activity data
 * @param {Array} activityData - Activity sessions
 * @param {string} createdAt - User creation date
 * @returns {number} - Number of rest days
 */
const calculateRestDays = (activityData, createdAt) => {
  if (!activityData || activityData.length === 0 || !createdAt) return 0;
  
  const startDate = new Date(createdAt);
  const endDate = new Date();
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const activityDays = new Set(activityData.map(session => {
    const date = new Date(session.date);
    return date.toDateString();
  }));
  
  // Count unique days with activity
  const uniqueActivityDays = activityDays.size;
  const restDays = totalDays - uniqueActivityDays;
  
  return Math.max(0, restDays);
};

/**
 * Profile Layout Component
 * Displays user profile with personal info and statistics
 * Uses global state from AppContext
 */
function ProfileLayout({ onLogout }) {
  const { userData, activityData, isLoading } = useAppContext();

  // Extract statistics
  const totalDistance = userData?.statistics?.totalDistance || 312;
  const totalSessions = userData?.statistics?.totalSessions || 41;
  const totalDuration = userData?.statistics?.totalDuration || 1635; // 27h 15min = 1635 minutes
  const totalCalories = userData?.statistics?.totalCalories || 25000;
  
  // Calculate rest days
  const restDays = calculateRestDays(activityData, userData?.profile?.createdAt);

  // Format created at date for stats subtitle
  const statsStartDate = userData?.profile?.createdAt 
    ? new Date(userData.profile.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '14 juin 2023';

  if (isLoading) {
    return (
      <div className="profile-layout">
        <Header onLogout={onLogout} />
        <main className="profile-main">
          <p>Chargement du profil...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <Header onLogout={onLogout} />
      
      <main className="profile-main">
        <div className="profile-content">
          {/* Left Column: Profile */}
          <div className="profile-left-column">
            <div className="profile-column-content">
              {/* Profile Card (photo + name + member since) - without chart */}
              <ProfileCardSimple userData={userData} />
              
              {/* Profile Info Card (age, gender, height, weight) */}
              <ProfileInfoCard userData={userData} />
            </div>
          </div>
          
          {/* Right Column: Statistics */}
          <div className="profile-right-column">
            <div className="stats-header">
              <h2 className="stats-title">Vos statistiques</h2>
              <p className="stats-subtitle">depuis le {statsStartDate}</p>
            </div>
            
            <div className="stats-grid">
              {/* Row 1 */}
              <div className="stats-row">
                <StatCard
                  value={formatTotalTime(totalDuration)}
                  unit=""
                  label="Temps total couru"
                  color="blue"
                  filled={true}
                />
                <StatCard
                  value={totalDistance}
                  unit="km"
                  label="Distance totale parcourue"
                  color="blue"
                  filled={true}
                />
                <StatCard
                  value={totalSessions}
                  unit="sessions"
                  label="Nombre de sessions"
                  color="blue"
                  filled={true}
                />
              </div>
              
              {/* Row 2 */}
              <div className="stats-row">
                <StatCard
                  value={totalCalories}
                  unit="cal"
                  label="Calories brûlées"
                  color="blue"
                  filled={true}
                />
                <StatCard
                  value={restDays}
                  unit="jours"
                  label="Nombre de jours de repos"
                  color="blue"
                  filled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default ProfileLayout;
