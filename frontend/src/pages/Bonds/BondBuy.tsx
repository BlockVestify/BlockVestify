import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Bond {
  id: string;
  name: string;
  type: string;
  price: number;
  yield: number;
  duration: number;
  rating: string;
  available: number;
  issuer: string;
  maturityDate: string;
  couponRate: number;
  minimumQuantity: number;
  description: string;
}

const BondBuy = () => {
  const [availableBonds, setAvailableBonds] = useState<Bond[]>([
    {
      id: '1',
      name: 'US Treasury 2025',
      type: 'Government',
      price: 985,
      yield: 3.5,
      duration: 4.2,
      rating: 'AAA',
      available: 1000,
      issuer: 'U.S. Department of the Treasury',
      maturityDate: '2025-12-31',
      couponRate: 3.25,
      minimumQuantity: 1,
      description: 'A low-risk government bond with steady returns and full faith and credit of the U.S. government.'
    },
    {
      id: '2',
      name: 'Apple Inc. 2026',
      type: 'Corporate',
      price: 1020,
      yield: 4.8,
      duration: 5.5,
      rating: 'AA+',
      available: 500,
      issuer: 'Apple Inc.',
      maturityDate: '2026-06-15',
      couponRate: 4.5,
      minimumQuantity: 5,
      description: 'High-grade corporate bond from one of the world\'s leading technology companies.'
    },
    {
      id: '3',
      name: 'NYC Municipal 2024',
      type: 'Municipal',
      price: 995,
      yield: 5.2,
      duration: 6.0,
      rating: 'AA',
      available: 750,
      issuer: 'New York City',
      maturityDate: '2024-09-30',
      couponRate: 5.0,
      minimumQuantity: 10,
      description: 'Tax-exempt municipal bond supporting New York City infrastructure projects.'
    }
  ]);

  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('yield');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState<number | ''>('');

  const filteredBonds = availableBonds
    .filter(bond => 
      bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bond.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bond.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(bond => filterType === 'all' ? true : bond.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'yield':
          return b.yield - a.yield;
        case 'price':
          return a.price - b.price;
        case 'rating':
          return a.rating.localeCompare(b.rating);
        case 'duration':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

  const handleBondSelect = (bond: Bond) => {
    setSelectedBond(bond);
    setQuantity(bond.minimumQuantity);
  };

  const calculateTotalCost = () => {
    if (!selectedBond || !quantity) return 0;
    const price = orderType === 'market' ? selectedBond.price : (limitPrice || selectedBond.price);
    return price * quantity;
  };

  const handleBuySubmit = () => {
    if (!selectedBond || !quantity) return;
    // Implement buy logic here
    alert(`Order placed for ${quantity} units of ${selectedBond.name}`);
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Buy Bonds" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* Search and Filters */}
        <div className="col-span-full rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2.5 block text-black dark:text-white">Search</label>
              <input
                type="text"
                placeholder="Search bonds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-2.5 block text-black dark:text-white">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Corporate">Corporate</option>
                <option value="Municipal">Municipal</option>
              </select>
            </div>

            <div>
              <label className="mb-2.5 block text-black dark:text-white">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="yield">Yield</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Available Bonds List */}
        <div className="col-span-2 rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Available Bonds</h2>
          <div className="grid grid-cols-1 gap-4">
            {filteredBonds.map((bond) => (
              <div
                key={bond.id}
                className={`rounded-sm border p-4 cursor-pointer transition-colors ${
                  selectedBond?.id === bond.id
                    ? 'border-primary bg-gray-50 dark:bg-boxdark-2'
                    : 'border-stroke dark:border-strokedark'
                }`}
                onClick={() => handleBondSelect(bond)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{bond.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{bond.issuer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-black dark:text-white">${bond.price.toFixed(2)}</p>
                    <p className="text-sm text-success">{bond.yield.toFixed(2)}% Yield</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Type: <span className="text-black dark:text-white">{bond.type}</span></p>
                    <p className="text-gray-600 dark:text-gray-400">Rating: <span className="text-black dark:text-white">{bond.rating}</span></p>
                    <p className="text-gray-600 dark:text-gray-400">Duration: <span className="text-black dark:text-white">{bond.duration} years</span></p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Maturity: <span className="text-black dark:text-white">{bond.maturityDate}</span></p>
                    <p className="text-gray-600 dark:text-gray-400">Coupon: <span className="text-black dark:text-white">{bond.couponRate}%</span></p>
                    <p className="text-gray-600 dark:text-gray-400">Available: <span className="text-black dark:text-white">{bond.available} units</span></p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{bond.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Place Order</h2>
          {selectedBond ? (
            <div className="space-y-4">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Order Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={orderType === 'market'}
                      onChange={() => setOrderType('market')}
                      className="mr-2"
                    />
                    Market Order
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={orderType === 'limit'}
                      onChange={() => setOrderType('limit')}
                      className="mr-2"
                    />
                    Limit Order
                  </label>
                </div>
              </div>

              {orderType === 'limit' && (
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">Limit Price ($)</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    min={0}
                    step="0.01"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              )}

              <div>
                <label className="mb-2.5 block text-black dark:text-white">Quantity (Min: {selectedBond.minimumQuantity})</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={selectedBond.minimumQuantity}
                  max={selectedBond.available}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Bond Price:</span>
                    <span className="text-black dark:text-white">${orderType === 'market' ? selectedBond.price.toFixed(2) : (limitPrice || selectedBond.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                    <span className="text-black dark:text-white">{quantity}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                    <span className="text-black dark:text-white">${calculateTotalCost().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBuySubmit}
                disabled={!quantity || quantity < selectedBond.minimumQuantity || quantity > selectedBond.available}
                className="w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50"
              >
                Place Order
              </button>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Select a bond to place an order</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BondBuy;
