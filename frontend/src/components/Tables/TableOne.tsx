import React from 'react';

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Active Bond Listings
        </h4>
        <div className="flex gap-3">
          <select className="rounded-lg border-stroke px-3 py-1 text-sm dark:border-strokedark dark:bg-boxdark">
            <option value="all">All Types</option>
            <option value="treasury">Treasury</option>
            <option value="corporate">Corporate</option>
            <option value="municipal">Municipal</option>
          </select>
          <button className="rounded-lg bg-primary px-3 py-1 text-white text-sm">
            Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Bond ID
            </h5>
          </div>
          <div className="p-2.5 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Type
            </h5>
          </div>
          <div className="p-2.5 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Issuer
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Yield
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Maturity
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Rating
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {/* Bond Item 1 */}
        <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-4">
            <p className="text-black dark:text-white">UST-2Y-24</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">Treasury</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">U.S. Government</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-meta-3">4.25%</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">$98.50</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">2026</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
              AAA
            </span>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <button className="rounded bg-primary py-1 px-3 text-white text-sm">
              Trade
            </button>
          </div>
        </div>

        {/* Bond Item 2 */}
        <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-4">
            <p className="text-black dark:text-white">AAPL-27</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">Corporate</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">Apple Inc.</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-meta-3">5.75%</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">$102.25</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">2027</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
              AA+
            </span>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <button className="rounded bg-primary py-1 px-3 text-white text-sm">
              Trade
            </button>
          </div>
        </div>

        {/* Bond Item 3 */}
        <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-4">
            <p className="text-black dark:text-white">NYC-MUN-26</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">Municipal</p>
          </div>

          <div className="flex items-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">New York City</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-meta-3">3.85%</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">$99.75</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <p className="text-black dark:text-white">2026</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-sm font-medium text-warning">
              A+
            </span>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-4">
            <button className="rounded bg-primary py-1 px-3 text-white text-sm">
              Trade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
