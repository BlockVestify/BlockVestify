import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  BarChart2, 
  Newspaper,
  LogOut,
  User,
  Wallet,
  TrendingUp
} from 'lucide-react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/sidebar.css';

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setUser(null);
      }
    });

    // Get wallet address from MetaMask
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      }
    };
    getWalletAddress();

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openBondsNews = () => {
    window.open('https://www.bloomberg.com/markets/rates-bonds', '_blank');
  };

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || '?';
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <LayoutDashboard size={24} />
        <h1>BlockVest</h1>
      </div>

      <nav className="nav-links">
        <div className="nav-section-title">Main Menu</div>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/bonds" className={`nav-link ${location.pathname === '/bonds' ? 'active' : ''}`}>
          <Users size={20} />
          <span>Your Bonds</span>
        </Link>

        <div className="nav-section-title">Market & Analysis</div>
        <div className="nav-link" onClick={openBondsNews} style={{ cursor: 'pointer' }}>
          <Newspaper size={20} />
          <span>Bonds News</span>
        </div>
        <Link to="/investments" className={`nav-link ${location.pathname === '/investments' ? 'active' : ''}`}>
          <ShoppingCart size={20} />
          <span>Investments</span>
        </Link>
        <Link to="/analytics" className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
          <BarChart2 size={20} />
          <span>Analytics</span>
        </Link>
        <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>
          <TrendingUp size={20} />
          <span>Portfolio</span>
        </Link>

        <div className="nav-section-title">Settings</div>
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <div className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </nav>

      <div className="user-section">
        <div className="user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="user" />
          ) : (
            getUserInitials()
          )}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.displayName || user?.email}</div>
          <div className="user-role">Investor</div>
          {walletAddress && (
            <div className="wallet-status">
              <div className="status-dot"></div>
              <Wallet size={14} />
              <span>{truncateAddress(walletAddress)}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;