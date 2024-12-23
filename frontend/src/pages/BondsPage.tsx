import React, { useState } from 'react';
import { Plus, ArrowUpDown, Search } from 'lucide-react';
import BondPurchaseModal from '../components/BondPurchaseModal';
import '../styles/bonds.css';

interface Bond {
  id: number;
  name: string;
  type: string;
  value: number;
  rate: number;
  maturity: string;
}

const BondsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);

  const mockBonds = [
    {
      id: 1,
      name: 'Government Bond A',
      type: 'Government',
      value: 100,
      rate: 5.5,
      maturity: '2025-12-31'
    },
    {
      id: 2,
      name: 'Corporate Bond B',
      type: 'Corporate',
      value: 2000,
      rate: 7.2,
      maturity: '2026-06-30'
    },
    {
      id: 3,
      name: 'Municipal Bond C',
      type: 'Municipal',
      value: 1500,
      rate: 4.8,
      maturity: '2024-09-15'
    }
  ];

  const handleInvest = (bond: Bond) => {
    setSelectedBond(bond);
  };

  const handlePurchase = (bondId: number, quantity: number) => {
    // Here you would typically handle the purchase transaction
    console.log(`Purchasing ${quantity} of bond ${bondId}`);
  };

  const filteredBonds = mockBonds.filter(bond => 
    bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bond.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bonds-page">
      <div className="bonds-header">
        <h1>Bonds Market</h1>
        <div className="bonds-actions">
          <div className="search-box">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search bonds..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <ArrowUpDown size={20} />
            Filter
          </button>
          <button className="add-button">
            <Plus size={20} />
            Add Bond
          </button>
        </div>
      </div>

      <div className="bonds-grid">
        {filteredBonds.map(bond => (
          <div key={bond.id} className="bond-card">
            <div className="bond-header">
              <h3>{bond.name}</h3>
              <span className="bond-type">{bond.type}</span>
            </div>
            <div className="bond-details">
              <div className="detail-item">
                <span className="label">Value</span>
                <span className="value">${bond.value.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Interest Rate</span>
                <span className="value">{bond.rate}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Maturity Date</span>
                <span className="value">{new Date(bond.maturity).toLocaleDateString()}</span>
              </div>
            </div>
            <button 
              className="invest-button"
              onClick={() => handleInvest(bond)}
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>

      {selectedBond && (
        <BondPurchaseModal
          bond={selectedBond}
          onClose={() => setSelectedBond(null)}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
};

export default BondsPage;
