import React from 'react';
import { LayoutDashboard, Users, ShoppingCart, Settings, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <LayoutDashboard size={24} />
        <h1>Dashboard</h1>
      </div>
      <nav className="nav-links">
        <a href="#" className="nav-link">
          <LayoutDashboard size={20} />
          Dashboard
        </a>
        <a href="#" className="nav-link">
          <Users size={20} />
          Bonds  
        </a>
        <a href="#" className="nav-link">
          <ShoppingCart size={20} />
          Investments
        </a>
        <a href="#" className="nav-link">
          <BarChart2 size={20} />
          Analytics
        </a>
        <a href="#" className="nav-link">
          <Settings size={20} />
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;