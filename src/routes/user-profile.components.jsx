
import React, { useContext, useEffect, useState } from 'react';
import '../routes/other-styles.styles.css';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { VscSaveAs } from "react-icons/vsc";
import { PiBuildingsBold } from 'react-icons/pi';
import { MdOutlineMail, MdShortText } from 'react-icons/md';
import { TbCurrentLocation, TbCurrentLocationOff, TbGlobe } from 'react-icons/tb';
import { TiPhoneOutline } from 'react-icons/ti';
import XformInput from '../components/form/forminput.component';
import { BsCheckCircle } from 'react-icons/bs';
import { CiLock } from "react-icons/ci";
import { HiOutlineLockClosed } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';
import { BiSave } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  var c = 1;
  const cur_date = new Date();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { currentUser } = useAuth();
  const { displayName, email, phone } = currentUser;


  const handleOpen = () => setOpen(!open);
  const toggleUpdate = () => setUpdate(!update);


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
      <div className='profile-container general-container-size'> 
      
        <div className='profile-img-cont'>
            {/* <img className='w-full rounded-t-xl' src="https://t4.ftcdn.net/jpg/05/22/65/47/360_F_522654750_dWty6iO9Ev0Xjqlmorg6QV04sgKpmkUN.jpg" alt="" /> */}
        </div>

        <div className="box_parent2">
            <div className="box2"></div>

            <svg className="flt_svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="flt_tag">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                        <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
                    </filter>
                </defs>
            </svg>
        </div>

        <div className="box_parent">
            <div className="box">
                <img className='profile-img' src="data:image/jpeg;base64,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" alt="" />
            </div>

            <svg className="flt_svg2" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="flt_tag">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                        <feComposite in="SourceGraphic" in2="flt_tag" operator="atop"/>
                    </filter>
                </defs>
            </svg>
        </div>

        <div className='profile-text'>
            <h2>{displayName}</h2>
            <p>{email}</p>
            <p>{phone}</p>
            {
                update === false ? 
                <Button onClick={toggleUpdate} type='button' className='float-center m-4' size='sm' variant="outlined">&nbsp;<VscSaveAs size='18' className='float-left mr-2'/> Update Profile &nbsp;</Button>
                : <Button onClick={toggleUpdate} type='button' className='float-center m-4' size='sm' variant="outlined">&nbsp;<VscSaveAs size='18' className='float-left mr-2'/> Cancel &nbsp;</Button>
            }
        </div>


            {
                update === true ? 
                <form id='' onSubmit={handleSubmitCompany}>
                    <div className='items-input-group flex'>
                    <XformInput inIcon={<PiBuildingsBold />} className='w-full' name='name' type='text' size='lg' label='Name' required/>
                    </div>
                    
                    <div className='items-input-group flex'>
                    <XformInput inIcon={<TiPhoneOutline />} className='w-full' name='phone' type='number' min='0' size='lg' label='Phone' required/>
                    </div>
                    
                    <div className='items-input-group flex'>
                    <XformInput inIcon={<MdOutlineMail />} className='w-full' name='email' type='email' min='0' size='lg' label='Email' readOnly/>
                    </div>
                    
                    <div className='items-input-group flex'>
                    <XformInput inIcon={<HiOutlineLockClosed />} className='w-full' name='password' type='password' size='lg' label='Password'/>
                    </div>
                    
                    <div className='items-input-group flex'>
                    <XformInput inIcon={<HiOutlineLockClosed />} className='w-full' name='password_confirm' type='password' size='lg' label='Confirm Password'/>
                    </div>

                    <hr className="my-2 border-blue-gray-50" />

                    <div className='items-input-group'>
                    <Button type='submit' className='float-right m-1'>&nbsp;&nbsp;<BiSave size='18' className='float-left'/>&nbsp;&nbsp;<span>Save Details</span>&nbsp;&nbsp;</Button>
                    {/* <Button onClick={toggleUpdate} type='button' className='float-left m-1' size='sm' variant="outlined">&nbsp;<FaTimes size='18' className='float-left mr-2'/> Cancel &nbsp;</Button> */}
                    </div>
                    <p className='my-10'>&nbsp;</p>
                </form>
                :null
            }
          
      </div>
    </>
  )
}

export default UserProfile 