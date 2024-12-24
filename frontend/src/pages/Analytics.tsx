import React from 'react';
import { Calendar, Download } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex gap-4">
          <button className="btn-outline">
            <Calendar size={20} className="mr-2" />
            Last 30 Days
          </button>
          <button className="btn-secondary">
            <Download size={20} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Total Returns</span>
          </div>
          <div className="stat-card-value">+15.4%</div>
          <div className="text-sm text-text-secondary mt-2">vs. last period</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Average Yield</span>
          </div>
          <div className="stat-card-value">4.2%</div>
          <div className="text-sm text-text-secondary mt-2">across all bonds</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Risk Score</span>
          </div>
          <div className="stat-card-value">B+</div>
          <div className="text-sm text-text-secondary mt-2">moderate risk</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Portfolio Health</span>
          </div>
          <div className="stat-card-value">92%</div>
          <div className="text-sm text-text-secondary mt-2">excellent</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-card">
          <h2 className="text-xl font-semibold mb-4">Returns Over Time</h2>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-text-secondary">Chart coming soon...</p>
          </div>
        </div>

        <div className="chart-card">
          <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-text-secondary">Chart coming soon...</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Change</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sharpe Ratio</td>
                <td>1.23</td>
                <td className="text-green-500">+0.12</td>
                <td>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Good
                  </span>
                </td>
              </tr>
              <tr>
                <td>Alpha</td>
                <td>0.45</td>
                <td className="text-red-500">-0.03</td>
                <td>
                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                    Moderate
                  </span>
                </td>
              </tr>
              <tr>
                <td>Beta</td>
                <td>0.92</td>
                <td className="text-green-500">+0.05</td>
                <td>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Good
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
