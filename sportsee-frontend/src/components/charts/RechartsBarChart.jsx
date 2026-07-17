import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * Recharts Bar Chart Component
 * Renders a responsive bar chart using Recharts library
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of data objects with value and label
 * @param {string} props.dataKey - Key for the value in data objects
 * @param {string} props.barColor - Color of the bars (hex code)
 * @param {string} props.title - Chart title
 * @param {string} props.xAxisKey - Key for X-axis labels
 */
function RechartsBarChart({
  data = [],
  dataKey = 'value',
  barColor = '#0000FF',
  title = '',
  xAxisKey = 'label',
}) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis dataKey={xAxisKey} tick={{ fill: '#9B9EAC', fontSize: 12 }} />
          <YAxis tick={{ fill: '#9B9EAC', fontSize: 12 }} />
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
          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={[4, 4, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsBarChart;
