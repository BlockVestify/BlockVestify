import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const RiskManagement = () => {
  const riskMetrics = {
    overallScore: 75,
    marketRisk: 'Medium',
    creditRisk: 'Low',
    portfolioExposure: '65%',
    diversificationScore: '82/100',
    volatilityIndex: '0.45',
    sharpeRatio: '1.8'
  };

  const portfolioAllocation = [
    { type: 'Government Bonds', percentage: 45, risk: 'Low' },
    { type: 'Corporate Bonds', percentage: 35, risk: 'Medium' },
    { type: 'Municipal Bonds', percentage: 20, risk: 'Low-Medium' }
  ];

  return (
    <>
      <Breadcrumb pageName="Risk Management" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Risk Score Card */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Risk Score
              </h4>
              <span className="text-sm font-medium">Moderate</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
              {riskMetrics.overallScore}/100
            </span>
          </div>
        </div>

        {/* Portfolio Exposure */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H4V4h12v12zM9 16H7v-5h2v5zm4 0h-2v-8h2v8zm4 0h-2v-3h2v3z"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Portfolio Exposure
              </h4>
              <span className="text-sm font-medium">Balanced</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
              {riskMetrics.portfolioExposure}
            </span>
          </div>
        </div>

        {/* Diversification Score */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H5z"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Diversification
              </h4>
              <span className="text-sm font-medium">Well Diversified</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
              {riskMetrics.diversificationScore}
            </span>
          </div>
        </div>

        {/* Volatility Index */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Volatility Index
              </h4>
              <span className="text-sm font-medium">Low Volatility</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
              {riskMetrics.volatilityIndex}
            </span>
          </div>
        </div>
      </div>

      {/* Risk Analysis Section */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Portfolio Allocation
            </h4>
            <div className="flex flex-col gap-4">
              {portfolioAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-stroke dark:border-strokedark">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                      <svg
                        className="fill-primary dark:fill-white"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H5z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {item.type}
                      </h5>
                      <p className="text-sm">Risk Level: {item.risk}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {item.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Risk Metrics
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-3 border-b border-stroke dark:border-strokedark">
                <span className="text-sm font-medium text-black dark:text-white">Sharpe Ratio</span>
                <span className="text-sm text-meta-3">{riskMetrics.sharpeRatio}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-stroke dark:border-strokedark">
                <span className="text-sm font-medium text-black dark:text-white">Market Risk</span>
                <span className="text-sm text-meta-3">{riskMetrics.marketRisk}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-stroke dark:border-strokedark">
                <span className="text-sm font-medium text-black dark:text-white">Credit Risk</span>
                <span className="text-sm text-meta-3">{riskMetrics.creditRisk}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskManagement;
