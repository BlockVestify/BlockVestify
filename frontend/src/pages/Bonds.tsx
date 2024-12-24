import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const bondTypes = [
  {
    id: 1,
    name: 'Treasury Bond #A123',
    type: 'Government',
    yield: '3.5%',
    maturity: '2025-12-31',
    amount: '$10,000',
    rating: 'AAA',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Corporate Bond #B456',
    type: 'Corporate',
    yield: '5.2%',
    maturity: '2026-06-30',
    amount: '$25,000',
    rating: 'AA',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Municipal Bond #C789',
    type: 'Municipal',
    yield: '4.1%',
    maturity: '2024-09-15',
    amount: '$15,000',
    rating: 'A+',
    status: 'Matured'
  }
];

const Bonds: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bonds</h1>
        <button className="btn-primary">
          <Plus size={20} className="mr-2" />
          New Bond
        </button>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search bonds..."
              className="input pl-10"
            />
          </div>
          <button className="btn-outline">
            <Filter size={20} className="mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Yield</th>
                <th>Maturity</th>
                <th>Amount</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bondTypes.map((bond) => (
                <tr key={bond.id}>
                  <td className="font-medium">{bond.name}</td>
                  <td>{bond.type}</td>
                  <td>{bond.yield}</td>
                  <td>{bond.maturity}</td>
                  <td>{bond.amount}</td>
                  <td>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {bond.rating}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      bond.status === 'Active' 
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      {bond.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bonds;
