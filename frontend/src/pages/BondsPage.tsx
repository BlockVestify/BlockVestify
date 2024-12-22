import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { bondService } from '../services/bondService';
import { toast } from 'react-toastify';

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

const BondsPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userBonds, setUserBonds] = useState<Bond[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    maturityDays: '',
    interestRate: ''
  });

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await bondService.connectWallet();
      if (accounts[0]) {
        loadUserBonds(accounts[0]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const loadUserBonds = async (address: string) => {
    try {
      setLoading(true);
      const bondIds = await bondService.getUserBonds(address);
      const bondDetails = await Promise.all(
        bondIds.map(id => bondService.getBondDetails(Number(id)))
      );
      setUserBonds(bondDetails);
    } catch (error) {
      toast.error('Error loading bonds');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseBond = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const maturityTime = Math.floor(Date.now() / 1000) + (Number(formData.maturityDays) * 86400);
      await bondService.purchaseBond(
        formData.name,
        Number(formData.value),
        maturityTime,
        Number(formData.interestRate)
      );
      toast.success('Bond purchased successfully!');
      setShowPurchaseForm(false);
      setFormData({ name: '', value: '', maturityDays: '', interestRate: '' });
      const accounts = await bondService.connectWallet();
      loadUserBonds(accounts[0]);
    } catch (error) {
      toast.error('Error purchasing bond');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bonds-page">
      <div className="bonds-header">
        <h1>Your Bonds Portfolio</h1>
        <button
          onClick={() => setShowPurchaseForm(!showPurchaseForm)}
          className="purchase-button"
        >
          {showPurchaseForm ? 'Cancel' : 'Purchase New Bond'}
        </button>
      </div>

      {showPurchaseForm && (
        <div className="purchase-form">
          <h2>Purchase New Bond</h2>
          <form onSubmit={handlePurchaseBond}>
            <div className="form-group">
              <label>Bond Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Value (ETH)</label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                required
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Maturity Period (Days)</label>
              <input
                type="number"
                name="maturityDays"
                value={formData.maturityDays}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleInputChange}
                required
                min="0"
                max="100"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Purchase Bond'}
            </button>
          </form>
        </div>
      )}

      <div className="bonds-list">
        {loading ? (
          <div className="loading">Loading your bonds...</div>
        ) : userBonds.length === 0 ? (
          <div className="no-bonds">
            <p>You don't have any bonds yet.</p>
            <button onClick={() => setShowPurchaseForm(true)}>
              Purchase Your First Bond
            </button>
          </div>
        ) : (
          <div className="bonds-grid">
            {userBonds.map((bond) => (
              <div 
                key={bond.id} 
                className="bond-card"
                onClick={() => navigate(`/bond/${bond.id}`)}
              >
                <h3>{bond.name}</h3>
                <div className="bond-info">
                  <p>Value: {bond.value} ETH</p>
                  <p>Interest Rate: {bond.interestRate}%</p>
                  <p>Status: {bond.isActive ? 'Active' : 'Inactive'}</p>
                  <p>Maturity: {new Date(Number(bond.maturityTime) * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BondsPage;
