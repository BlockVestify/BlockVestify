import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { web3Service, Bond } from '../services/web3Service';

const BondsPage: React.FC = () => {
  const { user } = useUser();
  const [userBonds, setUserBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (user) {
      loadUserBonds();
    }
  }, [user]);

  const loadUserBonds = async () => {
    setLoading(true);
    try {
      const bonds = await web3Service.getUserBonds(user!.uid);
      setUserBonds(bonds);
      
      // Calculate total value
      const total = bonds.reduce((sum, bond) => sum + (bond.currentValue || 0), 0);
      setTotalValue(total);
    } catch (error: any) {
      setError(error.message || 'Failed to load bonds');
    } finally {
      setLoading(false);
    }
  };

  const handleSell = async (bondId: string) => {
    if (!window.confirm('Are you sure you want to sell this bond?')) {
      return;
    }

    setLoading(true);
    try {
      await web3Service.sellBond(bondId, user!.uid);
      await loadUserBonds(); // Refresh bonds list
      alert('Bond sold successfully!');
    } catch (error: any) {
      setError(error.message || 'Failed to sell bond');
    } finally {
      setLoading(false);
    }
  };

  const calculateReturns = (bond: Bond) => {
    const currentValue = bond.currentValue || 0;
    const originalValue = bond.value;
    const returnPercentage = ((currentValue - originalValue) / originalValue) * 100;
    return returnPercentage.toFixed(2);
  };

  if (loading) {
    return <div className="loading">Loading your bonds...</div>;
  }

  return (
    <div className="bonds-page">
      <div className="bonds-header">
        <h2>Your Active Bonds</h2>
        <div className="total-value">
          Total Investment Value: ${totalValue.toLocaleString()}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="bonds-grid">
        {userBonds.map(bond => (
          <div key={bond.id} className="bond-card">
            <h3>{bond.name}</h3>
            <div className="bond-details">
              <p>Purchase Value: ${bond.value}</p>
              <p>Current Value: ${bond.currentValue}</p>
              <p>Returns: {calculateReturns(bond)}%</p>
              <p>Interest Rate: {bond.interestRate}%</p>
              <p>Purchase Date: {new Date(bond.purchaseTime * 1000).toLocaleDateString()}</p>
              <p>Maturity Date: {new Date(bond.maturityTime * 1000).toLocaleDateString()}</p>
              <button
                onClick={() => handleSell(bond.id)}
                disabled={loading}
                className="sell-button"
              >
                {loading ? 'Processing...' : 'Sell Bond'}
              </button>
            </div>
          </div>
        ))}

        {userBonds.length === 0 && (
          <div className="no-bonds">
            <p>You don't have any active bonds.</p>
            <a href="/investments" className="browse-button">
              Browse Available Bonds
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BondsPage;
