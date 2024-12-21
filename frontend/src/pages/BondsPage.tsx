import React from 'react';
import BondList from '../components/bonds/BondList';

const BondsPage: React.FC = () => {
  return (
    <div className="bonds-page">
      <header className="header">
        <h2>Your Active Bonds</h2>
      </header>
      <div className="bonds-content">
        <BondList />
      </div>
    </div>
  );
};

export default BondsPage;
