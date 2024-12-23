import React from 'react';
import { TrendingUp, DollarSign, Clock, Activity } from 'lucide-react';
import '../styles/analytics.css';

const AnalyticsPage: React.FC = () => {
  const mockData = {
    totalInvestment: 4500,
    totalReturns: 325,
    averageRate: 5.8,
    activeBonds: 3
  };

  const mockChartData = [
    { month: 'Jan', value: 1000 },
    { month: 'Feb', value: 1200 },
    { month: 'Mar', value: 1100 },
    { month: 'Apr', value: 1400 },
    { month: 'May', value: 1300 },
    { month: 'Jun', value: 1600 }
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Track your investment performance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Investment</h3>
            <p className="stat-value">${mockData.totalInvestment.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Returns</h3>
            <p className="stat-value">${mockData.totalReturns.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Interest Rate</h3>
            <p className="stat-value">{mockData.averageRate}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Bonds</h3>
            <p className="stat-value">{mockData.activeBonds}</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Portfolio Growth</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {mockChartData.map((data, index) => (
                <div 
                  key={index} 
                  className="chart-bar"
                  style={{ height: `${(data.value / 1600) * 100}%` }}
                >
                  <span className="bar-value">${data.value}</span>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Investment Distribution</h3>
          <div className="distribution-list">
            <div className="distribution-item">
              <div className="item-info">
                <span className="item-label">Government Bonds</span>
                <span className="item-value">45%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '45%', backgroundColor: '#3b82f6' }}></div>
              </div>
            </div>
            <div className="distribution-item">
              <div className="item-info">
                <span className="item-label">Corporate Bonds</span>
                <span className="item-value">35%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '35%', backgroundColor: '#10b981' }}></div>
              </div>
            </div>
            <div className="distribution-item">
              <div className="item-info">
                <span className="item-label">Municipal Bonds</span>
                <span className="item-value">20%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '20%', backgroundColor: '#f59e0b' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
