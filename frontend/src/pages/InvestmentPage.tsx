import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { web3Service, Bond } from '../services/web3Service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MetaMaskConnect from '../components/MetaMaskConnect';
import '../styles/metamask.css';

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
  const { user } = useUser();
  const navigate = useNavigate();
  const [suggestedBondsState, setSuggestedBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [connectedAddress, setConnectedAddress] = useState<string>('');

  useEffect(() => {
    loadSuggestedBonds();
  }, []);

  const loadSuggestedBonds = () => {
    try {
      const bonds = web3Service.generateRandomBonds(6);
      setSuggestedBonds(bonds);
    } catch (error: any) {
      setError(error.message || 'Failed to load suggested bonds');
    }
  };

  const handleMetaMaskConnect = (address: string) => {
    setConnectedAddress(address);
  };

  const handlePurchase = async (bond: Bond) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!connectedAddress) {
      toast.warn('Please connect your MetaMask wallet first');
      return;
    }

    setSelectedBond(bond);
    setLoading(true);
    setError('');

    try {
      await web3Service.purchaseBond(
        bond.name,
        bond.value,
        bond.maturityTime,
        bond.interestRate,
        connectedAddress
      );
      
      setSuggestedBonds(prev => prev.filter(b => b.id !== bond.id));
      toast.success('Bond purchased successfully!');
      navigate('/bonds');
    } catch (error: any) {
      console.error('Purchase error:', error);
      setError(error.message || 'Failed to purchase bond');
      toast.error(error.message || 'Failed to purchase bond');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="investment-page">
      <div className="page-header">
        <h1>Investment Opportunities</h1>
        <p>Discover and invest in a variety of bonds</p>
      </div>

      {!connectedAddress && (
        <MetaMaskConnect onConnect={handleMetaMaskConnect} />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="bonds-grid">
        {suggestedBondsState.map((bond) => (
          <div key={bond.id} className="bond-card">
            <div className="bond-header">
              <h3>{bond.name}</h3>
              <span className="bond-type">{bond.name.includes('Government') ? 'Government' : 'Corporate'}</span>
            </div>
            <div className="bond-details">
              <div className="detail-row">
                <span>Value:</span>
                <span>${bond.value.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span>Interest Rate:</span>
                <span>{bond.interestRate}%</span>
              </div>
              <div className="detail-row">
                <span>Maturity:</span>
                <span>{new Date(bond.maturityTime).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              className="purchase-button"
              onClick={() => handlePurchase(bond)}
              disabled={loading || !connectedAddress}
            >
              {loading ? 'Processing...' : 'Purchase Bond'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPage;
