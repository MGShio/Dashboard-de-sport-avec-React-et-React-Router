import React from 'react';
import './ProfileInfoCard.css';

/**
 * Profile Info Card Component
 * Displays personal information (age, gender, height, weight)
 * @param {Object} props - Component props
 * @param {Object} props.userData - User data from API
 */
function ProfileInfoCard({ userData }) {
  // Use mock data if no userData provided
  const displayData = userData || {
    profile: {
      age: 29,
      gender: 'female',
      height: 168,
      weight: 58,
    },
  };

  // Format height from cm to meters
  const formatHeight = (cm) => {
    if (!cm) return '';
    const meters = Math.floor(cm / 100);
    const centimeters = cm % 100;
    return `${meters}m${centimeters > 0 ? centimeters : ''}`;
  };

  // Format gender display
  const formatGender = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'female':
        return 'Femme';
      case 'male':
        return 'Homme';
      default:
        return gender || 'Non spécifié';
    }
  };

  return (
    <div className="profile-info-card">
      <div className="profile-info-header">
        <h2 className="profile-info-title">Votre profil</h2>
        <div className="profile-info-divider" />
      </div>
      
      <div className="profile-info-grid">
        <div className="profile-info-item">
          <span className="profile-info-label">Âge : </span>
          <span className="profile-info-value">{displayData.profile.age || 'N/A'}</span>
        </div>
        
        <div className="profile-info-item">
          <span className="profile-info-label">Genre : </span>
          <span className="profile-info-value">{formatGender(displayData.profile.gender)}</span>
        </div>
        
        <div className="profile-info-item">
          <span className="profile-info-label">Taille : </span>
          <span className="profile-info-value">{formatHeight(displayData.profile.height)}</span>
        </div>
        
        <div className="profile-info-item">
          <span className="profile-info-label">Poids : </span>
          <span className="profile-info-value">{displayData.profile.weight || 'N/A'}kg</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
