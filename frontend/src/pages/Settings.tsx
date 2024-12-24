import React, { useState } from 'react';
import { Bell, Shield, CreditCard, User } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64">
          <div className="card">
            <nav className="flex flex-col gap-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    activeTab === id
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-background hover:text-primary'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          <div className="card">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label" htmlFor="name">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      placeholder="Enter your display name"
                    />
                  </div>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label" htmlFor="current-password">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="input"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="new-password">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="input"
                      placeholder="Enter new password"
                    />
                  </div>
                  <button className="btn-primary">Change Password</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-text-secondary">
                        Receive email updates about your account
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-text-secondary">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <p className="text-text-secondary">
                  No payment methods added yet.
                </p>
                <button className="btn-primary">
                  <CreditCard size={20} className="mr-2" />
                  Add Payment Method
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
