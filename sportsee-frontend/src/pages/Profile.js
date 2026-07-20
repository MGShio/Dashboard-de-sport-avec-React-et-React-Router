import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProfilePage from './ProfilePage';

/**
 * Profile Page
 * Displays user profile information and statistics from API
 */
function Profile() {
  const navigate = useNavigate();
  const { auth, userData, activityData, isLoading, logout } = useAppContext();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return <ProfilePage userData={userData} activityData={activityData} onLogout={logout} />;
}

export default Profile;
