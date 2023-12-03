

import React from 'react';
import '../routes/stockpage/stockpage.styles.css';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/mynavbar/admin-navbar.components';
import MenuStrip from '../components/menu-strip/menu-strip.components';

const NavigationPage = () => {
  return (
    <>
    <div className='nav-components-container no-print'>
      <AdminNavbar />
      <MenuStrip />
    </div>
    <div className='general-container-wrapper'>
      <Outlet />
    </div>
    </>
  )
}

export default NavigationPage