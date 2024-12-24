import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet,
  LineChart,
  Settings
} from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>BlockVest</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink 
          to="/bonds" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Wallet size={20} />
          Bonds
        </NavLink>

        <NavLink 
          to="/analytics" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LineChart size={20} />
          Analytics
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;