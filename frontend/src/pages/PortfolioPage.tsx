import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { bondService } from '../services/bondService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface Bond {
  id: number;
  name: string;
  value: string;
  purchaseTime: string;
  maturityTime: string;
  interestRate: string;
  owner: string;
  isActive: boolean;
}

interface PortfolioStats {
  totalValue: number;
  totalBonds: number;
  averageInterestRate: number;
  totalReturns: number;
}

const PortfolioPage: React.FC = () => {
  const { user } = useUser();
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 0,
    totalBonds: 0,
    averageInterestRate: 0,
    totalReturns: 0
  });

  useEffect(() => {
    const loadPortfolioData = async () => {
      if (user) {
        try {
          // Load user's bonds
          const bondIds = await bondService.getUserBonds(user.uid);
          const bondDetails = await Promise.all(
            bondIds.map(id => bondService.getBondDetails(Number(id)))
          );
          setBonds(bondDetails);

          // Calculate portfolio statistics
          const totalValue = bondDetails.reduce((sum, bond) => 
            sum + parseFloat(bond.value), 0);
          const avgInterestRate = bondDetails.reduce((sum, bond) => 
            sum + parseFloat(bond.interestRate), 0) / bondDetails.length || 0;
          
          setStats({
            totalValue,
            totalBonds: bondDetails.length,
            averageInterestRate: avgInterestRate,
            totalReturns: totalValue * (avgInterestRate / 100)
          });
        } catch (error) {
          console.error('Error loading portfolio data:', error);
        }
      }
    };

    loadPortfolioData();
  }, [user]);

  const performanceData = [
    { name: 'Jan', value: 1000 },
    { name: 'Feb', value: 1200 },
    { name: 'Mar', value: 1100 },
    { name: 'Apr', value: 1400 },
    { name: 'May', value: 1300 },
    { name: 'Jun', value: 1600 }
  ];

  return (
    <div className="portfolio-page">
      <h1 className="page-title">Portfolio Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Wallet size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Value</h3>
            <p className="stat-value">${stats.totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Interest Rate</h3>
            <p className="stat-value">{stats.averageInterestRate.toFixed(2)}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Returns</h3>
            <p className="stat-value">${stats.totalReturns.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Bonds</h3>
            <p className="stat-value">{stats.totalBonds}</p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Portfolio Performance</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#00f5a0" 
                strokeWidth={2}
                dot={{ fill: '#00f5a0' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bonds-list">
        <h2>Your Bonds</h2>
        <div className="bonds-grid">
          {bonds.map(bond => (
            <div key={bond.id} className="bond-card">
              <h3>{bond.name}</h3>
              <div className="bond-details">
                <p>Value: ${parseFloat(bond.value).toFixed(2)}</p>
                <p>Interest Rate: {bond.interestRate}%</p>
                <p>Maturity: {new Date(parseInt(bond.maturityTime)).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
