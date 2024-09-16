import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Header from './contacts/Header';  // Import the Header component

const Layout = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
      {/* <Header /> Add Header component here */}
      <div style={{display: "flex", flex: 1}}>
        <Navbar />
        <div style={{flex: 1, padding: "16px"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
