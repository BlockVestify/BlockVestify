import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';
import '../styles/dashboard.css';

const DashboardPage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to BlockVest</h1>
        <p>Hello, {user?.email}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Wallet size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Bonds</h3>
            <p className="stat-value">0</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Investment</h3>
            <p className="stat-value">$0.00</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Portfolio Value</h3>
            <p className="stat-value">$0.00</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section">
          <h2>Recent Activity</h2>
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
