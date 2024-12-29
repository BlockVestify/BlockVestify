import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface PortfolioMetrics {
  totalValue: number;
  averageYield: number;
  averageDuration: number;
  riskScore: number;
}

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

const BondDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: 250000,
    averageYield: 4.5,
    averageDuration: 5.2,
    riskScore: 3.2,
  });

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

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-danger">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mb-6">
        <Breadcrumb pageName="Bond Dashboard" />
        
        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to="/bonds/analysis"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </span>
            Bond Analysis
          </Link>

          <Link
            to="/bonds/buy"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-4 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </span>
            Buy Bonds
          </Link>

          <Link
            to="/bonds/sell"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-warning py-4 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            Sell Bonds
          </Link>
        </div>
      </div>

      {/* Portfolio Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.1281 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2187 19.8687 10.7875 19.4375 10.7875 18.9031C10.7875 18.3687 11.2187 17.9375 11.7531 17.9375C12.2875 17.9375 12.7187 18.3687 12.7187 18.9031C12.7187 19.4375 12.2875 19.8687 11.7531 19.8687Z"
                fill=""
              />
              <path
                d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.59683 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.68745 19.8687 4.25621 19.4375 4.25621 18.9031C4.25621 18.3687 4.68745 17.9375 5.22183 17.9375C5.75621 17.9375 6.18745 18.3687 6.18745 18.9031C6.18745 19.4375 5.75621 19.8687 5.22183 19.8687Z"
                fill=""
              />
              <path
                d="M16.2875 11.3437L13.3375 10.2687C12.7375 10.0437 12.0375 10.3937 11.8125 10.9937L10.7375 13.9437C10.5125 14.5437 10.8625 15.2437 11.4625 15.4687L14.4125 16.5437C15.0125 16.7687 15.7125 16.4187 15.9375 15.8187L17.0125 12.8687C17.2375 12.2937 16.8875 11.5687 16.2875 11.3437ZM14.7875 15.1687L11.8375 14.0937L12.9125 11.1437L15.8625 12.2187L14.7875 15.1687Z"
                fill=""
              />
              <path
                d="M19.5375 5.61875L14.3875 0.46875C13.8125 -0.10625 12.8875 -0.10625 12.3125 0.46875L0.4625 12.3188C0.1625 12.6188 0 13.0437 0 13.4687V18.6187C0 19.4937 0.7125 20.2062 1.5875 20.2062H6.7375C7.1625 20.2062 7.5875 20.0437 7.8875 19.7437L19.7375 7.89375C20.3125 7.31875 20.3125 6.39375 19.5375 5.61875ZM7.1875 18.2812L6.7375 18.7312H1.5875V13.5812L11.6125 3.55625L16.6625 8.60625L7.1875 18.2812Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ${metrics.totalValue.toLocaleString()}
              </h4>
              <span className="text-sm font-medium">Total Portfolio Value</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2875 11.3437L13.3375 10.2687C12.7375 10.0437 12.0375 10.3937 11.8125 10.9937L10.7375 13.9437C10.5125 14.5437 10.8625 15.2437 11.4625 15.4687L14.4125 16.5437C15.0125 16.7687 15.7125 16.4187 15.9375 15.8187L17.0125 12.8687C17.2375 12.2937 16.8875 11.5687 16.2875 11.3437ZM14.7875 15.1687L11.8375 14.0937L12.9125 11.1437L15.8625 12.2187L14.7875 15.1687Z"
                fill=""
              />
              <path
                d="M19.5375 5.61875L14.3875 0.46875C13.8125 -0.10625 12.8875 -0.10625 12.3125 0.46875L0.4625 12.3188C0.1625 12.6188 0 13.0437 0 13.4687V18.6187C0 19.4937 0.7125 20.2062 1.5875 20.2062H6.7375C7.1625 20.2062 7.5875 20.0437 7.8875 19.7437L19.7375 7.89375C20.3125 7.31875 20.3125 6.39375 19.5375 5.61875ZM7.1875 18.2812L6.7375 18.7312H1.5875V13.5812L11.6125 3.55625L16.6625 8.60625L7.1875 18.2812Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {metrics.averageYield.toFixed(2)}%
              </h4>
              <span className="text-sm font-medium">Average Yield</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9375 9.89375L14.1125 5.06875C13.8375 4.79375 13.4625 4.79375 13.1875 5.06875L11.9375 6.31875C11.6625 6.59375 11.6625 6.96875 11.9375 7.24375L16.7625 12.0687C17.0375 12.3437 17.4125 12.3437 17.6875 12.0687L18.9375 10.8187C19.2125 10.5437 19.2125 10.1687 18.9375 9.89375Z"
                fill=""
              />
              <path
                d="M14.9375 12.9688L10.1125 8.14375C9.8375 7.86875 9.4625 7.86875 9.1875 8.14375L7.9375 9.39375C7.6625 9.66875 7.6625 10.0438 7.9375 10.3188L12.7625 15.1438C13.0375 15.4188 13.4125 15.4188 13.6875 15.1438L14.9375 13.8938C15.2125 13.6188 15.2125 13.2438 14.9375 12.9688Z"
                fill=""
              />
              <path
                d="M10.9375 15.9688L6.1125 11.1438C5.8375 10.8688 5.4625 10.8688 5.1875 11.1438L3.9375 12.3938C3.6625 12.6688 3.6625 13.0438 3.9375 13.3188L8.7625 18.1438C9.0375 18.4188 9.4125 18.4188 9.6875 18.1438L10.9375 16.8938C11.2125 16.6188 11.2125 16.2438 10.9375 15.9688Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {metrics.averageDuration.toFixed(1)} years
              </h4>
              <span className="text-sm font-medium">Average Duration</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 16.0937C9.3125 16.0937 8.75 16.6562 8.75 17.3437V18.4375C8.75 19.125 9.3125 19.6875 10 19.6875C10.6875 19.6875 11.25 19.125 11.25 18.4375V17.3437C11.25 16.6562 10.6875 16.0937 10 16.0937Z"
                fill=""
              />
              <path
                d="M15.4375 7.15625L11.5625 3.28125C11.0625 2.78125 10.5625 2.5 10 2.5C9.4375 2.5 8.9375 2.78125 8.4375 3.28125L4.5625 7.15625C3.5625 8.15625 3 9.46875 3 10.8437V16.5625C3 18.7812 4.78125 20.5625 7 20.5625H13C15.2188 20.5625 17 18.7812 17 16.5625V10.8437C17 9.46875 16.4375 8.15625 15.4375 7.15625ZM15.5 16.5625C15.5 17.9375 14.375 19.0625 13 19.0625H7C5.625 19.0625 4.5 17.9375 4.5 16.5625V10.8437C4.5 9.90625 4.875 9 5.5625 8.3125L9.4375 4.4375C9.65625 4.21875 9.8125 4.15625 10 4.15625C10.1875 4.15625 10.3438 4.21875 10.5625 4.4375L14.4375 8.3125C15.125 9 15.5 9.90625 15.5 10.8437V16.5625Z"
                fill=""
              />
            </svg>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {metrics.riskScore.toFixed(1)}
              </h4>
              <span className="text-sm font-medium">Risk Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Portfolio Holdings
            </h4>
            <div className="flex flex-wrap items-center">
              <div className="flex items-center gap-3 py-1 px-4">
                <label className="mb-0 text-sm font-medium text-black dark:text-white">
                  Sort by:
                </label>
                <select className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none">
                  <option value="">All Type</option>
                  <option value="type">Bond Type</option>
                  <option value="yield">Yield</option>
                  <option value="duration">Duration</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
          
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
                    Current Price
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Yield
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Duration
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {holding.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        holding.type === 'Government'
                          ? 'bg-success text-success'
                          : holding.type === 'Corporate'
                          ? 'bg-primary text-primary'
                          : 'bg-warning text-warning'
                      }`}>
                        {holding.type}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{holding.quantity}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${holding.currentPrice.toLocaleString()}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-meta-3">{holding.yield.toFixed(1)}%</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {holding.duration.toFixed(1)} yrs
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        holding.rating.startsWith('AAA')
                          ? 'bg-success text-success'
                          : holding.rating.startsWith('AA')
                          ? 'bg-primary text-primary'
                          : 'bg-warning text-warning'
                      }`}>
                        {holding.rating}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondDashboard;
