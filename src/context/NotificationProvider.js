import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export default function NotificationProvider({children}) {
    const [notification, setNotification] = useState('');
    const [classes, setClasses] = useState('');

    const updateNotification = (type, value) => {
        switch (type) {
            case 'error':
                setClasses('bg-gray-600 z-[90]');
                break;
            case 'success':
                setClasses('bg-lime-600 z-[90]');
                break;
            case 'warning':
                setClasses('bg-orange-500');
                break;
            default:
                setClasses('bg-gray-600');
        }
        setNotification(value);
        setTimeout(() => {
            setNotification('');

        }, 5000);
    }

  return (
    <NotificationContext.Provider value={{updateNotification}}>
        {children}
        {notification && <div className='fixed left-1/2 -translate-x-1/2 z-[80]'>
            <div className='shadow-md'>
                <p className={classes + ' text-white px-4 py-2 font-semibold rounded'}>
                    {notification}
                </p>
            </div>
        </div>}
    </NotificationContext.Provider>
  );
}
