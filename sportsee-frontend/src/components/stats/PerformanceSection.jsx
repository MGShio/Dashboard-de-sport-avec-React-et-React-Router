import React from 'react';
import RechartsBarChart from '../charts/RechartsBarChart';
import RechartsLineChart from '../charts/RechartsLineChart';
import RechartsRadarChart from '../charts/RechartsRadarChart';
import RechartsRadialBarChart from '../charts/RechartsRadialBarChart';
import DateRangeSelector from './DateRangeSelector';
import './PerformanceSection.css';

/**
 * Performance Section Component
 * Contains multiple charts for user performance visualization using Recharts
 * @param {Object} props - Component props
 * @param {Array} props.sessionData - Data for distance sessions
 * @param {Array} props.bpmData - Data for BPM/heart rate
 * @param {Array} props.performanceData - Data for radar chart
 * @param {number} props.todayScore - Today's score (0-1)
 */
function PerformanceSection({
  sessionData = [],
  bpmData = [],
  performanceData = [],
  todayScore = 0,
}) {
  // Default mock data for development
  const defaultSessionData = [
    { value: 175, label: 'Lun', name: 'Lun' },
    { value: 262, label: 'Mar', name: 'Mar' },
    { value: 141, label: 'Mer', name: 'Mer' },
    { value: 262, label: 'Jeu', name: 'Jeu' },
    { value: 200, label: 'Ven', name: 'Ven' },
    { value: 180, label: 'Sam', name: 'Sam' },
    { value: 160, label: 'Dim', name: 'Dim' },
  ];

  const defaultBpmData = [
    { sessionLength: 30, day: 1, name: 'Lun' },
    { sessionLength: 40, day: 2, name: 'Mar' },
    { sessionLength: 50, day: 3, name: 'Mer' },
    { sessionLength: 38, day: 4, name: 'Jeu' },
    { sessionLength: 25, day: 5, name: 'Ven' },
    { sessionLength: 45, day: 6, name: 'Sam' },
    { sessionLength: 60, day: 7, name: 'Dim' },
  ];

  const defaultPerformanceData = [
    { value: 80, kind: 1 },
    { value: 75, kind: 2 },
    { value: 90, kind: 3 },
    { value: 65, kind: 4 },
    { value: 85, kind: 5 },
    { value: 70, kind: 6 },
  ];

  // Use provided data or fall back to defaults
  const displaySessionData = sessionData.length > 0 ? sessionData : defaultSessionData;
  const displayBpmData = bpmData.length > 0 ? bpmData : defaultBpmData;
  const displayPerformanceData = performanceData.length > 0 ? performanceData : defaultPerformanceData;

  // Calculate average for display
  const avgDistance = displaySessionData.length > 0
    ? (displaySessionData.reduce((sum, item) => sum + (item.value || 0), 0) / displaySessionData.length).toFixed(0)
    : '18';

  const avgBpm = displayBpmData.length > 0
    ? (displayBpmData.reduce((sum, item) => sum + (item.sessionLength || 0), 0) / displayBpmData.length).toFixed(0)
    : '163';

  return (
    <section className="performance-section">
      <h2 className="section-title">Vos dernières performances</h2>
      
      <div className="charts-container">
        {/* First Row: Bar Charts */}
        <div className="charts-row">
          {/* Distance Sessions Chart */}
          <div className="chart-card recharts-card">
            <div className="chart-header">
              <div className="chart-title-group">
                <span className="chart-value text-blue">{avgDistance}km en moyenne</span>
                <span className="chart-subtitle">
                  Total des kilomètres 4 dernières semaines
                </span>
              </div>
              <DateRangeSelector selectedRange="28 mai - 25 juin" />
            </div>
            <RechartsBarChart
              data={displaySessionData.map(item => ({
                value: item.value || item.distance || 0,
                label: item.label || item.name || item.day || '',
              }))}
              dataKey="value"
              barColor="#282D30"
            />
          </div>
          
          {/* BPM/Heart Rate Chart */}
          <div className="chart-card recharts-card">
            <div className="chart-header">
              <div className="chart-title-group">
                <span className="chart-value text-orange">{avgBpm} BPM</span>
                <span className="chart-subtitle">
                  Fréquence cardiaque moyenne
                </span>
              </div>
              <DateRangeSelector selectedRange="28 mai - 04 juin" />
            </div>
            <RechartsBarChart
              data={displayBpmData.map(item => ({
                value: item.sessionLength || item.value || item.bpm || 0,
                label: item.name || item.label || String(item.day) || '',
              }))}
              dataKey="value"
              barColor="#FF0101"
            />
          </div>
        </div>

        {/* Second Row: Line Chart and Radar Chart */}
        <div className="charts-row">
          {/* Average Sessions Line Chart */}
          <div className="chart-card recharts-card">
            <div className="chart-header">
              <span className="chart-subtitle">Durée moyenne des sessions</span>
            </div>
            <RechartsLineChart
              data={displayBpmData}
              dataKey="sessionLength"
              lineColor="#FF0101"
            />
          </div>
          
          {/* Performance Radar Chart */}
          <div className="chart-card recharts-card">
            <div className="chart-header">
              <span className="chart-subtitle">Performance par catégorie</span>
            </div>
            <RechartsRadarChart
              data={displayPerformanceData}
              dataKey="value"
              nameKey="kind"
              fillColor="rgba(255, 1, 1, 0.7)"
              strokeColor="#FF0101"
            />
          </div>
        </div>

        {/* Today's Score Radial Chart */}
        <div className="charts-row">
          <div className="chart-card recharts-card score-chart">
            <div className="chart-header">
              <span className="chart-subtitle">Score du jour</span>
            </div>
            <RechartsRadialBarChart
              score={todayScore || 0.75}
              fillColor="#FF0101"
              bgColor="#FBFBFB"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerformanceSection;
