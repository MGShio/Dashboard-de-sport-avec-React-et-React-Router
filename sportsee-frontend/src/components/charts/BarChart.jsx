import React from 'react';
import './BarChart.css';

/**
 * Bar Chart Component for Performance Data
 * Renders vertical bars with labels
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of {value, label} objects
 * @param {string} props.color - 'blue' or 'orange'
 * @param {string} props.legendLabel - Label for legend
 */
function BarChart({ data = [], color = 'blue', legendLabel = '' }) {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const chartHeight = 262;

  return (
    <div className={`bar-chart bar-chart-${color}`}>
      <div className="chart-inner">
        {/* Y-Axis */}
        <div className="y-axis">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round(maxValue * 0.66)}</span>
          <span>{Math.round(maxValue * 0.33)}</span>
          <span>0</span>
        </div>
        
        {/* Bars Area */}
        <div className="bars-area">
          {data.map((item, index) => (
            <div 
              key={index}
              className="bar-wrapper"
            >
              <div 
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * chartHeight}px`,
                }}
              />
            </div>
          ))}
          
          {/* Grid Lines */}
          <div className="grid-line horizontal" />
          <div className="grid-line vertical" />
        </div>
        
        {/* X-Axis */}
        <div className="x-axis">
          {data.map((item, index) => (
            <span key={index} className="x-label">{item.label}</span>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className={`legend-marker legend-marker-${color}`} />
          <span className="legend-text">{legendLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default BarChart;
