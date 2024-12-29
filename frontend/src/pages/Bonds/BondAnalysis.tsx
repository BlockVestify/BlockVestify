import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const BondAnalysis = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Bond Analysis" />
      
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Bond Portfolio Analysis</h1>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-8">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Total Value</h3>
            <p className="text-2xl font-bold text-primary">$250,000</p>
          </div>
          
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Average Yield</h3>
            <p className="text-2xl font-bold text-success">4.5%</p>
          </div>
          
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Average Duration</h3>
            <p className="text-2xl font-bold text-warning">5.2 years</p>
          </div>
          
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Risk Score</h3>
            <p className="text-2xl font-bold text-danger">3.2</p>
          </div>
        </div>

        {/* Analysis Content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Portfolio Composition</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Government Bonds</span>
                <span className="font-semibold text-primary">40%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Corporate Bonds</span>
                <span className="font-semibold text-primary">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black dark:text-white">Municipal Bonds</span>
                <span className="font-semibold text-primary">25%</span>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Risk Analysis</h2>
            <div className="space-y-4">
              <p className="text-black dark:text-white">
                <span className="font-semibold">Interest Rate Risk: </span>
                Moderate exposure with average duration of 5.2 years
              </p>
              <p className="text-black dark:text-white">
                <span className="font-semibold">Credit Risk: </span>
                Well-diversified portfolio with 40% in AAA-rated securities
              </p>
              <p className="text-black dark:text-white">
                <span className="font-semibold">Market Risk: </span>
                Balanced allocation across different bond types
              </p>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Performance Summary</h2>
          <div className="space-y-4">
            <p className="text-black dark:text-white">
              The bond portfolio is currently yielding an average of 4.5%, outperforming the benchmark by 40 basis points. 
              The portfolio maintains a balanced approach with a mix of government, corporate, and municipal bonds.
            </p>
            <p className="text-black dark:text-white">Key highlights:</p>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-white">
              <li>Strong performance in government securities</li>
              <li>Above-average yields in corporate bonds</li>
              <li>Strategic position in municipal bonds for tax advantages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondAnalysis;
