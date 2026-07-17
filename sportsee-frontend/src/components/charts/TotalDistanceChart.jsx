import React from 'react';
import './TotalDistanceChart.css';

/**
 * Total Distance Chart Component
 * Blue flame visualization with distance value
 * @param {Object} props - Component props
 * @param {string|number} props.value - Distance value to display
 * @param {string} props.unit - Unit (default: 'km')
 */
function TotalDistanceChart({ value, unit = 'km' }) {
  // Format value with unit
  const formattedValue = typeof value === 'number' ? value.toFixed(1) : value;
  
  return (
    <div className="total-distance-chart">
      {/* Flame visualization */}
      <div className="flame-container">
        <div className="flame-shape">
          {/* Main flame body */}
          <div className="flame-bar flame-main-1" />
          <div className="flame-bar flame-main-2" />
          <div className="flame-bar flame-main-3" />
          <div className="flame-bar flame-main-4" />
          <div className="flame-bar flame-main-5" />
          
          {/* Small flame details */}
          <div className="flame-bar flame-detail-1" />
          <div className="flame-bar flame-detail-2" />
          <div className="flame-bar flame-detail-3" />
          <div className="flame-bar flame-detail-4" />
          <div className="flame-bar flame-detail-5" />
        </div>
      </div>
      
      {/* Value display */}
      <div className="chart-value">
        {formattedValue} {unit}
      </div>
    </div>
  );
}

export default TotalDistanceChart;
