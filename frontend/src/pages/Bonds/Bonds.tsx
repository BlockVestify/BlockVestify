import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Bond {
  id: string;
  name: string;
  type: string;
  issuer: string;
  rating: string;
  couponRate: number;
  maturityDate: string;
  yieldToMaturity: number;
  minInvestment: number;
  availableUnits: number;
  price: number;
  currency: string;
  description?: string;
  riskLevel?: string;
  paymentFrequency?: string;
  nextPaymentDate?: string;
  totalIssuanceSize?: number;
  issueDate?: string;
}

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'yield' | 'rating' | 'maturity' | 'price'>('yield');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Sample bonds data
  const bonds: Bond[] = [
    {
      id: '1',
      name: 'US Treasury Bond 2034',
      type: 'Government',
      issuer: 'U.S. Treasury',
      rating: 'AAA',
      couponRate: 4.25,
      maturityDate: '2034-12-31',
      yieldToMaturity: 4.35,
      minInvestment: 1000,
      availableUnits: 10000,
      price: 98.5,
      currency: 'USD',
      description: 'Long-term U.S. government debt security with a 10-year maturity. Known for their safety and reliability as they are backed by the full faith and credit of the U.S. government.',
      riskLevel: 'Very Low',
      paymentFrequency: 'Semi-annual',
      nextPaymentDate: '2024-06-30',
      totalIssuanceSize: 1000000000,
      issueDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Apple Inc. Corporate Bond',
      type: 'Corporate',
      issuer: 'Apple Inc.',
      rating: 'AA+',
      couponRate: 3.85,
      maturityDate: '2029-12-31',
      yieldToMaturity: 4.15,
      minInvestment: 5000,
      availableUnits: 5000,
      price: 97.8,
      currency: 'USD',
      description: 'Corporate bond issued by Apple Inc. to fund general corporate purposes. Backed by the company\'s strong financial position and consistent cash flows.',
      riskLevel: 'Low',
      paymentFrequency: 'Quarterly',
      nextPaymentDate: '2024-03-31',
      totalIssuanceSize: 500000000,
      issueDate: '2023-12-31'
    },
    {
      id: '3',
      name: 'Municipal Bond CA 2030',
      type: 'Municipal',
      issuer: 'State of California',
      rating: 'AA',
      couponRate: 3.95,
      maturityDate: '2030-06-30',
      yieldToMaturity: 4.05,
      minInvestment: 2500,
      availableUnits: 7500,
      price: 99.2,
      currency: 'USD',
      description: 'Municipal bond issued by the State of California to fund infrastructure projects. Backed by the state\'s strong credit rating and stable financial position.',
      riskLevel: 'Low',
      paymentFrequency: 'Semi-annual',
      nextPaymentDate: '2024-06-30',
      totalIssuanceSize: 750000000,
      issueDate: '2023-06-30'
    },
    {
      id: '4',
      name: 'Microsoft Corp Bond 2028',
      type: 'Corporate',
      issuer: 'Microsoft Corporation',
      rating: 'AAA',
      couponRate: 3.75,
      maturityDate: '2028-12-31',
      yieldToMaturity: 3.95,
      minInvestment: 5000,
      availableUnits: 4000,
      price: 98.9,
      currency: 'USD',
      description: 'Corporate bond issued by Microsoft Corporation to fund general corporate purposes. Backed by the company\'s strong financial position and consistent cash flows.',
      riskLevel: 'Very Low',
      paymentFrequency: 'Quarterly',
      nextPaymentDate: '2024-03-31',
      totalIssuanceSize: 400000000,
      issueDate: '2023-12-31'
    },
    {
      id: '5',
      name: 'German Govt Bond 2033',
      type: 'Government',
      issuer: 'German Government',
      rating: 'AAA',
      couponRate: 2.85,
      maturityDate: '2033-12-31',
      yieldToMaturity: 3.05,
      minInvestment: 1000,
      availableUnits: 15000,
      price: 96.5,
      currency: 'EUR',
      description: 'Long-term German government debt security with a 10-year maturity. Known for their safety and reliability as they are backed by the full faith and credit of the German government.',
      riskLevel: 'Very Low',
      paymentFrequency: 'Semi-annual',
      nextPaymentDate: '2024-06-30',
      totalIssuanceSize: 1500000000,
      issueDate: '2024-01-01'
    }
  ];

  const filteredBonds = bonds.filter((bond) => {
    const matchesSearch = bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bond.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || bond.type === selectedType;
    const matchesRating = selectedRating === 'all' || bond.rating === selectedRating;
    return matchesSearch && matchesType && matchesRating;
  });

  const stats = {
    totalBonds: filteredBonds.length,
    averageYield: filteredBonds.reduce((acc, bond) => acc + bond.yieldToMaturity, 0) / filteredBonds.length,
    highestRatedBonds: filteredBonds.filter(bond => bond.rating === 'AAA').length,
    totalInvestmentAmount: filteredBonds.reduce((acc, bond) => acc + bond.minInvestment, 0),
  };

  const sortBonds = (bonds: Bond[]) => {
    return [...bonds].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'yield':
          comparison = a.yieldToMaturity - b.yieldToMaturity;
          break;
        case 'rating':
          comparison = b.rating.localeCompare(a.rating);
          break;
        case 'maturity':
          comparison = new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime();
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const sortedBonds = sortBonds(filteredBonds);

  const handleBuyClick = (bondId: string) => {
    console.log('Buy clicked for bond:', bondId);
  };

  const handleViewDetails = (bond: Bond) => {
    setSelectedBond(bond);
    setShowModal(true);
  };

  const getBondTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'government':
        return 'bg-success';
      case 'corporate':
        return 'bg-primary';
      case 'municipal':
        return 'bg-warning';
      default:
        return 'bg-meta-5';
    }
  };

  const renderListView = () => (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
              Bond Name
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
              Type
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Rating
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Coupon Rate
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              YTM
            </th>
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              Price
            </th>
            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
              Min Investment
            </th>
            <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedBonds.map((bond) => (
            <tr key={bond.id}>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex flex-col gap-1">
                  <h5 className="font-medium text-black dark:text-white">
                    {bond.name}
                  </h5>
                  <p className="text-sm">{bond.issuer}</p>
                  <p className="text-sm">Maturity: {bond.maturityDate}</p>
                </div>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <span className={`inline-flex rounded-full ${getBondTypeColor(bond.type)} bg-opacity-10 px-3 py-1 text-sm font-medium ${getBondTypeColor(bond.type).replace('bg-', 'text-')}`}>
                  {bond.type}
                </span>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <span className="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary">
                  {bond.rating}
                </span>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {bond.couponRate}%
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {bond.yieldToMaturity}%
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {bond.price}%
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {bond.currency} {bond.minInvestment.toLocaleString()}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleViewDetails(bond)}
                    className="inline-flex rounded bg-meta-3 px-3 py-1 font-medium text-white hover:bg-opacity-90"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleBuyClick(bond.id)}
                    className="inline-flex rounded bg-primary px-3 py-1 font-medium text-gray hover:bg-opacity-90"
                  >
                    Buy
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedBonds.map((bond) => (
        <div
          key={bond.id}
          className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className={`inline-flex rounded-full ${getBondTypeColor(bond.type)} bg-opacity-10 px-3 py-1 text-sm font-medium ${getBondTypeColor(bond.type).replace('bg-', 'text-')}`}>
              {bond.type}
            </span>
            <span className="inline-flex rounded-full bg-primary bg-opacity-10 px-3 py-1 text-sm font-medium text-primary">
              {bond.rating}
            </span>
          </div>

          <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
            {bond.name}
          </h4>
          <p className="mb-4 text-sm text-body">{bond.issuer}</p>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-medium text-black dark:text-white">Coupon Rate</span>
              <span className="text-xl font-semibold text-primary">{bond.couponRate}%</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-black dark:text-white">YTM</span>
              <span className="text-xl font-semibold text-meta-3">{bond.yieldToMaturity}%</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-black dark:text-white">Price</span>
              <span className="text-xl font-semibold text-meta-5">{bond.price}%</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-black dark:text-white">Min Investment</span>
              <span className="text-lg font-semibold text-black dark:text-white">
                {bond.currency} {bond.minInvestment.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleViewDetails(bond)}
              className="inline-flex w-full justify-center rounded bg-meta-3 px-3 py-2 font-medium text-white hover:bg-opacity-90"
            >
              View Details
            </button>
            <button
              onClick={() => handleBuyClick(bond.id)}
              className="inline-flex w-full justify-center rounded bg-primary px-3 py-2 font-medium text-gray hover:bg-opacity-90"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Breadcrumb pageName="Bonds Marketplace" />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-6">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10H1M21 10C21 15.5228 16.5228 20 11 20M21 10C21 4.47715 16.5228 0 11 0M1 10C1 15.5228 5.47715 20 11 20M1 10C1 4.47715 5.47715 0 11 0M11 0C13.5013 4.18858 14.9228 7.10817 15.7402 10M11 0C8.49872 4.18858 7.07725 7.10817 6.25975 10M15.7402 10C16.5576 12.8918 17.9791 15.8114 20.4804 20M15.7402 10C14.9228 12.8918 13.5013 15.8114 11 20M6.25975 10C5.44225 12.8918 4.02078 15.8114 1.51947 20M6.25975 10C7.07725 12.8918 8.49872 15.8114 11 20"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {stats.totalBonds}
              </h4>
              <span className="text-sm font-medium">Available Bonds</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5V21M11 5C11 5 11 3 11 1M11 5C11 5 14 5 17 5M11 5C11 5 8 5 5 5M17 5V3.5C17 2.67157 16.3284 2 15.5 2H6.5C5.67157 2 5 2.67157 5 3.5V5M17 5L19 7M5 5L3 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {stats.averageYield.toFixed(2)}%
              </h4>
              <span className="text-sm font-medium">Average Yield</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 11H1L11 1L21 11H14V20C14 20.5523 13.5523 21 13 21H9C8.44772 21 8 20.5523 8 20V11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {stats.highestRatedBonds}
              </h4>
              <span className="text-sm font-medium">AAA-Rated Bonds</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 21V3C1 1.89543 1.89543 1 3 1H19C20.1046 1 21 1.89543 21 3V21L11 15L1 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ${stats.totalInvestmentAmount.toLocaleString()}
              </h4>
              <span className="text-sm font-medium">Total Investment Amount</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
            <div className="col-span-1 md:col-span-2">
              <input
                type="text"
                placeholder="Search bonds by name or issuer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('list')}
                className={`rounded p-2 hover:bg-gray-2 dark:hover:bg-meta-4 ${
                  viewMode === 'list' ? 'bg-gray-2 dark:bg-meta-4' : ''
                }`}
                title="List View"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded p-2 hover:bg-gray-2 dark:hover:bg-meta-4 ${
                  viewMode === 'grid' ? 'bg-gray-2 dark:bg-meta-4' : ''
                }`}
                title="Grid View"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Corporate">Corporate</option>
                <option value="Municipal">Municipal</option>
              </select>
            </div>
            <div>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="all">All Ratings</option>
                <option value="AAA">AAA</option>
                <option value="AA+">AA+</option>
                <option value="AA">AA</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="yield">Sort by Yield</option>
                <option value="rating">Sort by Rating</option>
                <option value="maturity">Sort by Maturity</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bonds Display */}
        {viewMode === 'list' ? renderListView() : renderGridView()}
      </div>

      {/* Bond Details Modal */}
      {showModal && selectedBond && (
        <div className="fixed inset-0 z-999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl p-4 md:p-6">
            <div className="relative rounded-lg bg-white p-4 shadow dark:bg-boxdark md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Bond Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {selectedBond.name}
                    </h4>
                    <p className="text-sm text-body">{selectedBond.description}</p>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
                    <h5 className="mb-3 text-base font-medium text-black dark:text-white">
                      Key Information
                    </h5>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Issuer</span>
                        <span>{selectedBond.issuer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Type</span>
                        <span>{selectedBond.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Rating</span>
                        <span>{selectedBond.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Risk Level</span>
                        <span>{selectedBond.riskLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
                    <h5 className="mb-3 text-base font-medium text-black dark:text-white">
                      Financial Details
                    </h5>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Coupon Rate</span>
                        <span>{selectedBond.couponRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Yield to Maturity</span>
                        <span>{selectedBond.yieldToMaturity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Price</span>
                        <span>{selectedBond.price}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Min Investment</span>
                        <span>{selectedBond.currency} {selectedBond.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Available Units</span>
                        <span>{selectedBond.availableUnits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Issuance</span>
                        <span>{selectedBond.currency} {selectedBond.totalIssuanceSize?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
                    <h5 className="mb-3 text-base font-medium text-black dark:text-white">
                      Payment Schedule
                    </h5>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Payment Frequency</span>
                        <span>{selectedBond.paymentFrequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Next Payment Date</span>
                        <span>{selectedBond.nextPaymentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Issue Date</span>
                        <span>{selectedBond.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Maturity Date</span>
                        <span>{selectedBond.maturityDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => handleBuyClick(selectedBond.id)}
                  className="rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bonds;
