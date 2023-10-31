

import React from 'react';
import '../routes/stockpage/stockpage.styles.css';
import { Card, CardBody } from '@material-tailwind/react';
import { BsFillClipboardPlusFill, BsFillPlusCircleFill, BsFillPlusSquareFill, BsPlusCircle } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/mynavbar/admin-navbar.components';
import MenuStrip from '../components/menu-strip/menu-strip.components';

const NavigationPage = () => {
  return (
    <>
    <div className='nav-components-container'>
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