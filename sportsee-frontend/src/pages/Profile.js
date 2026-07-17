import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProfileLayout from '../components/layout/ProfileLayout';

/**
 * Profile Page
 * Displays user profile information and statistics
 */
function Profile() {
  const navigate = useNavigate();
  const { auth, userData, isLoading, logout } = useAppContext();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (isLoading) {
    return (
      <div className="profile-layout">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return <ProfileLayout userData={userData} onLogout={logout} />;
}

export default Profile;
