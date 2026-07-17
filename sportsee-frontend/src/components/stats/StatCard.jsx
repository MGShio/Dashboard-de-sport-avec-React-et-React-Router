import React from 'react';
import './StatCard.css';

/**
 * Stat Card Component
 * Displays a single statistic value with label
 * @param {Object} props - Component props
 * @param {number|string} props.value - The value to display
 * @param {string} props.unit - The unit (minutes, kilomètres, etc.)
 * @param {string} props.label - The label/description
 * @param {string} props.color - 'blue' or 'orange' for styling
 * @param {boolean} props.filled - If true, uses filled background color
 */
function StatCard({ value, unit = '', label = '', color = 'blue', filled = false }) {
  return (
    <div className={`stat-card stat-card-${color} ${filled ? 'stat-card-filled' : ''}`}>
      <span className="stat-label">{label}</span>
      <div className="stat-value-group">
        <span className={`stat-value ${filled ? 'text-white' : `text-${color}`}`}>{value}</span>
        <span className={`stat-unit ${filled ? 'text-light-blue' : `text-light-${color}`}`}>{unit}</span>
      </div>
    </div>
  );
}

export default StatCard;
