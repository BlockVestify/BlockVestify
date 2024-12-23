import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/bond-purchase.css';

interface Bond {
  id: number;
  name: string;
  type: string;
  value: number;
  rate: number;
  maturity: string;
}

interface BondPurchaseModalProps {
  bond: Bond;
  onClose: () => void;
  onPurchase: (bondId: number, quantity: number) => void;
}

const BondPurchaseModal: React.FC<BondPurchaseModalProps> = ({
  bond,
  onClose,
  onPurchase,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPurchase(bond.id, quantity);
    onClose();
  };

  const totalValue = bond.value * quantity;
  const annualReturn = (totalValue * bond.rate) / 100;
  const maturityDate = new Date(bond.maturity).toLocaleDateString();

  return (
    <div className="modal-overlay">
      <div className="purchase-modal">
        <div className="modal-header">
          <h2>Purchase Bond</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="bond-summary">
          <h3>{bond.name}</h3>
          <div className="bond-type">{bond.type}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <div className="purchase-summary">
            <div className="summary-item">
              <span>Price per Bond</span>
              <span>${bond.value.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="summary-item">
              <span>Interest Rate</span>
              <span>{bond.rate}%</span>
            </div>
            <div className="summary-item">
              <span>Annual Return</span>
              <span>${annualReturn.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Maturity Date</span>
              <span>{maturityDate}</span>
            </div>
            <div className="summary-item total">
              <span>Total Investment</span>
              <span>${totalValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-button">
              Confirm Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BondPurchaseModal;
