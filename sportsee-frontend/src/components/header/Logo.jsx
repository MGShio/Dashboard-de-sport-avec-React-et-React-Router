import React from 'react';
import './Logo.css';

/**
 * Logo SportSee - Flame icon with blue bars
 * Based on Figma design
 */
function Logo() {
  return (
    <div className="logo">
      {/* Flame Icon */}
      <div className="logo-flame">
        <div className="flame-bar flame-bar-1" />
        <div className="flame-bar flame-bar-2" />
        <div className="flame-bar flame-bar-3" />
        <div className="flame-bar flame-bar-4" />
        <div className="flame-bar flame-bar-5" />
        <div className="flame-bar flame-bar-6" />
        <div className="flame-bar flame-bar-7" />
        <div className="flame-bar flame-bar-8" />
        <div className="flame-bar flame-bar-9" />
        <div className="flame-bar flame-bar-10" />
      </div>
      
      {/* Blue Bars */}
      <div className="logo-bars">
        <div className="bar bar-1" />
        <div className="bar bar-2" />
        <div className="bar bar-3" />
        <div className="bar bar-4" />
        <div className="bar bar-5" />
        <div className="bar bar-6" />
        <div className="bar bar-7" />
        <div className="bar bar-8" />
      </div>
    </div>
  );
}

export default Logo;
