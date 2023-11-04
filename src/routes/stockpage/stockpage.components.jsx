
import React from 'react';
import vector1 from '../../assets/sproude-vector-01.png'
import vector2 from '../../assets/sproude-vector-02.png'
import './stockpage.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Card, CardBody } from '@material-tailwind/react';
import { BsFillClipboardPlusFill, BsFillPlusCircleFill, BsFillPlusSquareFill, BsPlusCircle } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';
import { MdOutlineFileUpload } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import { BiTransferAlt } from 'react-icons/bi';
import { AiOutlineFolderOpen } from 'react-icons/ai';

const StockPage = () => {
  return (
    <>
    {/* <img className='image-title' src={vector1} alt="" /> */}
    <Outlet />
    </>
  )
}


export const StockIndex = () => {
  return (
    <>
      <img className='image-title' src={vector2} alt="" />
      <a href="/stock/add-new-item"><p className='radio-text2'><BsPlusCircle size='16' className='float-left mr-2 mt-0.5' /> New Item</p></a>
      <a href="#"><p className='radio-text2'><MdOutlineFileUpload size='16' className='float-left mr-2 mt-0.5' /> Upload Items CSV</p></a>
      <a href="#"><p className='radio-text2'><FaDownload size='16' className='float-left mr-2 mt-0.5' /> Downlod Stock CSV</p></a>
      <a href="#"><p className='radio-text2'><BiTransferAlt size='16' className='float-left mr-2 mt-0.5' /> Transfer Stock</p></a>
      <a href="#"><p className='radio-text2'><AiOutlineFolderOpen size='16' className='float-left mr-2 mt-0.5' /> View Stock</p></a>
    </>
  )
}


export default StockPage