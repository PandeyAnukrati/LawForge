// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Important for nested routes
import Navbar from './ui/Navbar'; // Adjust path if necessary
import Footer from './ui/Footer'; // Adjust path if necessary

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Your global Navbar */}
      <main className="flex-grow">
        <Outlet /> {/* This is where your nested page components will be rendered */}
      </main>
      <Footer /> {/* Your global Footer */}
    </div>
  );
};

export default Layout;