import React from 'react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Widget from './components/Widget';
import SignupPage from './pages/SignupPage';
import AssetsList from './components/assets/AssetsList';
import BondList from './components/bonds/BondList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BondPage from './pages/BondPage';
import BondsPage from './pages/BondsPage';
import InvestmentPage from './pages/InvestmentPage';
import './styles/dashboard.css';
import './styles/bond.css';
import './styles/bonds.css';
import './styles/investment.css';

function App() {
  // Temporary toggle for demo purposes
  const showSignup = false;

  if (showSignup) {
    return <SignupPage />;
  }

  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <header className="header">
                  <h2 className="welcome-text">Welcome back, Admin</h2>
                </header>
                <div className="widgets">
                  <Widget 
                    title="Total Bonds"
                    value="15"
                    description="Active bonds in your portfolio"
                    icon={Users}
                  />
                  <Widget 
                    title="Total Value"
                    value="$250,000"
                    description="Current portfolio value"
                    icon={DollarSign}
                  />
                  <Widget 
                    title="Investments"
                    value="8"
                    description="Active investments"
                    icon={ShoppingCart}
                  />
                  <Widget 
                    title="Returns"
                    value="+12.5%"
                    description="Portfolio performance"
                    icon={TrendingUp}
                  />
                </div>
                <div className="main-lists">
                  <div className="assets-section">
                    <h3>Your Assets</h3>
                    <AssetsList />
                  </div>
                </div>
              </>
            } />
            <Route path="/bonds" element={<BondsPage />} />
            <Route path="/bond/:bondId" element={<BondPage />} />
            <Route path="/investments" element={<InvestmentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;