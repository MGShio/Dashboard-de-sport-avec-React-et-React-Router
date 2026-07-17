import React from 'react';
import './Logo.css';

/**
 * Logo SportSee
 * Displays the SportSee logo image
 */
function Logo() {
  return (
    <div className="logo">
      <img 
        src="/images/logo.png" 
        alt="SportSee Logo" 
        className="logo-image"
      />
    </div>
  );
}

export default Logo;
