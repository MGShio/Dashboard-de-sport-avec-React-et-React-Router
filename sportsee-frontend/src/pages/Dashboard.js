import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DashboardLayout from '../components/layout/DashboardLayout';

/**
 * Dashboard Page
 * Main dashboard view with user data
 */
function Dashboard() {
  const navigate = useNavigate();
  const { auth, userData, isLoading, logout } = useAppContext();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  if (isLoading) {
    return (
      <div className="dashboard-layout">
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return <DashboardLayout userData={userData} onLogout={logout} />;
}

export default Dashboard;
