import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { auth } from '../services/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { User, Bell, Shield, Wallet } from 'lucide-react';
import '../styles/settings.css';

const SettingsPage: React.FC = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || ''
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !user) return;

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: profileForm.displayName
      });

      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profileForm.displayName
      });

      setUser({
        ...user,
        displayName: profileForm.displayName
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">Settings</h1>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="section-header">
            <User size={24} />
            <h2>Profile Settings</h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={profileForm.displayName}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  displayName: e.target.value
                })}
                placeholder="Enter your display name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={profileForm.email}
                disabled
                className="disabled"
              />
              <small>Email cannot be changed</small>
            </div>
            <button type="submit" disabled={loading} className="save-button">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Bell size={24} />
            <h2>Notification Settings</h2>
          </div>
          <div className="settings-options">
            <div className="setting-option">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive updates about your bonds via email</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-option">
              <div>
                <h3>Bond Maturity Alerts</h3>
                <p>Get notified when your bonds are about to mature</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>Security Settings</h2>
          </div>
          <div className="settings-options">
            <div className="setting-option">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Wallet size={24} />
            <h2>Wallet Settings</h2>
          </div>
          <div className="wallet-info">
            <p><strong>Connected Wallet:</strong></p>
            <p className="wallet-address">{user?.uid || 'No wallet connected'}</p>
            <button className="disconnect-button">
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
