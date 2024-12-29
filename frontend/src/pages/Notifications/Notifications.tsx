import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Notifications = () => {
  const notifications = [
    {
      type: 'alert',
      title: 'Bond Maturity Alert',
      message: 'Your government bond XYZ123 will mature in 30 days',
      time: '2 hours ago',
      isRead: false,
    },
    {
      type: 'info',
      title: 'Interest Payment Received',
      message: 'Interest payment of $500 received from bond ABC789',
      time: '1 day ago',
      isRead: true,
    },
    {
      type: 'success',
      title: 'Bond Purchase Successful',
      message: 'Successfully purchased corporate bond DEF456',
      time: '2 days ago',
      isRead: true,
    }
  ];

  return (
    <>
      <Breadcrumb pageName="Notifications" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-7.5">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-black dark:text-white">
              Notifications
            </h3>
            <button className="text-sm text-primary hover:text-opacity-80">
              Mark all as read
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 xl:p-7.5">
          <div className="flex flex-col gap-4">
            {notifications.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-5 rounded-sm border border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark 
                  ${!item.isRead ? 'bg-gray-50 dark:bg-boxdark-2' : ''}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-2 dark:bg-meta-4">
                  {item.type === 'alert' && (
                    <svg className="fill-warning" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"/>
                    </svg>
                  )}
                  {item.type === 'info' && (
                    <svg className="fill-primary" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"/>
                    </svg>
                  )}
                  {item.type === 'success' && (
                    <svg className="fill-success" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.126 14.56L16.126 9.56L14.712 8.146L11.126 11.732L9.29599 9.902L7.88199 11.316L11.126 14.56Z"/>
                    </svg>
                  )}
                </div>

                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {item.title}
                    </h5>
                    <p className="text-sm text-body">{item.message}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
