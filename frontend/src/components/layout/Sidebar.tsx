import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { 
  LayoutDashboard, 
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>BlockVest</h2>
      </div>

      <div className="user-info">
        <p className="user-email">{user?.email}</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item">
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
      </nav>

      <button onClick={logout} className="logout-button">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar; 