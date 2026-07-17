import React from 'react';
import './RadialProgressChart.css';

/**
 * Radial Progress Chart Component
 * Circular progress indicator for weekly goals
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {number} props.completed - Number of completed items
 * @param {number} props.remaining - Number of remaining items
 */
function RadialProgressChart({ progress = 0, completed = 0, remaining = 0 }) {
  // Calculate SVG path for radial progress
  const radius = 81.23; // Half of 162.46px from Figma
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="radial-progress-chart">
      <svg 
        className="radial-svg"
        viewBox="0 0 162.46 162.46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle (light blue) */}
        <circle
          cx="81.23"
          cy="81.23"
          r={radius}
          fill="none"
          stroke="var(--surface-light-blue)"
          strokeWidth="162.46"
          transform="rotate(-90 81.23 81.23)"
        />
        
        {/* Progress circle (blue) */}
        <circle
          cx="81.23"
          cy="81.23"
          r={radius}
          fill="none"
          stroke="var(--surface-blue)"
          strokeWidth="162.46"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 81.23 81.23)"
        />
        
        {/* Dots on the chart */}
        <circle 
          cx="213.14" cy="9.82" 
          r="6.55" 
          fill="var(--surface-light-blue)"
        />
        <circle 
          cx="22.50" cy="133.36" 
          r="6.55" 
          fill="var(--surface-blue)"
        />
      </svg>
      
      {/* Labels */}
      <div className="chart-labels">
        <div className="label label-completed">
          <span className="label-dot dot-completed" />
          <span className="label-text">{completed} réalisées</span>
        </div>
        <div className="label label-remaining">
          <span className="label-dot dot-remaining" />
          <span className="label-text">{remaining} restants</span>
        </div>
      </div>
    </div>
  );
}

export default RadialProgressChart;
