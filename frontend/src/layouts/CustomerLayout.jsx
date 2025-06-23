import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import { Toaster } from 'react-hot-toast';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CustomerNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default CustomerLayout; 