import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import BondPage from './pages/BondPage';
import BondsPage from './pages/BondsPage';
import InvestmentPage from './pages/InvestmentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';
import { UserProvider, useUser } from './contexts/UserContext';
import './styles/dashboard.css';
import './styles/bond.css';
import './styles/bonds.css';
import './styles/investment.css';
import './styles/analytics.css';
import './styles/loading.css';
import './styles/layout.css';
import './styles/sidebar.css';

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

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <ToastContainer position="top-right" />
        <Routes>
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
                <Layout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/bonds" element={<BondsPage />} />
                    <Route path="/bond/:id" element={<BondPage />} />
                    <Route path="/investments" element={<InvestmentPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;