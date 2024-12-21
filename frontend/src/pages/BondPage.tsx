import React from 'react';
import { useParams } from 'react-router-dom';

interface BondPageParams {
  bondId: string;
}

const BondPage: React.FC = () => {
  const { bondId } = useParams<'bondId'>();

  return (
    <div className="bond-page">
      <div className="bond-container">
        <h1>Bond Details</h1>
        <div className="bond-info">
          <h2>Bond ID: {bondId}</h2>
          {/* Add more bond details here */}
          <div className="bond-details">
            <div className="detail-item">
              <span className="label">Type:</span>
              <span className="value">Government Bond</span>
            </div>
            <div className="detail-item">
              <span className="label">Interest Rate:</span>
              <span className="value">5.5%</span>
            </div>
            <div className="detail-item">
              <span className="label">Maturity Date:</span>
              <span className="value">2025-12-31</span>
            </div>
            <div className="detail-item">
              <span className="label">Face Value:</span>
              <span className="value">$10,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondPage;
