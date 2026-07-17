import React from 'react';
import Logo from '../header/Logo';
import './Footer.css';

/**
 * Dashboard Footer Component
 */
function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        {/* Left side - Copyright */}
        <div className="footer-left">
          <span>©Sportsee</span>
          <span className="footer-divider">Tous droits réservés</span>
        </div>
        
        {/* Right side - Links */}
        <div className="footer-right">
          <a href="/terms" className="footer-link">Conditions générales</a>
          <a href="/contact" className="footer-link">Contact</a>
          <Logo className="footer-logo" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
