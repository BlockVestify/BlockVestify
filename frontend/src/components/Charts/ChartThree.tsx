import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: any = {
  chart: {
    type: 'donut',
  },
  colors: ['#3C50E0', '#80CAEE', '#10B981'],
  labels: ['Treasury Bonds', 'Corporate Bonds', 'Municipal Bonds'],
  legend: {
    show: true,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

interface ChartThreeState {
  series: number[];
}

const ChartThree: React.FC = () => {
  const [state] = useState<ChartThreeState>({
    series: [45, 35, 20],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Trading Volume Distribution
          </h4>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-primary"></span>
            <span className="font-medium text-black-2 dark:text-white">Treasury Bonds</span>
          </div>
          <span className="font-medium text-black-2 dark:text-white">45%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-secondary"></span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-black-2 dark:text-white">Corporate Bonds</span>
            </div>
          </div>
          <span className="font-medium text-black-2 dark:text-white">35%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-meta-3"></span>
            <span className="font-medium text-black-2 dark:text-white">Municipal Bonds</span>
          </div>
          <span className="font-medium text-black-2 dark:text-white">20%</span>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
