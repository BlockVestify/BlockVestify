import React from 'react';
import { useUser } from '../contexts/UserContext';
import { formatDistanceToNow } from 'date-fns';

const BondsPage: React.FC = () => {
  const { user } = useUser();

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="bonds-page">
      <header className="header">
        <h2>Your Active Bonds</h2>
        <p className="subtitle">Total Investment: ${user?.totalInvestment.toLocaleString()}</p>
      </header>
      <div className="bonds-content">
        {user?.bonds && user.bonds.length > 0 ? (
          <div className="bonds-grid">
            {user.bonds.map((bond) => (
              <div key={bond.id} className="bond-card">
                <div className="bond-header">
                  <h3>{bond.name}</h3>
                  <span className={`bond-type ${bond.type.toLowerCase()}`}>
                    {bond.type}
                  </span>
                </div>
                <div className="bond-details">
                  <div className="detail-row">
                    <span className="label">Value:</span>
                    <span className="value">${bond.value.toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Purchase Date:</span>
                    <span className="value">{formatDate(bond.purchaseDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Maturity Date:</span>
                    <span className="value">{formatDate(bond.maturityDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bonds">
            <p>You haven't purchased any bonds yet.</p>
            <p>Visit the Investments page to explore available bonds.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BondsPage;
