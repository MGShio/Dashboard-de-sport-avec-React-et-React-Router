import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavLink.css';

/**
 * Navigation link with active state
 * @param {Object} props - Component props
 * @param {string} props.to - Link destination
 * @param {string} props.children - Link text
 */
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
