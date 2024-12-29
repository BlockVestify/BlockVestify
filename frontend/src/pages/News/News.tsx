import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const News = () => {
  const newsItems = [
    {
      title: 'Federal Reserve Announces Interest Rate Decision',
      category: 'Monetary Policy',
      date: '2024-12-28',
      summary: 'The Federal Reserve maintains current interest rates, signaling continued economic stability.',
      source: 'Financial Times'
    },
    {
      title: 'Treasury Yields Hit New Milestone',
      category: 'Market Update',
      date: '2024-12-28',
      summary: '10-year Treasury yields reach significant level amid global market developments.',
      source: 'Bloomberg'
    },
    {
      title: 'Corporate Bond Market Outlook 2025',
      category: 'Market Analysis',
      date: '2024-12-28',
      summary: 'Analysts predict strong corporate bond performance in the coming year.',
      source: 'Reuters'
    }
  ];

  return (
    <>
      <Breadcrumb pageName="Market News" />

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        {/* News Feed */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
            <h3 className="font-medium text-black dark:text-white">
              Latest Market News
            </h3>
          </div>
          
          <div className="p-4 sm:p-6 xl:p-7.5">
            <div className="flex flex-col gap-6">
              {newsItems.map((item, index) => (
                <div 
                  key={index}
                  className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <span className="mb-1 block text-sm font-medium text-primary">
                        {item.category}
                      </span>
                      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm">{item.summary}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-sm text-black dark:text-white">
                          Source: {item.source}
                        </span>
                        <span className="text-sm text-body">
                          {item.date}
                        </span>
                      </div>
                    </div>
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

export default News;
