import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import TableOne from '../../components/Tables/TableOne';

const BondTrading: React.FC = () => {
  return (
    <>
      {/* Market Overview Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Market Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Market Status" total="Open" rate="Active" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="#10B981"/>
            </svg>
          </CardDataStats>
          <CardDataStats title="Trading Volume" total="$1.2M" rate="12.5% ↑" levelUp>
            <svg className="fill-primary dark:fill-white" width="22" height="18" viewBox="0 0 22 18">
              <path d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751Z" fill=""/>
            </svg>
          </CardDataStats>
          <CardDataStats title="10Y Treasury Yield" total="4.35%" rate="0.12% ↑" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 10H15V20H5V10H0L10 0Z"/>
            </svg>
          </CardDataStats>
          <CardDataStats title="Market Sentiment" total="Bullish" rate="Positive" levelUp>
            <svg className="fill-primary dark:fill-white" width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 0L20 20H0L10 0Z"/>
            </svg>
          </CardDataStats>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Trading Section */}
        <div className="col-span-12 xl:col-span-8">
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">Trading Dashboard</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* Price Chart */}
              <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <ChartOne />
              </div>
              {/* Recent Trades */}
              <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                <TableOne />
              </div>
            </div>
          </div>
        </div>

        {/* Market Analysis Section */}
        <div className="col-span-12 xl:col-span-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Yield Curve */}
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Yield Curve
              </h4>
              <ChartTwo />
            </div>
            {/* Volume Distribution */}
            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Volume Analysis
              </h4>
              <ChartThree />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BondTrading;
