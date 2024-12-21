import React from 'react';
import { useNavigate } from 'react-router-dom';
import { File } from 'lucide-react';

interface Bond {
  id: string;
  name: string;
  type: string;
  value: string;
  maturityDate: string;
  owner: string;
}

const mockBonds: Bond[] = [
  {
    id: '1',
    name: 'Government Bond 2025',
    type: 'Government',
    value: '$10,000',
    maturityDate: '2025-12-31',
    owner: 'John Doe'
  },
  {
    id: '2',
    name: 'Corporate Bond XYZ',
    type: 'Corporate',
    value: '$25,000',
    maturityDate: '2026-06-30',
    owner: 'Jane Smith'
  }
];

const BondList: React.FC = () => {
  const navigate = useNavigate();

  const handleBondClick = (bondId: string) => {
    navigate(`/bond/${bondId}`);
  };

  return (
    <div className="bonds-container">
      <div className="bonds-header">
        <h3>Active Bonds</h3>
      </div>
      
      <div className="bonds-list">
        <div className="bonds-list-header">
          <span>Bond Name</span>
          <span>Owner</span>
          <span>Value</span>
          <span>Maturity Date</span>
        </div>
        
        {mockBonds.map(bond => (
          <div 
            key={bond.id} 
            className="bond-item" 
            onClick={() => handleBondClick(bond.id)}
          >
            <div className="bond-name">
              <File size={20} className="bond-icon" />
              <span>{bond.name}</span>
            </div>
            <div className="bond-owner">{bond.owner}</div>
            <div className="bond-value">{bond.value}</div>
            <div className="bond-date">{bond.maturityDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BondList;
