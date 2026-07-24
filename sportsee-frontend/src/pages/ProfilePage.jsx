import React from 'react';
import Logo from '../components/header/Logo';
import './ProfilePage.css';

/**
 * Calculate rest days from activity data
 */
const calculateRestDays = (activityData, createdAt) => {
  if (!activityData || activityData.length === 0 || !createdAt) return 0;
  
  const startDate = new Date(createdAt);
  const endDate = new Date();
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const activityDays = new Set(activityData.map(session => {
    const date = new Date(session.date || session.day);
    return date.toDateString();
  }));
  
  const uniqueActivityDays = activityDays.size;
  const restDays = totalDays - uniqueActivityDays;
  
  return Math.max(0, restDays);
};

/**
 * Calculate total calories from activity data
 */
const calculateTotalCalories = (activityData) => {
  if (!activityData || activityData.length === 0) return 0;
  return activityData.reduce((sum, session) => {
    return sum + (session.caloriesBurned || session.calories || 0);
  }, 0);
};

/**
 * Format total time in minutes to hours and minutes
 */
const formatTotalTime = (totalMinutes) => {
  if (!totalMinutes) return '0h';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
};

/**
 * Format distance to display
 */
const formatDistance = (distance) => {
  if (distance === undefined || distance === null) return '0';
  const num = typeof distance === 'string' ? parseFloat(distance) : distance;
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
};

function ProfilePage({ userData, activityData, onLogout }) {
  const profile = userData?.profile || {};
  const statistics = userData?.statistics || {};
  
  const firstName = profile.firstName || profile.name || 'Utilisateur';
  const lastName = profile.lastName || '';
  const userName = lastName ? `${firstName} ${lastName}` : firstName;
  const userPhoto = profile.profilePicture || profile.photo || "/images/user-picture.png";
  const createdAt = profile.createdAt;
  
  const age = profile.age || 'Non renseigné';
  const gender = profile.gender === 'female' ? 'Femme' : profile.gender === 'male' ? 'Homme' : profile.gender || 'Non renseigné';
  const height = profile.height ? `${profile.height} cm` : 'Non renseigné';
  const weight = profile.weight ? `${profile.weight} kg` : 'Non renseigné';
  
  const totalDuration = statistics.totalDuration || 0;
  const totalSessions = statistics.totalSessions || 0;
  
  const totalDistanceRaw = statistics.totalDistance || 0;
  const totalDistance = typeof totalDistanceRaw === 'string' 
    ? parseFloat(totalDistanceRaw) 
    : totalDistanceRaw;
  
  const totalCalories = calculateTotalCalories(activityData);
  const restDays = calculateRestDays(activityData, createdAt);

  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Date inconnue';

  return (
    <div className="profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <Logo />
          <nav className="profile-nav">
            <div className="profile-nav-links">
              <a href="/dashboard" className="profile-nav-link">Dashboard</a>
              <a href="/profile" className="profile-nav-link active">Mon profil</a>
            </div>
            <button onClick={onLogout} className="profile-nav-logout" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Se déconnecter
            </button>
          </nav>
        </header>

        <main className="profilepage-main">
          <div className="profile-content-left">
            <div className="profile-user-card">
              <img src={userPhoto} alt={userName} className="profile-user-image" />
              <div className="profile-user-info">
                <h1 className="profile-user-name">{userName}</h1>
                <p className="profile-user-joined">Membre depuis le {joinedDate}</p>
              </div>
            </div>

            <div className="profile-info-card">
              <h2 className="profile-info-title">Votre profil</h2>
              <div className="profile-info-divider" />
              <div className="profile-info-items">
                <div className="profile-info-item">Âge : {age}</div>
                <div className="profile-info-item">Genre : {gender}</div>
                <div className="profile-info-item">Taille : {height}</div>
                <div className="profile-info-item">Poids : {weight}</div>
              </div>
            </div>
          </div>

          <div className="profile-content-right">
            <div className="profile-stats-header">
              <h2 className="profile-stats-title">Vos statistiques</h2>
              <p className="profile-stats-subtitle">depuis le {joinedDate}</p>
            </div>
            <div className="profile-stats-grid">
              <div className="profile-stats-column">
                <div className="profile-stat-card">
                  <div className="profile-stat-label">Temps total couru</div>
                  <div className="profile-stat-value-container">
                    <span className="profile-stat-value">{formatTotalTime(totalDuration)}</span>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="profile-stat-label">Distance totale parcourue</div>
                  <div className="profile-stat-value-container">
                    <span className="profile-stat-value">{formatDistance(totalDistance)}</span>
                    <span className="profile-stat-unit">km</span>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="profile-stat-label">Nombre de sessions</div>
                  <div className="profile-stat-value-container">
                    <span className="profile-stat-value">{totalSessions.toLocaleString('fr-FR')}</span>
                    <span className="profile-stat-unit">sessions</span>
                  </div>
                </div>
              </div>
              <div className="profile-stats-column">
                <div className="profile-stat-card">
                  <div className="profile-stat-label">Calories brûlées</div>
                  <div className="profile-stat-value-container">
                    <span className="profile-stat-value">{totalCalories.toLocaleString('fr-FR')}</span>
                    <span className="profile-stat-unit">cal</span>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="profile-stat-label">Nombre de jours de repos</div>
                  <div className="profile-stat-value-container">
                    <span className="profile-stat-value">{restDays.toLocaleString('fr-FR')}</span>
                    <span className="profile-stat-unit">jours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="profile-footer">
        <div className="profile-footer-left">
          <span>©Sportsee</span>
          <span>Tous droits réservés</span>
        </div>
        <div className="profile-footer-right">
          <a href="/terms" className="profile-footer-link">Conditions générales</a>
          <a href="/contact" className="profile-footer-link">Contact</a>
          <img src="/images/logo_small.png" alt="Sportsee" className="profile-footer-logo" />
        </div>
      </footer>
    </div>
  );
}

export default ProfilePage;
