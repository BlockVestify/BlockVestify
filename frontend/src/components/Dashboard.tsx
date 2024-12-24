import React, { useState } from 'react';
import Profile from '../pages/Profile';
import '../styles/components.css';

interface DashboardProps {
  // Add any props you need
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'overview':
        return <OverviewSection />;
      case 'transactions':
        return <TransactionsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            BlockVest
          </h1>
        </div>
        <nav className="mt-6">
          <button
            className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-text-secondary hover:bg-primary/5'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
              activeTab === 'profile'
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-text-secondary hover:bg-primary/5'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
              activeTab === 'transactions'
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-text-secondary hover:bg-primary/5'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Overview</h2>
      <div className="responsive-grid">
        {/* Add your overview cards here */}
      </div>
    </div>
  );
};

const TransactionsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="section-title">Transactions</h2>
      <div className="space-y-4">
        {/* Add your transactions list here */}
      </div>
    </div>
  );
};

export default Dashboard;
