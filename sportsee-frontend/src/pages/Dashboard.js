import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import DashboardPage from './DashboardPage';

/**
 * Dashboard Page
 * Main dashboard view with user data
 * Handles authentication check and displays loading state
 * Data fetching is managed by AppContext
 */
function Dashboard() {
  const navigate = useNavigate();
  const { auth, isLoading, userData, error } = useAppContext();
  const hasCheckedAuth = useRef(false);

  // Handle authentication redirect
  useEffect(() => {
    if (!hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      if (!auth) {
        navigate('/');
      }
    }
  }, [auth, navigate]);

  // Show loading state while data is being fetched
  if (isLoading && !userData) {
    return (
      <div className="dashboard-page">
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="dashboard-page">
        <p className="error">Erreur: {error}</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!auth) {
    return null;
  }

  return <DashboardPage />;
}

export default Dashboard;
