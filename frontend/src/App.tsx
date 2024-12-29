import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import BondTrading from './pages/Dashboard/BondTrading';
import Portfolio from './pages/Portfolio/Portfolio';
import BondOrders from './pages/Bonds/BondOrders';
import BondDashboard from './pages/Bonds/BondDashboard';
import BondAnalysis from './pages/Bonds/BondAnalysis';
import BondBuy from './pages/Bonds/BondBuy';
import BondSell from './pages/Bonds/BondSell';
import RiskManagement from './pages/RiskManagement/RiskManagement';
import News from './pages/News/News';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="BlockVest | Sign In" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="BlockVest | Sign Up" />
              <SignUp />
            </>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<BondTrading />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/bonds" element={<BondDashboard />} />
          <Route path="/bonds/orders" element={<BondOrders />} />
          <Route path="/bonds/analysis" element={<BondAnalysis />} />
          <Route path="/bonds/buy" element={<BondBuy />} />
          <Route path="/bonds/sell" element={<BondSell />} />
          <Route path="/risk" element={<RiskManagement />} />
          <Route path="/news" element={<News />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
