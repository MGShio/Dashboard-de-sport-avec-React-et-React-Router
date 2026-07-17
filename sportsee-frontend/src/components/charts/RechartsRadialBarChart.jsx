import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';

/**
 * Recharts Radial Bar Chart Component
 * Circular progress indicator using Recharts
 * @param {Object} props - Component props
 * @param {number} props.score - Score value between 0 and 1
 * @param {string} props.fillColor - Color of the progress bar (hex code)
 * @param {string} props.bgColor - Background color (hex code)
 */
function RechartsRadialBarChart({
  score = 0,
  fillColor = '#FF0000',
  bgColor = '#FBFBFB',
}) {
  // Convert score (0-1) to percentage (0-100)
  const percentage = Math.round(score * 100);
  
  const data = [
    { name: 'Score', value: percentage, fill: fillColor },
    { name: 'Background', value: 100 - percentage, fill: bgColor },
  ];

  return (
    <div style={{ width: '100%', height: 250, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="90%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            fillOpacity={1}
          />
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '28px', fontWeight: 'bold', fill: '#000' }}
          >
            {percentage}%
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '14px', fill: '#9B9EAC' }}
          >
            de votre objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsRadialBarChart;
