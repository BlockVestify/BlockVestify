import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { web3Service, Bond } from '../services/web3Service';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const userBonds = await web3Service.getUserBonds(user!.uid);
      setBonds(userBonds);
    } catch (error: any) {
      setError(error.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = () => {
    return bonds.reduce((total, bond) => total + (bond.currentValue || bond.value), 0);
  };

  const calculateTotalReturns = () => {
    return bonds.reduce((total, bond) => {
      const returns = ((bond.currentValue || bond.value) - bond.value);
      return total + returns;
    }, 0);
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const totalValue = calculateTotalValue();
  const totalReturns = calculateTotalReturns();
  const returnPercentage = ((totalReturns / totalValue) * 100).toFixed(2);

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h2>Welcome, {user?.displayName || 'Investor'}!</h2>
        <p>Here's your investment overview</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Bonds</h3>
            <p className="value">{bonds.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <p className="value">${totalValue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Returns</h3>
            <p className="value">${totalReturns.toLocaleString()} ({returnPercentage}%)</p>
          </div>
        </div>

        <div className="recent-assets">
          <div className="section-header">
            <h3>Your Assets</h3>
            <Link to="/bonds" className="view-all">View All</Link>
          </div>
          <div className="assets-grid">
            {bonds.slice(0, 3).map(bond => (
              <div key={bond.id} className="asset-card">
                <h4>{bond.name}</h4>
                <div className="asset-details">
                  <p>Purchase Date: {new Date(bond.purchaseTime * 1000).toLocaleDateString()}</p>
                  <p>Current Value: ${(bond.currentValue || bond.value).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {bonds.length === 0 && (
              <div className="no-assets">
                <p>You don't have any bonds yet.</p>
                <Link to="/investments" className="browse-button">
                  Browse Available Bonds
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
