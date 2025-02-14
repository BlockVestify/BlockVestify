import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, SignupPage } from './pages';
import { Layout } from './components/layout';
import { UserProvider, useUser } from './contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import { BarChart3, Users, Wallet } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import './styles/auth.css';
import './styles/sidebar.css';

const DashboardContent: React.FC = () => {
  const { user } = useUser();

  const stats = [
    {
      title: 'Total Balance',
      value: '$10,234.50',
      icon: Wallet,
      color: 'text-blue-500'
    },
    {
      title: 'Active Investments',
      value: '3',
      icon: BarChart3,
      color: 'text-green-500'
    },
    {
      title: 'Portfolio Growth',
      value: '+15.3%',
      icon: Users,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <Icon className={`${stat.color} w-6 h-6`} />
              </div>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Investment Deposit</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <span className="text-green-500 font-medium">+$500.00</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Bond Purchase</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
            <span className="text-blue-500 font-medium">$1,000.00</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Interest Earned</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </div>
            <span className="text-green-500 font-medium">+$25.50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardContent />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </Router>
  );
};

export default App;