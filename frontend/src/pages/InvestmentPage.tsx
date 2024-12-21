import React from 'react';
import { DollarSign, TrendingUp, Clock, Shield } from 'lucide-react';

interface SuggestedBond {
  id: string;
  name: string;
  type: string;
  yield: string;
  maturityPeriod: string;
  minInvestment: string;
  risk: string;
  rating: string;
}

const suggestedBonds: SuggestedBond[] = [
  {
    id: 'gb1',
    name: 'US Treasury Bond 2025',
    type: 'Government',
    yield: '3.5%',
    maturityPeriod: '2 Years',
    minInvestment: '$1,000',
    risk: 'Low',
    rating: 'AAA'
  },
  {
    id: 'cb1',
    name: 'Apple Inc. Corporate Bond',
    type: 'Corporate',
    yield: '4.2%',
    maturityPeriod: '5 Years',
    minInvestment: '$5,000',
    risk: 'Medium',
    rating: 'AA+'
  },
  {
    id: 'mb1',
    name: 'Municipal Infrastructure Bond',
    type: 'Municipal',
    yield: '3.8%',
    maturityPeriod: '3 Years',
    minInvestment: '$2,500',
    risk: 'Low-Medium',
    rating: 'AA'
  }
];

const InvestmentPage: React.FC = () => {
  const handlePurchase = (bondId: string) => {
    // TODO: Implement purchase logic
    console.log(`Initiating purchase for bond: ${bondId}`);
  };

  return (
    <div className="investment-page">
      <header className="header">
        <h2>New Investment Opportunities</h2>
        <p className="subtitle">Discover and invest in new bonds that match your investment goals</p>
      </header>

      <div className="investment-stats">
        <div className="stat-card">
          <DollarSign size={24} />
          <div className="stat-info">
            <h3>Average Yield</h3>
            <p>3.8%</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} />
          <div className="stat-info">
            <h3>Market Trend</h3>
            <p>Upward</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={24} />
          <div className="stat-info">
            <h3>Avg Duration</h3>
            <p>3.3 Years</p>
          </div>
        </div>
        <div className="stat-card">
          <Shield size={24} />
          <div className="stat-info">
            <h3>Risk Level</h3>
            <p>Low-Medium</p>
          </div>
        </div>
      </div>

      <div className="suggested-bonds">
        <h3>Suggested Bonds</h3>
        <div className="bonds-grid">
          {suggestedBonds.map((bond) => (
            <div key={bond.id} className="bond-card">
              <div className="bond-header">
                <h4>{bond.name}</h4>
                <span className={`bond-type ${bond.type.toLowerCase()}`}>{bond.type}</span>
              </div>
              <div className="bond-details">
                <div className="detail-row">
                  <span className="label">Yield:</span>
                  <span className="value highlight">{bond.yield}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Maturity:</span>
                  <span className="value">{bond.maturityPeriod}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Min Investment:</span>
                  <span className="value">{bond.minInvestment}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Risk:</span>
                  <span className="value">{bond.risk}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Rating:</span>
                  <span className="value">{bond.rating}</span>
                </div>
              </div>
              <button 
                className="purchase-button"
                onClick={() => handlePurchase(bond.id)}
              >
                Purchase Bond
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
