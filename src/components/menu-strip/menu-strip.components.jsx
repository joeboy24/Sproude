import React from 'react'
import './menu-strip.styles.css'
import { IconButton } from '@material-tailwind/react'
import { FaClipboard, FaClipboardList } from 'react-icons/fa'
import { RiBarcodeBoxLine } from 'react-icons/ri'
import { TiHomeOutline } from 'react-icons/ti'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { HiOutlineClipboardDocumentList, HiOutlineHome,  } from 'react-icons/hi2'
import { BsBasket, BsCart4, BsCashCoin, BsFileEarmarkBarGraph, BsFileEarmarkBarGraphFill, BsFillBagXFill, BsHandbag } from 'react-icons/bs'

const MenuStrip = () => {
  return (
    <div className='menu-strip-container'> 
        <div className='menu-strip'>
            {/* <button><FaClipboardList size='30'/></button>
            <button><BsHandbag size='30'/></button> */}
            <a href="/"><div className='menu-link'>
                <TiHomeOutline className='p-0 -mb-1.5' size='32'/>
                <span>&nbsp;Home&nbsp;</span>
            </div></a>
            <a href="/2"><div className='menu-link'>
                <HiOutlineClipboardDocumentList className='p-0 -mb-1.5' size='32'/>
                <span>&nbsp;Items &nbsp;</span>
            </div></a>
            <a href="/sales"><div className='menu-link'>
                <BsCart4 className='p-0 -mb-1.5' size='32'/>
                <span>Sales</span>
            </div></a>
            <a href="/4"><div className='menu-link'>
                <LiaFileInvoiceDollarSolid className='p-0 -mb-1.5' size='32'/>
                <span>Expenses</span>
            </div></a>
            <a href="/5"><div className='menu-link'>
                <BsFileEarmarkBarGraph className='p-0 -mb-1.5' size='32'/>
                <span>Report</span>
            </div></a>
            <a href="/5"><div className='menu-link'>
                <RiBarcodeBoxLine className='p-0 -mb-1.5' size='32'/>
                <span>Scan</span>
            </div></a>
            {/* <IconButton className='icon-btn'><HiOutlineClipboardDocumentList size='24'/></IconButton>
            <IconButton className='icon-btn'><BsCart4 size='24'/></IconButton>
            <IconButton className='icon-btn'><LiaFileInvoiceDollarSolid size='24'/></IconButton>
            <IconButton className='icon-btn'><BsFileEarmarkBarGraph size='24'/></IconButton> */}
        </div>
    </div>
  )
}

export default MenuStrip