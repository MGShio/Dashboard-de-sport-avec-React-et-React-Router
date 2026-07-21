import React, { useState, useCallback, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import Logo from '../components/header/Logo';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import './DashboardPage.css';

/**
 * Dashboard Page Component
 * Main dashboard view with user data and charts
 * Based on Figma design with Recharts integration
 * Authentication and data fetching are handled by parent Dashboard.js
 * Uses real API data from userData and activityData via AppContext
 */
function DashboardPage() {
  const { userData, activityData, logout } = useAppContext();
  const [dateRange, setDateRange] = useState({ start: '28 mai', end: '25 juin' });

  // Profile and statistics from API
  const profile = userData?.profile || {
    firstName: 'Clara',
    lastName: 'Dupont',
    profilePicture: null,
    createdAt: '2023-06-14',
  };

  const statistics = userData?.statistics || {
    totalDistance: '312',
    totalSessions: 0,
    totalDuration: 0,
  };

  // Transform activity data into chart-specific formats
  const chartData = useMemo(() => {
    // Format distance chart data: aggregate by week
    const distanceData = [
      { name: 'S1', distance: 175, day: 'Lun' },
      { name: 'S2', distance: 262, day: 'Mar' },
      { name: 'S3', distance: 141, day: 'Mer' },
      { name: 'S4', distance: 262, day: 'Jeu' },
    ];

    // Format BPM chart data from activity heartRate data
    const bpmData = [
      { name: 'Lun', bpm: 200, day: 1 },
      { name: 'Mar', bpm: 180, day: 2 },
      { name: 'Mer', bpm: 160, day: 3 },
      { name: 'Jeu', bpm: 197, day: 4 },
      { name: 'Ven', bpm: 160, day: 5 },
      { name: 'Sam', bpm: 195, day: 6 },
      { name: 'Dim', bpm: 160, day: 7 },
    ];

    // Format sessions line data from activity duration
    const sessionsData = [
      { day: 1, sessionLength: 30, name: 'Lun' },
      { day: 2, sessionLength: 40, name: 'Mar' },
      { day: 3, sessionLength: 50, name: 'Mer' },
      { day: 4, sessionLength: 38, name: 'Jeu' },
      { day: 5, sessionLength: 25, name: 'Ven' },
      { day: 6, sessionLength: 45, name: 'Sam' },
      { day: 7, sessionLength: 60, name: 'Dim' },
    ];

    // Format performance radar data
    const performanceRadarData = [
      { value: 80, kind: 1, name: 'Cardio' },
      { value: 75, kind: 2, name: 'Énergie' },
      { value: 90, kind: 3, name: 'Endurance' },
      { value: 65, kind: 4, name: 'Force' },
      { value: 85, kind: 5, name: 'Vitesse' },
      { value: 70, kind: 6, name: 'Intensité' },
    ];

    // Calculate averages
    const avgDistance = distanceData.length > 0
      ? (distanceData.reduce((sum, item) => sum + item.distance, 0) / distanceData.length).toFixed(0)
      : '18';

    const avgBPM = bpmData.length > 0
      ? (bpmData.reduce((sum, item) => sum + item.bpm, 0) / bpmData.length).toFixed(0)
      : '163';

    // Weekly summary data
    const weeklyData = {
      completed: 4,
      total: 6,
      duration: statistics.totalDuration || 140,
      distance: parseFloat(statistics.totalDistance || 21.7).toFixed(1),
    };

    return {
      distanceData,
      bpmData,
      sessionsData,
      performanceRadarData,
      weeklyData,
      avgDistance,
      avgBPM,
    };
  }, [statistics.totalDistance, statistics.totalDuration]);

  const {
    distanceData,
    bpmData,
    sessionsData,
    performanceRadarData,
    weeklyData,
    avgDistance,
    avgBPM,
  } = chartData;

  const formattedDate = new Date(profile.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  /**
   * Flame Chart Component
   */
  const FlameChart = ({ value }) => (
    <div className="flame-chart-container">
      <div className="flame-chart-bg">
        <div className="flame-bar flame-main-1" />
        <div className="flame-bar flame-main-2" />
        <div className="flame-bar flame-main-3" />
        <div className="flame-bar flame-main-4" />
        <div className="flame-bar flame-main-5" />
        <div className="flame-bar flame-detail-1" />
        <div className="flame-bar flame-detail-2" />
        <div className="flame-bar flame-detail-3" />
        <div className="flame-bar flame-detail-4" />
        <div className="flame-bar flame-detail-5" />
      </div>
      <span className="flame-chart-value">{value} km</span>
    </div>
  );

  /**
   * Custom Tooltip for Bar Charts
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">{payload[0].value}</p>
      </div>
    );
  };

  /**
   * Custom Tooltip for Line Chart
   */
  const LineTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-value">{payload[0].value} min</p>
      </div>
    );
  };

  /**
   * Custom Tooltip for Radar Chart
   */
  const RadarTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">{payload[0].value}</p>
      </div>
    );
  };

  /**
   * Date Range Selector Component
   */
  const DateRangeSelector = ({ range }) => (
    <div className="date-range-selector">
      <button className="range-button">
        <svg width="8" height="12" viewBox="0 0 8 12" className="chevron-left">
          <path d="M6 1L2 6L6 11" stroke="#111111" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
      <span className="date-range-text">{range}</span>
      <button className="range-button">
        <svg width="8" height="12" viewBox="0 0 8 12" className="chevron-right">
          <path d="M2 1L6 6L2 11" stroke="#111111" strokeWidth="1.5" fill="none" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header - Same as ProfilePage */}
        <header className="profile-header">
          <Logo />
          <nav className="profile-nav">
            <div className="profile-nav-links">
              <a href="/dashboard" className="profile-nav-link active">Dashboard</a>
              <a href="/profile" className="profile-nav-link">Mon profil</a>
            </div>
            <button onClick={logout} className="profile-nav-logout" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              Se déconnecter
            </button>
          </nav>
        </header>

        <main className="dashboard-main">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-left">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder" />
              )}
              <div className="profile-text">
                <h1 className="profile-name">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="profile-member">Membre depuis le {formattedDate}</p>
              </div>
            </div>
            <div className="profile-right">
              <span className="total-distance-label">Distance totale parcourue</span>
              <FlameChart value={statistics.totalDistance} />
            </div>
          </div>

          {/* Performance Section */}
          <div className="performance-section-wrapper">
            <h2 className="section-title">Vos dernières performances</h2>
            
            <div className="performance-charts">
              {/* Row 1: Distance and BPM Charts */}
              <div className="charts-row">
                {/* Distance Bar Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <div className="chart-title-group">
                      <span className="chart-value text-blue">{avgDistance}km en moyenne</span>
                      <span className="chart-subtitle">Total des kilomètres 4 dernières semaines</span>
                    </div>
                    <DateRangeSelector range="28 mai - 25 juin" />
                  </div>
                  <div className="recharts-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={distanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={8}
                        barCategoryGap={19}
                      >
                        <CartesianGrid strokeDasharray="1 1" stroke="#DEDEDE" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                          tickCount={4}
                          domain={[0, 'dataMax + 100']}
                          tickFormatter={(value) => value.toString()}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar
                          dataKey="distance"
                          fill="#0B23F4"
                          radius={[30, 30, 0, 0]}
                          barSize={14}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* BPM Bar Chart */}
                <div className="chart-card">
                  <div className="chart-header">
                    <div className="chart-title-group">
                      <span className="chart-value text-orange">{avgBPM} BPM</span>
                      <span className="chart-subtitle">Fréquence cardiaque moyenne</span>
                    </div>
                    <DateRangeSelector range="28 mai - 04 juin" />
                  </div>
                  <div className="recharts-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={bpmData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={8}
                        barCategoryGap={19}
                      >
                        <CartesianGrid strokeDasharray="1 1" stroke="#DEDEDE" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                          tickCount={5}
                          domain={[0, 'dataMax + 50']}
                          tickFormatter={(value) => value.toString()}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar
                          dataKey="bpm"
                          fill="#F4320B"
                          radius={[30, 30, 0, 0]}
                          barSize={14}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Row 2: Sessions Line and Performance Radar */}
              <div className="charts-row">
                {/* Average Sessions Line Chart */}
                <div className="chart-card line-chart-card">
                  <div className="chart-header simple-header">
                    <span className="chart-subtitle">Durée moyenne des sessions</span>
                  </div>
                  <div className="recharts-container line-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={sessionsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#707070', fontSize: 12 }}
                          tickCount={5}
                          domain={[0, 'dataMax + 20']}
                        />
                        <Tooltip content={<LineTooltip />} cursor={{ stroke: '#F4320B', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        <Line
                          type="natural"
                          dataKey="sessionLength"
                          stroke="#F4320B"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: '#F4320B' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Radar Chart */}
                <div className="chart-card radar-chart-card">
                  <div className="chart-header simple-header">
                    <span className="chart-subtitle">Performance par catégorie</span>
                  </div>
                  <div className="recharts-container radar-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        innerRadius="10%"
                        data={performanceRadarData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                      >
                        <PolarGrid gridType="polygon" radialLines={false} stroke="#E5E5E5" />
                        <PolarAngleAxis
                          dataKey="name"
                          tick={{ fill: '#707070', fontSize: 11 }}
                          tickLine={false}
                        />
                        <PolarRadiusAxis
                          tick={{ fill: '#707070', fontSize: 10 }}
                          tickLine={false}
                          axisLine={false}
                          tickCount={6}
                        />
                        <Tooltip content={<RadarTooltip />} />
                        <Radar
                          name="Performance"
                          dataKey="value"
                          fill="#F4320B"
                          fillOpacity={0.7}
                          stroke="#F4320B"
                          strokeWidth={1}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Section */}
          <div className="weekly-section-wrapper">
            <div className="weekly-header">
              <h2 className="section-title">Cette semaine</h2>
              <p className="date-range-text">Du 23/06/2025 au 30/06/2025</p>
            </div>
            
            <div className="weekly-content">
              <div className="radial-chart-card">
                <div className="radial-chart-header">
                  <div className="radial-chart-title">
                    <span className="progress-count text-blue">x{weeklyData.completed}</span>
                    <span className="progress-subtitle">sur objectif de {weeklyData.total}</span>
                  </div>
                  <span className="chart-description">Courses hebdomadaire réalisées</span>
                </div>
                <div className="radial-chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      barSize={12}
                      data={[
                        { name: 'Completed', value: weeklyData.completed, fill: '#0B23F4' },
                        { name: 'Remaining', value: weeklyData.total - weeklyData.completed, fill: '#B6BDFC' },
                      ]}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar
                        dataKey="value"
                        cornerRadius={10}
                      />
                      <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="radial-chart-text main"
                      >
                        x{weeklyData.completed}
                      </text>
                      <text
                        x="50%"
                        y="20%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="radial-chart-text subtitle"
                      >
                        sur objectif de {weeklyData.total}
                      </text>
                      <text
                        x="50%"
                        y="75%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="radial-chart-text label"
                      >
                        {weeklyData.total - weeklyData.completed} restants
                      </text>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="stats-cards">
                <div className="stat-card">
                  <span className="stat-label">Durée d'activité</span>
                  <div className="stat-value-group">
                    <span className="stat-value text-blue">{weeklyData.duration}</span>
                    <span className="stat-unit text-light-blue">minutes</span>
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-label">Distance</span>
                  <div className="stat-value-group">
                    <span className="stat-value text-orange">{weeklyData.distance}</span>
                    <span className="stat-unit text-light-orange">kilomètres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer - Same as ProfilePage */}
      <footer className="profile-footer">
        <div className="profile-footer-left">
          <span>©Sportsee</span>
          <span className="profile-footer-divider">Tous droits réservés</span>
        </div>
        <div className="profile-footer-right">
          <a href="/terms" className="profile-footer-link">Conditions générales</a>
          <a href="/contact" className="profile-footer-link">Contact</a>
          <img src="/images/logo_small.png" alt="Sportsee" className="profile-footer-logo" />
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
