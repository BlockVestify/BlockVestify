import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface BondHolding {
  id: string;
  name: string;
  type: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  yield: number;
  duration: number;
  rating: string;
}

const BondSell = () => {
  const [holdings, setHoldings] = useState<BondHolding[]>([
    {
      id: '1',
      name: 'US Treasury 2025',
      type: 'Government',
      quantity: 100,
      purchasePrice: 980,
      currentPrice: 985,
      yield: 3.5,
      duration: 4.2,
      rating: 'AAA',
    },
    {
      id: '2',
      name: 'Apple Inc. 2026',
      type: 'Corporate',
      quantity: 50,
      purchasePrice: 1020,
      currentPrice: 1050,
      yield: 4.8,
      duration: 5.5,
      rating: 'AA+',
    },
    {
      id: '3',
      name: 'NYC Municipal 2024',
      type: 'Municipal',
      quantity: 75,
      purchasePrice: 990,
      currentPrice: 995,
      yield: 5.2,
      duration: 6.0,
      rating: 'AA',
    },
  ]);

  return (
    <>
      <Breadcrumb pageName="Sell Bonds" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Bond Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Type
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Quantity
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Purchase Price
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Current Price
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Yield
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Duration
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Rating
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((bond, key) => (
                <tr key={bond.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {bond.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{bond.type}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bond.quantity.toLocaleString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      ${bond.purchasePrice.toFixed(2)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`${
                      bond.currentPrice > bond.purchasePrice
                        ? 'text-success'
                        : bond.currentPrice < bond.purchasePrice
                        ? 'text-danger'
                        : 'text-black dark:text-white'
                    }`}>
                      ${bond.currentPrice.toFixed(2)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bond.yield.toFixed(2)}%
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bond.duration.toFixed(1)} years
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{bond.rating}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <span className="inline-flex items-center justify-center gap-2.5 rounded-md bg-danger py-2 px-4 text-center font-medium text-white hover:bg-opacity-90">
                          Sell
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BondSell;
