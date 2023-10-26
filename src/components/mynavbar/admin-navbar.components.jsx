import React from 'react'
import './admin-navbar.styles.css'
import { Badge, IconButton } from '@material-tailwind/react'
import { BsBellFill, BsGearFill } from 'react-icons/bs'
import { FaBell } from 'react-icons/fa'
import { Menu, MenuHandler, MenuList, MenuItem, Button, } from "@material-tailwind/react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const AdminNavbar = () => {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <div className="navbar-container">
      {/* <div class="flex ..."> */}
        <div class="nav-col-1">
          {/* 01 */}
          {/* <p>Sproude</p>
          <span>Mineral Water</span> */}
        </div>

        <div class="nav-col-2">
        </div>
        
        <div class="nav-col-3">
          <div className='nav-actions-container'>
            {/* <button className='icon-btn2'><BsGearFill size='18'/></button> */}
            <IconButton className='icon-btn'><BsGearFill size='16'/></IconButton>
            {/* <Badge content="5"> */}
              <IconButton className='icon-btn'><FaBell size='16'/></IconButton>
            {/* </Badge> */}
          </div>
          {/* 03 */}
          <Menu open={openMenu} handler={setOpenMenu} allowHover
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            placement='bottom-end'
          >
            <MenuHandler>
              {/* <p className='welcome-user'><span>Welcome</span> John Doe</p> */}
              <Button
                variant="text"
                className="hello-user"
              >
                Hello! John
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
        </div>
      {/* </div> */}
    </div>
  )
}

export default AdminNavbar