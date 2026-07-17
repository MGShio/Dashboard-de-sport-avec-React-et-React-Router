import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

/**
 * Recharts Radar Chart Component
 * Renders a responsive radar chart for performance metrics
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects with value and kind
 * @param {string} props.dataKey - Key for the value in data objects
 * @param {string} props.nameKey - Key for the category name
 * @param {string} props.fillColor - Fill color of the radar area (hex code)
 * @param {string} props.strokeColor - Stroke color of the radar line (hex code)
 */
function RechartsRadarChart({
  data = [],
  dataKey = 'value',
  nameKey = 'kind',
  fillColor = 'rgba(255, 1, 1, 0.7)',
  strokeColor = '#FF0101',
}) {
  // Map kind numbers to French labels
  const kindToLabel = {
    1: 'Cardio',
    2: 'Énergie',
    3: 'Endurance',
    4: 'Force',
    5: 'Vitesse',
    6: 'Intensité',
  };

  // Map kind numbers to positions
  const kindToName = (kind) => {
    if (typeof kind === 'number') {
      return kindToLabel[kind] || String(kind);
    }
    return kind;
  };

  const formattedData = data.map(item => ({
    ...item,
    [nameKey]: kindToName(item[nameKey]),
  }));

  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="70%"
          innerRadius="10%"
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <PolarGrid gridType="polygon" radialLines={false} stroke="#E5E5E5" />
          <PolarAngleAxis
            dataKey={nameKey}
            tick={{ fill: '#9B9EAC', fontSize: 11 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            tick={{ fill: '#9B9EAC', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickCount={6}
          />
          <Radar
            name="Performance"
            dataKey={dataKey}
            fill={fillColor}
            stroke={strokeColor}
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsRadarChart;
