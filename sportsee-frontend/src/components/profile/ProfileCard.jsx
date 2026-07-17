import React from 'react';
import TotalDistanceChart from '../charts/TotalDistanceChart';
import './ProfileCard.css';

/**
 * Profile Card Component
 * Displays user profile info and total distance statistic
 * @param {Object} props - Component props
 * @param {Object} props.userData - User data from API
 */
function ProfileCard({ userData }) {
  // Use mock data if no userData provided
  const displayData = userData || {
    profile: {
      firstName: 'Clara',
      lastName: 'Dupont',
      createdAt: '2023-06-14',
      profilePicture: null,
    },
    statistics: {
      totalDistance: '312',
    },
  };

  // Format date
  const formattedDate = new Date(displayData.profile.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="profile-card">
      <div className="profile-info">
        {/* Profile Picture */}
        {displayData.profile.profilePicture ? (
          <img 
            src={displayData.profile.profilePicture} 
            alt="Profile" 
            className="profile-picture"
          />
        ) : (
          <div className="profile-picture-placeholder" />
        )}
        
        {/* Profile Text */}
        <div className="profile-text">
          <h1 className="profile-name">
            {displayData.profile.firstName} {displayData.profile.lastName}
          </h1>
          <p className="profile-member-since">
            Membre depuis le {formattedDate}
          </p>
        </div>
      </div>
      
      {/* Total Distance Stat */}
      <div className="total-distance-stat">
        <span className="stat-label">Distance totale parcourue</span>
        <TotalDistanceChart value={displayData.statistics.totalDistance} />
      </div>
    </div>
  );
}

export default ProfileCard;
