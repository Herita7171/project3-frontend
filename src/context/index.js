import React from 'react';
import NotificationProvider from './NotificationProvider';
import AuthProvider from './AuthProvider';
import SearchProvider from './SearchProvider';

export default function ContextProviders({children}) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}
