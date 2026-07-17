import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * Recharts Line Chart Component
 * Renders a responsive line chart for average sessions
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects with sessionLength and day
 * @param {string} props.dataKey - Key for the value in data objects
 * @param {string} props.lineColor - Color of the line (hex code)
 * @param {string} props.title - Chart title
 */
function RechartsLineChart({
  data = [],
  dataKey = 'sessionLength',
  lineColor = '#FF0000',
  title = '',
}) {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#9B9EAC', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: '#9B9EAC', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 'dataMax + 50']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            itemStyle={{ color: '#000' }}
          />
          <Legend wrapperStyle={{ color: '#9B9EAC' }} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4, fill: lineColor }}
            activeDot={{ r: 6, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsLineChart;
