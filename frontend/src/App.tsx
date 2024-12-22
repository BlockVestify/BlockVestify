import React from 'react';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Widget from './components/Widget';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AssetsList from './components/assets/AssetsList';
import BondPage from './pages/BondPage';
import BondsPage from './pages/BondsPage';
import InvestmentPage from './pages/InvestmentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { UserProvider, useUser } from './contexts/UserContext';
import './styles/dashboard.css';
import './styles/bond.css';
import './styles/bonds.css';
import './styles/investment.css';
import './styles/analytics.css';
import './styles/loading.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const DashboardContent = () => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <header className="header">
        <h2 className="welcome-text">
          Welcome back, {user.username}!
        </h2>
      </header>
      <div className="widgets">
        <Widget
          title="Total Bonds"
          value={user.bonds?.length.toString() || "0"}
          description="Active bonds in your portfolio"
          icon={Users}
        />
        <Widget
          title="Total Value"
          value={`$${user.totalInvestment?.toLocaleString() || "0"}`}
          description="Current portfolio value"
          icon={DollarSign}
        />
        <Widget
          title="Investments"
          value={user.bonds?.length.toString() || "0"}
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
  );
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>One moment please...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route 
              path="/auth" 
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              } 
            />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="dashboard-layout">
                    <Sidebar />
                    <div className="main-content">
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/bonds" element={<BondsPage />} />
                        <Route path="/bond/:bondId" element={<BondPage />} />
                        <Route path="/investments" element={<InvestmentPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;