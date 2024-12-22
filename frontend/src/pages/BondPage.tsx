import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bondService } from '../services/bondService';
import { toast } from 'react-toastify';

interface BondDetails {
  id: string;
  name: string;
  value: string;
  purchaseTime: string;
  maturityTime: string;
  interestRate: string;
  owner: string;
  isActive: boolean;
}

const BondPage: React.FC = () => {
  const { bondId } = useParams<'bondId'>();
  const navigate = useNavigate();
  const [bond, setBond] = useState<BondDetails | null>(null);
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBondDetails();
  }, [bondId]);

  const loadBondDetails = async () => {
    if (!bondId) return;
    
    try {
      setLoading(true);
      const details = await bondService.getBondDetails(Number(bondId));
      setBond(details);
      const value = await bondService.calculateCurrentValue(Number(bondId));
      setCurrentValue(value);
    } catch (error) {
      toast.error('Error loading bond details');
      navigate('/bonds');
    } finally {
      setLoading(false);
    }
  };

  const handleSellBond = async () => {
    if (!bondId) return;
    
    try {
      setLoading(true);
      await bondService.sellBond(Number(bondId));
      toast.success('Bond sold successfully!');
      navigate('/bonds');
    } catch (error) {
      toast.error('Error selling bond');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bond-page">
        <div className="bond-container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!bond) {
    return (
      <div className="bond-page">
        <div className="bond-container">
          <h1>Bond not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bond-page">
      <div className="bond-container">
        <h1>Bond Details</h1>
        <div className="bond-info">
          <h2>{bond.name}</h2>
          <div className="bond-details">
            <div className="detail-item">
              <span className="label">Bond ID:</span>
              <span className="value">{bondId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Initial Value:</span>
              <span className="value">{bond.value} ETH</span>
            </div>
            <div className="detail-item">
              <span className="label">Current Value:</span>
              <span className="value">{currentValue} ETH</span>
            </div>
            <div className="detail-item">
              <span className="label">Interest Rate:</span>
              <span className="value">{bond.interestRate}%</span>
            </div>
            <div className="detail-item">
              <span className="label">Purchase Date:</span>
              <span className="value">
                {new Date(Number(bond.purchaseTime) * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Maturity Date:</span>
              <span className="value">
                {new Date(Number(bond.maturityTime) * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Status:</span>
              <span className="value">{bond.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          
          {bond.isActive && (
            <div className="bond-actions">
              <button 
                onClick={handleSellBond}
                disabled={loading}
                className="sell-button"
              >
                {loading ? 'Processing...' : 'Sell Bond'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BondPage;
