import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { web3Service, Bond } from '../services/web3Service';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const AnalyticsPage: React.FC = () => {
  const { user } = useUser();
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadBondData();
    }
  }, [user]);

  const loadBondData = async () => {
    if (!user) return;

    try {
      const accounts = await web3Service.getAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error('No blockchain account available');
      }

      const userBonds = await web3Service.getUserBonds(accounts[0]);
      setBonds(userBonds);
    } catch (error: any) {
      setError(error.message || 'Failed to load bond data');
    } finally {
      setLoading(false);
    }
  };

  const calculateBondTypeDistribution = () => {
    const distribution = bonds.reduce((acc, bond) => {
      const type = bond.name.includes('Government') ? 'Government' : 'Corporate';
      acc[type] = (acc[type] || 0) + (bond.currentValue || bond.value);
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);
    const total = data.reduce((sum, value) => sum + value, 0);
    const percentages = data.map(value => ((value / total) * 100).toFixed(1));

    return {
      labels: labels.map((label, i) => `${label} (${percentages[i]}%)`),
      datasets: [{
        data,
        backgroundColor: ['#3b82f6', '#ef4444'],
        borderColor: ['#2563eb', '#dc2626'],
        borderWidth: 1,
      }],
    };
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
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  const totalValue = calculateTotalValue();
  const totalReturns = calculateTotalReturns();
  const returnPercentage = totalValue > 0 ? ((totalReturns / totalValue) * 100).toFixed(2) : '0.00';

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h2>Portfolio Analytics</h2>
        <p>Track your investment performance and portfolio distribution</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Portfolio Value</h3>
          <p className="value">${totalValue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Returns</h3>
          <p className={`value ${totalReturns >= 0 ? 'positive' : 'negative'}`}>
            {totalReturns >= 0 ? '+' : ''}{totalReturns.toLocaleString()} ({returnPercentage}%)
          </p>
        </div>
        <div className="stat-card">
          <h3>Active Bonds</h3>
          <p className="value">{bonds.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        {bonds.length > 0 ? (
          <div className="chart-card">
            <h3>Bond Type Distribution</h3>
            <div className="chart-container">
              <Pie 
                data={calculateBondTypeDistribution()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        font: {
                          size: 12
                        },
                        padding: 20
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.raw as number;
                          return ` $${value.toLocaleString()}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="no-data-message">
            <p>No bonds in your portfolio to display analytics.</p>
          </div>
        )}
      </div>

      <div className="bonds-list">
        <h3>Bond Details</h3>
        {bonds.length > 0 ? (
          <div className="table-container">
            <table className="bonds-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purchase Value</th>
                  <th>Current Value</th>
                  <th>Returns</th>
                  <th>Maturity Date</th>
                </tr>
              </thead>
              <tbody>
                {bonds.map(bond => {
                  const returns = ((bond.currentValue || bond.value) - bond.value);
                  const returnsPercentage = ((returns / bond.value) * 100).toFixed(2);
                  
                  return (
                    <tr key={bond.id}>
                      <td>{bond.name}</td>
                      <td>${bond.value.toLocaleString()}</td>
                      <td>${(bond.currentValue || bond.value).toLocaleString()}</td>
                      <td className={returns >= 0 ? 'positive' : 'negative'}>
                        {returns >= 0 ? '+' : ''}{returnsPercentage}%
                      </td>
                      <td>{new Date(bond.maturityTime).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data-message">
            <p>No bonds to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
