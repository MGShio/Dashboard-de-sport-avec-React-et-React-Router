import React from 'react';
import RadialProgressChart from '../charts/RadialProgressChart';
import StatCard from './StatCard';
import './WeeklySummary.css';

/**
 * Weekly Summary Section Component
 * Shows weekly goal progress and stats
 * @param {Object} props - Component props
 * @param {number} props.completedSessions - Number of completed sessions
 * @param {number} props.totalSessions - Total sessions goal
 * @param {number} props.averageDuration - Average duration in minutes
 * @param {number} props.totalDistance - Total distance in km
 */
function WeeklySummary({
  completedSessions = 4,
  totalSessions = 6,
  averageDuration = 140,
  totalDistance = 21.7,
}) {
  const progress = (completedSessions / totalSessions) * 100;
  const remainingSessions = totalSessions - completedSessions;

  return (
    <section className="weekly-summary">
      <div className="summary-header">
        <h2 className="section-title">Cette semaine</h2>
        <p className="date-range">Du 23/06/2025 au 30/06/2025</p>
      </div>
      
      <div className="summary-content">
        {/* Radial Progress Chart */}
        <div className="radial-chart-card">
          <div className="radial-chart-header">
            <div className="radial-chart-title">
              <span className="progress-count text-blue">x{completedSessions}</span>
              <span className="progress-subtitle">
                sur objectif de {totalSessions}
              </span>
            </div>
            <span className="chart-description">
              Courses hebdomadaire réalisées
            </span>
          </div>
          <RadialProgressChart 
            progress={progress}
            completed={completedSessions}
            remaining={remainingSessions}
          />
        </div>
        
        {/* Stats Cards */}
        <div className="stats-cards">
          <StatCard 
            value={averageDuration}
            unit="minutes"
            label="Durée d'activité"
            color="blue"
          />
          <StatCard 
            value={totalDistance}
            unit="kilomètres"
            label="Distance"
            color="orange"
          />
        </div>
      </div>
    </section>
  );
}

export default WeeklySummary;
