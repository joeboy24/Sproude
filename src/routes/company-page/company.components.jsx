
import React, { useContext, useEffect, useState } from 'react';
import '../stockpage/stockpage.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import XformInput from '../../components/form/forminput.component';
import AlertDialog from '../dialog.components';
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { ProductsContext } from '../../context/product.context';
import { HiGlobeAlt } from 'react-icons/hi2';
import { PiBuildingsBold, PiGearFine } from 'react-icons/pi';
import { MdOutlineMail, MdOutlineMarkEmailUnread, MdShortText } from 'react-icons/md';
import { TbCurrentLocation, TbGlobe } from 'react-icons/tb';
import { TiPhoneOutline } from 'react-icons/ti';
import { GoGear } from "react-icons/go";
import { FcInfo } from 'react-icons/fc';

const CompanyPage = () => {
  var c = 1;
  const cur_date = new Date();

  const { expenses, addExpensesRecord, getExpensesRecords, updateExpensesRecord, delExpRecord } = useContext(ProductsContext);
  const [open, setOpen] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState({});


  const handleOpen = () => setOpen(!open);


  const handleSubmitCompany = async (event) => {
    event.preventDefault();
  }


  const handleSubmitRegistryCode = async (event) => {
    event.preventDefault();
    const { target } = event;

    return alert(target.user_email.value);
  }



  
  return (
    <>
      <Card className='general-container-size'> 
        <CardBody>
          <div className='flex'>
            <PiGearFine size='30' />
          </div>

          <p className='card-header-top'>Company Setup</p>
          {/* <p className='card-header-top'><BsClipboardPlus size='32' className='float-left mr-2 mt-1 text-blue-gray-300' /> Add new item</p> */}


          <form id='' onSubmit={handleSubmitCompany}>
            <div className='items-input-group flex'>
              <XformInput inIcon={<PiBuildingsBold />} className='w-full' name='company_name' type='text' size='lg' label='Company Name' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<MdShortText />} className='w-full' name='slogan' type='text' size='lg' label='Slogan' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbCurrentLocation />} className='w-full' name='address_1' type='text' size='lg' label='Address (Line 1)' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbCurrentLocation />} className='w-full' name='address_2' type='text' size='lg' label='Address (Line 2)' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TiPhoneOutline />} className='w-full' name='phone' type='number' min='0' size='lg' label='Phone' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<MdOutlineMail />} className='w-full' name='email' type='email' min='0' size='lg' label='Email' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbGlobe />} className='w-full' name='country' type='text' size='lg' label='Country' required/>
            </div>

            <hr className="my-2 border-blue-gray-50" />

            <div className='items-input-group flex'>
              <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Save Details</span>&nbsp;&nbsp;</Button>
            </div>
          </form>



          <form onSubmit={handleSubmitRegistryCode}>
                      
            <p className="my-4">&nbsp;</p>
            <div className='items-input-group flex'>
              <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Use this section to register user</h4>
            </div>

            <div className='items-input-group flex'>
              <XformInput inIcon={<MdOutlineMail />} className='w-full' name='user_email' type='email' min='0' size='lg' label='New User Email' required/>
            </div>

            <div className='items-input-group'>
              <Button type='submit' className='float-right m-2' size='sm' variant="outlined">&nbsp;<MdOutlineMarkEmailUnread size='18' className='float-left mr-2'/> Send Code &nbsp;</Button>
            </div>

          </form>

        </CardBody>
      </Card>


      <AlertDialog open={open} alertMsg={alertMsg} size='xs' handler={handleOpen}
        footerBtn={
        <Button variant="gradient" color="green" onClick={handleOpen}><span>Continue</span></Button>
      }/>
    </>
  )
}

export default CompanyPage 