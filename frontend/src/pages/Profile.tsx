import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import '../styles/profile.css';

interface UserProfile {
  name: string;
  email: string;
  walletAddress: string;
  balance: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const Profile: React.FC = () => {
  const [profile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    walletAddress: '0x1234...5678',
    balance: '1.234 ETH',
    transactions: [
      {
        id: '1',
        type: 'receive',
        amount: '0.5 ETH',
        date: '2024-12-24',
        status: 'completed'
      },
      {
        id: '2',
        type: 'send',
        amount: '0.3 ETH',
        date: '2024-12-23',
        status: 'completed'
      }
    ]
  });

  return (
    <div className="profile-section fade-in">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="profile-header gradient-primary text-white">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="profile-avatar w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-white/80">{profile.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Wallet Information */}
        <div className="responsive-grid">
          <Card className="wallet-card bg-surface">
            <CardContent className="responsive-padding">
              <h2 className="section-title">Wallet Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-secondary">Address</label>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{profile.walletAddress}</span>
                    <button 
                      className="button button-primary"
                      onClick={() => navigator.clipboard.writeText(profile.walletAddress)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-text-secondary">Balance</label>
                  <p className="text-2xl font-bold text-primary">{profile.balance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="wallet-card bg-surface">
            <CardContent className="responsive-padding">
              <h2 className="section-title">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="quick-action button button-primary">
                  Send
                </button>
                <button className="quick-action button button-secondary">
                  Receive
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-surface">
          <CardContent className="responsive-padding">
            <h2 className="section-title">Recent Transactions</h2>
            <div className="space-y-4">
              {profile.transactions.map((tx) => (
                <div 
                  key={tx.id}
                  className="transaction-item flex items-center justify-between p-4 rounded-lg bg-background"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`transaction-icon w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'receive' ? 'receive' : 'send'
                    }`}>
                      {tx.type === 'receive' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="font-medium">{tx.type === 'receive' ? 'Received' : 'Sent'}</p>
                      <p className="text-sm text-text-secondary">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      tx.type === 'receive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'receive' ? '+' : '-'}{tx.amount}
                    </p>
                    <p className="text-sm text-text-secondary capitalize">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
