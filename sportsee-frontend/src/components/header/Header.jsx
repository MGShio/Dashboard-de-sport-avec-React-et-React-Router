import React from 'react';
import Logo from './Logo';
import NavLink from './NavLink';
import './Header.css';

/**
 * Dashboard Header Component
 * Contains logo, navigation, and logout button
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler from context
 */
function Header({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-content">
        {/* Logo */}
        <Logo />
        
        {/* Navigation */}
        <nav className="header-nav">
          <div className="nav-links">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/profile">Mon profil</NavLink>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Se déconnecter
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
