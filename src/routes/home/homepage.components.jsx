import React from 'react'
import SideBar from '../../components/sidebar/sidebar.components'
// import { StickyNavbar } from '../../components/navbar-check.components'
import AdminNavbar from '../../components/mynavbar/admin-navbar.components'
import XformInput from '../../components/form/forminput.component'
import XcartPage from '../cartpage/cartpage.components'
import MenuStrip from '../../components/menu-strip/menu-strip.components'
import './homepage.styles.css'

const Homepage = () => {
  return (
    <>
    {/* <SideBar /> */}
    <div className='nav-components-container'>
      <AdminNavbar />
      <MenuStrip />
    </div>
    <div className='general-container-size'>
        <h1>Homepage</h1>
        {/* <StickyNavbar />
        <StickyNavbar /> */}
        
        {/* <div className='cart-page'>
          <XcartPage />
        </div> */}
    </div>
    </>
  )
}

export default Homepage