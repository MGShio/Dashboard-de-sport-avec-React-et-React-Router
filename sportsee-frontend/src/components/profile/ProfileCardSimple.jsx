import React from 'react';
import './ProfileCardSimple.css';

/**
 * Simple Profile Card Component (without chart)
 * Displays only user profile photo, name, and member since date
 * @param {Object} props - Component props
 * @param {Object} props.userData - User data from API
 */
function ProfileCardSimple({ userData }) {
  // Use mock data if no userData provided
  const displayData = userData || {
    profile: {
      firstName: 'Clara',
      lastName: 'Dupont',
      createdAt: '2023-06-14',
      profilePicture: null,
    },
  };

  // Format date
  const formattedDate = new Date(displayData.profile.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="profile-card-simple">
      <div className="profile-info-simple">
        {/* Profile Picture */}
        {displayData.profile.profilePicture ? (
          <img 
            src={displayData.profile.profilePicture} 
            alt="Profile" 
            className="profile-picture-simple"
          />
        ) : (
          <div className="profile-picture-placeholder-simple" />
        )}
        
        {/* Profile Text */}
        <div className="profile-text-simple">
          <h1 className="profile-name-simple">
            {displayData.profile.firstName} {displayData.profile.lastName}
          </h1>
          <p className="profile-member-since-simple">
            Membre depuis le {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCardSimple;
