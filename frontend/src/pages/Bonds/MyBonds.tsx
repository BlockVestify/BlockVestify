import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface BondHolding {
  id: string;
  bondName: string;
  issuer: string;
  type: string;
  purchaseDate: string;
  purchasePrice: number;
  quantity: number;
  currentPrice: number;
  maturityDate: string;
  couponRate: number;
  nextCouponDate: string;
}

const MyBonds = () => {
  const [holdings, setHoldings] = useState<BondHolding[]>([
    {
      id: '1',
      bondName: 'US Treasury Bond 2025',
      issuer: 'U.S. Government',
      type: 'Government',
      purchaseDate: '2023-06-15',
      purchasePrice: 980,
      quantity: 10,
      currentPrice: 985,
      maturityDate: '2025-06-15',
      couponRate: 3.5,
      nextCouponDate: '2024-06-15',
    },
    {
      id: '2',
      bondName: 'Apple Inc. Corporate Bond',
      issuer: 'Apple Inc.',
      type: 'Corporate',
      purchaseDate: '2023-08-20',
      purchasePrice: 1020,
      quantity: 5,
      currentPrice: 1050,
      maturityDate: '2026-08-20',
      couponRate: 4.2,
      nextCouponDate: '2024-02-20',
    },
  ]);

  // Calculate portfolio statistics
  const stats = {
    totalValue: holdings.reduce((acc, bond) => acc + bond.currentPrice * bond.quantity, 0),
    totalGainLoss: holdings.reduce(
      (acc, bond) => acc + (bond.currentPrice - bond.purchasePrice) * bond.quantity,
      0
    ),
    totalBonds: holdings.length,
    averageCouponRate:
      holdings.reduce((acc, bond) => acc + bond.couponRate, 0) / holdings.length,
  };

  return (
    <>
      <Breadcrumb pageName="My Bond Portfolio" />

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
                d="M21 10H1M21 10C21 15.5228 16.5228 20 11 20M21 10C21 4.47715 16.5228 0 11 0M1 10C1 15.5228 5.47715 20 11 20M1 10C1 4.47715 5.47715 0 11 0"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ${stats.totalValue.toLocaleString()}
              </h4>
              <span className="text-sm font-medium">Total Portfolio Value</span>
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
                d="M11 5V21M11 5C11 5 11 3 11 1M11 5C11 5 14 5 17 5M11 5C11 5 8 5 5 5"
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
                ${stats.totalGainLoss.toLocaleString()}
              </h4>
              <span className="text-sm font-medium">Total Gain/Loss</span>
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
                {stats.totalBonds}
              </h4>
              <span className="text-sm font-medium">Total Bond Holdings</span>
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
                {stats.averageCouponRate.toFixed(2)}%
              </h4>
              <span className="text-sm font-medium">Average Coupon Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Bond Details
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Purchase Info
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Current Value
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Gain/Loss
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Next Coupon
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const totalValue = holding.currentPrice * holding.quantity;
                const totalCost = holding.purchasePrice * holding.quantity;
                const gainLoss = totalValue - totalCost;
                const gainLossPercent = ((gainLoss / totalCost) * 100).toFixed(2);

                return (
                  <tr key={holding.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {holding.bondName}
                      </h5>
                      <p className="text-sm">{holding.issuer}</p>
                      <span className={`text-sm ${
                        holding.type === 'Government'
                          ? 'text-success'
                          : holding.type === 'Corporate'
                          ? 'text-primary'
                          : 'text-warning'
                      }`}>
                        {holding.type}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${holding.purchasePrice.toLocaleString()}
                      </p>
                      <p className="text-sm">Qty: {holding.quantity}</p>
                      <p className="text-sm">{new Date(holding.purchaseDate).toLocaleDateString()}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${totalValue.toLocaleString()}
                      </p>
                      <p className="text-sm">${holding.currentPrice.toLocaleString()} per unit</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className={`${gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                        ${gainLoss.toLocaleString()} ({gainLossPercent}%)
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {new Date(holding.nextCouponDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">{holding.couponRate}% rate</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBonds;
