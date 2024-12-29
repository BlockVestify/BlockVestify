import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface BondOrder {
  id: string;
  bondName: string;
  issuer: string;
  type: string;
  orderDate: string;
  orderType: 'Buy' | 'Sell';
  quantity: number;
  price: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  totalAmount: number;
}

const BondOrders = () => {
  const [orders, setOrders] = useState<BondOrder[]>([
    {
      id: '1',
      bondName: 'US Treasury Bond 2025',
      issuer: 'U.S. Government',
      type: 'Government',
      orderDate: '2023-12-15',
      orderType: 'Buy',
      quantity: 10,
      price: 980,
      status: 'Completed',
      totalAmount: 9800,
    },
    {
      id: '2',
      bondName: 'Apple Inc. Corporate Bond',
      issuer: 'Apple Inc.',
      type: 'Corporate',
      orderDate: '2023-12-20',
      orderType: 'Buy',
      quantity: 5,
      price: 1020,
      status: 'Pending',
      totalAmount: 5100,
    },
    {
      id: '3',
      bondName: 'Municipal Bond 2024',
      issuer: 'New York City',
      type: 'Municipal',
      orderDate: '2023-12-18',
      orderType: 'Sell',
      quantity: 3,
      price: 990,
      status: 'Completed',
      totalAmount: 2970,
    },
  ]);

  // Calculate order statistics
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'Pending').length,
    completedOrders: orders.filter(order => order.status === 'Completed').length,
    totalValue: orders.reduce((acc, order) => acc + order.totalAmount, 0),
  };

  return (
    <>
      <Breadcrumb pageName="Bond Orders" />

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
                {stats.totalOrders}
              </h4>
              <span className="text-sm font-medium">Total Orders</span>
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
                {stats.pendingOrders}
              </h4>
              <span className="text-sm font-medium">Pending Orders</span>
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
                {stats.completedOrders}
              </h4>
              <span className="text-sm font-medium">Completed Orders</span>
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
                ${stats.totalValue.toLocaleString()}
              </h4>
              <span className="text-sm font-medium">Total Order Value</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Bond Details
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Order Info
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Total Amount
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {order.bondName}
                    </h5>
                    <p className="text-sm">{order.issuer}</p>
                    <span className={`text-sm ${
                      order.type === 'Government'
                        ? 'text-success'
                        : order.type === 'Corporate'
                        ? 'text-primary'
                        : 'text-warning'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order.orderType} Order
                    </p>
                    <p className="text-sm">Qty: {order.quantity}</p>
                    <p className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      ${order.price.toLocaleString()}
                    </p>
                    <p className="text-sm">per unit</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      ${order.totalAmount.toLocaleString()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      order.status === 'Completed'
                        ? 'bg-success text-success'
                        : order.status === 'Pending'
                        ? 'bg-warning text-warning'
                        : 'bg-danger text-danger'
                    }`}>
                      {order.status}
                    </p>
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

export default BondOrders;
