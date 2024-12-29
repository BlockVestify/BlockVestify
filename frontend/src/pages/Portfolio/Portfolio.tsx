import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ReactApexChart from 'react-apexcharts';

// Portfolio Allocation Chart Options
const allocationChartOptions: any = {
  chart: {
    type: 'donut',
    height: 250,
  },
  colors: ['#3C50E0', '#80CAEE', '#10B981', '#FF6B72'],
  labels: ['Treasury Bonds', 'Corporate Bonds', 'Municipal Bonds', 'International Bonds'],
  legend: {
    show: true,
    position: 'bottom',
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
      },
    },
  },
};

// Portfolio Performance Chart Options
const performanceChartOptions: any = {
  chart: {
    type: 'area',
    height: 300,
    toolbar: {
      show: false,
    },
  },
  colors: ['#3C50E0'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2024-01-01',
      '2024-02-01',
      '2024-03-01',
      '2024-04-01',
      '2024-05-01',
      '2024-06-01',
    ],
  },
  yaxis: {
    title: {
      text: 'Portfolio Value ($)',
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy',
    },
  },
};

const Portfolio: React.FC = () => {
  // Sample portfolio data
  const portfolioStats = {
    totalValue: '$1,250,000',
    totalReturn: '+8.5%',
    ytdReturn: '+4.2%',
    yield: '4.8%',
  };

  const allocationData = [40, 30, 20, 10];
  const performanceData = [
    {
      name: 'Portfolio Value',
      data: [1150000, 1180000, 1210000, 1230000, 1245000, 1250000],
    },
  ];

  const holdings = [
    {
      id: 'UST-10Y-24',
      name: '10-Year Treasury Bond',
      type: 'Treasury',
      quantity: 100,
      value: '$98,500',
      yield: '4.25%',
      gain: '+2.5%',
      maturity: '2034',
    },
    {
      id: 'AAPL-27',
      name: 'Apple Inc. Corporate Bond',
      type: 'Corporate',
      quantity: 75,
      value: '$76,687',
      yield: '5.75%',
      gain: '+3.8%',
      maturity: '2027',
    },
    {
      id: 'NYC-MUN-26',
      name: 'NYC Municipal Bond',
      type: 'Municipal',
      quantity: 50,
      value: '$49,875',
      yield: '3.85%',
      gain: '+1.2%',
      maturity: '2026',
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Portfolio Overview</h2>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Total Value" total={portfolioStats.totalValue} rate="Monthly: +2.5%">
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 10H15V20H5V10H0L10 0Z"/>
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Return" total={portfolioStats.totalReturn} rate="Since inception">
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 10H15V20H5V10H0L10 0Z"/>
            </svg>
          </CardDataStats>
          <CardDataStats title="YTD Return" total={portfolioStats.ytdReturn} rate="2024">
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 10H15V20H5V10H0L10 0Z"/>
            </svg>
          </CardDataStats>
          <CardDataStats title="Average Yield" total={portfolioStats.yield} rate="Weighted average">
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 10H15V20H5V10H0L10 0Z"/>
            </svg>
          </CardDataStats>
        </div>

        {/* Charts Section */}
        <div className="mt-6 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          {/* Portfolio Performance Chart */}
          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-black dark:text-white">Portfolio Performance</h3>
              </div>
              <div>
                <ReactApexChart
                  options={performanceChartOptions}
                  series={performanceData}
                  type="area"
                  height={300}
                />
              </div>
            </div>
          </div>

          {/* Asset Allocation Chart */}
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-black dark:text-white">Asset Allocation</h3>
              </div>
              <div>
                <ReactApexChart
                  options={allocationChartOptions}
                  series={allocationData}
                  type="donut"
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="mt-6">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex justify-between items-center">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Bond Holdings
              </h4>
              <button className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-6 text-center font-medium text-primary hover:bg-opacity-90">
                Add Position
              </button>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">ID</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Name</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Type</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Quantity</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Value</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Yield</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Gain/Loss</h5>
                </div>
                <div className="p-2.5 xl:p-4">
                  <h5 className="text-sm font-medium uppercase">Maturity</h5>
                </div>
              </div>

              {holdings.map((holding, index) => (
                <div key={holding.id} className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.id}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.name}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.type}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.quantity}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.value}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-meta-3">{holding.yield}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-meta-3">{holding.gain}</p>
                  </div>
                  <div className="p-2.5 xl:p-4">
                    <p className="text-black dark:text-white">{holding.maturity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
