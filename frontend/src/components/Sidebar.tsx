import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Settings, BarChart2, Newspaper } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const openBondsNews = () => {
    window.open('https://www.bloomberg.com/markets/rates-bonds', '_blank');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <LayoutDashboard size={24} />
        <h1>Dashboard</h1>
      </div>
      <nav className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/bonds" className={`nav-link ${location.pathname === '/bonds' ? 'active' : ''}`}>
          <Users size={20} />
          <span>Your Bonds</span>
        </Link>
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
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;