import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual payment processing
    console.log('Processing payment:', { amount, paymentMethod });
    // Navigate to buy bonds page after successful payment
    navigate('/buy-bonds');
  };

  return (
    <>
      <Breadcrumb pageName="Billing" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Add Funds Form */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Funds to Your Account
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Amount (in USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Payment Method
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Saved Payment Methods
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5">
                <div className="flex items-center gap-3 rounded border border-stroke p-4 dark:border-strokedark">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-2 dark:bg-meta-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.1063 18.0469H19.4375V1.57812C19.4375 0.707031 18.7305 0 17.8594 0H2.89062C2.01953 0 1.3125 0.707031 1.3125 1.57812V18.0469H0.825C0.369531 18.0469 0 18.4164 0 18.8719V20.3438C0 21.2148 0.707031 21.9219 1.57812 21.9219H20.3438C21.2148 21.9219 21.9219 21.2148 21.9219 20.3438V18.8719C21.9219 18.4164 21.5523 18.0469 21.1063 18.0469ZM3.9375 2.625H16.8125V18.0469H3.9375V2.625Z"
                        fill=""
                      />
                    </svg>
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        Visa ending in 4242
                      </h5>
                      <p className="text-sm">Expires 12/24</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="hover:text-primary">Edit</button>
                      <button className="hover:text-primary">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Recent Transactions
              </h3>
            </div>
            <div className="p-6.5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded border border-stroke p-3 dark:border-strokedark">
                  <div>
                    <p className="font-medium text-black dark:text-white">Added Funds</p>
                    <p className="text-sm">Dec 28, 2024</p>
                  </div>
                  <p className="text-meta-3">+$5,000.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
