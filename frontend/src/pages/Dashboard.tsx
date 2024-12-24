import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Investment</span>
            <DollarSign className="stat-card-icon" size={24} />
          </div>
          <div className="stat-card-value">$24,685</div>
          <div className="flex items-center gap-1 mt-2 text-green-500">
            <ArrowUpRight size={16} />
            <span className="text-sm">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Active Bonds</span>
            <Activity className="stat-card-icon" size={24} />
          </div>
          <div className="stat-card-value">12</div>
          <div className="flex items-center gap-1 mt-2 text-green-500">
            <ArrowUpRight size={16} />
            <span className="text-sm">+3 this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Portfolio Value</span>
            <TrendingUp className="stat-card-icon" size={24} />
          </div>
          <div className="stat-card-value">$31,245</div>
          <div className="flex items-center gap-1 mt-2 text-red-500">
            <ArrowDownRight size={16} />
            <span className="text-sm">-2.3%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Users</span>
            <Users className="stat-card-icon" size={24} />
          </div>
          <div className="stat-card-value">1,234</div>
          <div className="flex items-center gap-1 mt-2 text-green-500">
            <ArrowUpRight size={16} />
            <span className="text-sm">+123 new</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-card">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bond</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Treasury Bond #123</td>
                  <td>$5,000</td>
                  <td>2024-01-15</td>
                  <td>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Corporate Bond #456</td>
                  <td>$10,000</td>
                  <td>2024-01-14</td>
                  <td>
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Municipal Bond #789</td>
                  <td>$7,500</td>
                  <td>2024-01-13</td>
                  <td>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="chart-card">
          <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-text-secondary">Chart coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
