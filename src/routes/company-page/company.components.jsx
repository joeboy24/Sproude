
import React, { useContext, useEffect, useState } from 'react';
import '../stockpage/stockpage.styles.css';
import '../other-styles.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import XformInput from '../../components/form/forminput.component';
import AlertDialog from '../dialog.components';
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Textarea, Tooltip } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPersonFillGear, BsPlus, BsPlusCircle, BsSave, BsSave2, BsSaveFill, BsUpload  } from 'react-icons/bs';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { ProductsContext } from '../../context/product.context';
import { HiGlobeAlt } from 'react-icons/hi2';
import { PiBuildingsBold, PiGearFine } from 'react-icons/pi';
import { MdOutlineMail, MdOutlineMarkEmailUnread, MdShortText } from 'react-icons/md';
import { TbCurrentLocation, TbGlobe } from 'react-icons/tb';
import { TiPhoneOutline } from 'react-icons/ti';
import { GoGear } from "react-icons/go";
import { FcInfo } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { FaReply } from 'react-icons/fa6';
import { FaRegSave, FaSave, FaTimes } from 'react-icons/fa';
import { createCompanyDoc, getCompanyDoc, imageDb, infoToast, resetPassword, successToast, updateCompanyDoc, updateUserDoc } from '../../utils/firebase/firebase.utils';
import { SystemContext } from '../../context/system.context';
import { UserContext } from '../../context/user.context';
import { Link } from 'react-router-dom';

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const CompanyPage = () => {
  var c = 1;
  const cur_date = new Date();
  const { currentUser, users, getUsers } = useAuth();
  const [ curUsers, setCurUsers ] = useState([]);
  // console.log(curUsers)

  const { expenses, addExpensesRecord, getExpensesRecords, updateExpensesRecord, delExpRecord } = useContext(ProductsContext);
  const [open, setOpen] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState({});
  const handleOpen = () => setOpen(!open);

  const defaultCompanyValues = {
    companyName: '',
    slogan: '',
    address1: '',
    address2: '',
    phone: '',
    email: '',
    country: '',
    logo: 'no file uploaded',
    createdAt: new Date()
  }
  const { company, getCompany } = useContext(UserContext);
  // const [ company, setCompany ] = useState(defaultCompanyValues);
  const [ formFields, setFormFields ] = useState(defaultCompanyValues);
  const { companyName, slogan, address1, address2, phone, email, country, logo } = formFields;
  // console.log(formFields)

  const [img, setImg] = useState('')
  const [imgUrl, setImgUrl] = useState([])

  
  const handleLogoUpload = (event) =>{
    // const { name, value } = event.target;
    if(img !==null){
      const imgRef = ref(imageDb,`files/${v4()}`)
      uploadBytes(imgRef,img).then(val=>{
        console.log(val)
        getDownloadURL(val.ref).then(url=>{
          setImgUrl(data=>[...data,url])
          setFormFields({...formFields, ['logo']:url})
        })
      })
    }
  }

  useEffect(()=>{
    listAll(ref(imageDb,"files")).then(imgs=>{
        console.log(imgs)
        imgs.items.forEach(val=>{
            getDownloadURL(val).then(url=>{
                setImgUrl(data=>[...data,url])
            })
        })
    })
  },[])


  const handleCompanyChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]:value});
    console.log(value);
  }


  const handleSubmitCompany = async (event) => {
    event.preventDefault();
    await createCompanyDoc(formFields);
    const newComp = await getCompanyDoc();
    setFormFields(newComp);
  }


  const handleUpdateCompany = async (event) => {
    event.preventDefault();

    // successToast('Company details updated');
    // console.log(formFields)
    // return 

    await updateCompanyDoc(formFields);
    const newComp = await getCompanyDoc();
    setFormFields(newComp);
  }


  const handleSubmitRegistryCode = async (event) => {
    event.preventDefault();
    const { target } = event;

    return alert(target.user_email.value);
  }


  const sendResetMail = (displayName, email) => {
    if (window.confirm("Click `OK` to proceed with password reset for "+displayName)) { 
      resetPassword(email).then(
        successToast('Password resest link sent to '+displayName)
      );
    }
  }


  const updateUser = async (item, delState) => {
    if (item.uid == currentUser.uid) {
      return infoToast('Oops..! You cannot delete your account')
    }
    var msg = '';
    if (delState === 'yes') {
      msg = "Click `OK` to confirm record deletion for "+item.displayName;
    } else {
      msg = "Click `OK` to restore "+item.displayName+"'s record"
    }
    if (window.confirm(msg)) {
      item['del'] = delState;
      await updateUserDoc(item).then(
        getUsers()
      );
      // console.log(item);
    }
  }


  useEffect(() => {
    // if (curUsers === null || curUsers === undefined || curUsers.length > 0) { 
    //   infoToast('curUsers == null')
    // } else {
    //   infoToast('curUsers not null')
    //   const filterUser = users.filter(el => el.uid !== currentUser.uid);
      setCurUsers(users);
    // }
  },[users]);


  useEffect(() => {
  //   // setFormFields(company);
  //   const newComp = await getCompanyDoc();
    if (company !== null) {
      setFormFields(company);
    }
  },[company]);




  
  return (
    <>
      <Card className='general-container-size'> 
        <CardBody>
          <div className='flex'>
            <PiGearFine size='30' />
          </div>

          <p className='card-header-top'>Company Setup</p>
          {/* <p className='card-header-top'><BsClipboardPlus size='32' className='float-left mr-2 mt-1 text-blue-gray-300' /> Add new item</p> */}


          <form id=''>
            <div className='items-input-group flex'>
              <XformInput inIcon={<PiBuildingsBold />} onChange={handleCompanyChange} value={companyName} className='w-full' name='companyName' type='text' size='lg' label='Company Name' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<MdShortText />} onChange={handleCompanyChange} value={slogan} className='w-full' name='slogan' type='text' size='lg' label='Slogan' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbCurrentLocation />} onChange={handleCompanyChange} value={address1} className='w-full' name='address1' type='text' size='lg' label='Address (Line 1)' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbCurrentLocation />} onChange={handleCompanyChange} value={address2} className='w-full' name='address2' type='text' size='lg' label='Address (Line 2)' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TiPhoneOutline />} onChange={handleCompanyChange} value={phone} className='w-full' name='phone' type='number' min='0' size='lg' label='Phone' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<MdOutlineMail />} onChange={handleCompanyChange} value={email} className='w-full' name='email' type='email' min='0' size='lg' label='Email' required/>
            </div>
            
            <div className='items-input-group flex'>
              <XformInput inIcon={<TbGlobe />} onChange={handleCompanyChange} value={country} className='w-full' name='country' type='text' size='lg' label='Country' required/>
            </div>
            
            <div className='items-input-group flex'>
              {/* <div className='flex'>
                <XformInput className='text-xs rounded-md' inIcon={<BsUpload />} type="file" label='Upload Logo'/>
                <Button type='submit' className='float-right m-2' size='sm' variant="outlined">&nbsp;<MdOutlineMarkEmailUnread size='18' className='float-left mr-2'/> Send Code &nbsp;</Button>
              </div> */}

              <div className="relative flex w-full">
                <Input type="file" 
                  label="Upload Logo"
                  // value={logo}
                  // onChange={onChange}
                  className="pr-20" 
                  onChange={(e)=>setImg(e.target.files[0])}
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  size="sm"
                  variant="outlined"
                  color={logo ? "gray" : "blue-gray"}
                  disabled={!logo}
                  onClick={handleLogoUpload}
                  className="!absolute right-1 top-1 rounded">
                  <BsUpload size='14' className='float-left mr-2'/> 
                  Upload
                </Button>
              </div>
              <div>
                <img className='w-8 mx-2' src={logo} alt="" />
              </div>
            </div>
            
            {/* <div className='items-input-group flex my-2'>
              <img className='w-8 mx-2' src={logo} alt="Company Logo" />
              <h4 className='blue-head text-xs'><Link to={logo}>{logo}</Link></h4>
            </div> */}

            <hr className="my-2 border-blue-gray-50" />

            <div className='items-input-group flex'>
              { company
              ?<Button className='myBtn float-right' type='button' onClick={handleUpdateCompany}>&nbsp;&nbsp;<FaRegSave size='18' className='float-left'/>&nbsp;&nbsp;<span>Update Details</span>&nbsp;&nbsp;</Button>
              :<Button className='myBtn float-right' type='button' onClick={handleSubmitCompany}>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Save Details</span>&nbsp;&nbsp;</Button>
              }
            </div>
          </form>



          <form onSubmit={handleSubmitRegistryCode}>
                      
            <p className="my-4">&nbsp;</p>
            <div className='items-input-group flex'>
              <h4 className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Use this section to register user with OTP</h4>
            </div>

            <div className='items-input-group flex'>
              <XformInput inIcon={<MdOutlineMail />} className='w-full' name='user_email' type='email' min='0' size='lg' label='New User Email' required/>
            </div>

            <div className='items-input-group'>
              <Button type='submit' className='float-right m-2' size='sm' variant="outlined">&nbsp;<MdOutlineMarkEmailUnread size='18' className='float-left mr-2'/> Send Code &nbsp;</Button>
            </div>

          </form>


          { curUsers ?
          <div className='overflow-auto !mt-32 !mb-10'>
            <table className="cart-tbl w-calc[100%-100px] min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th>#</th>
                  <th>USER DETAILS</th>
                  <th className='text-center'>USER ROLE</th>
                  <th className='text-right'>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                { curUsers.map((item, index) => {
                  var sendClass = '';
                  const { uid, displayName, status, email, phone, del, createdAt } = item;
                  const isLast = index === curUsers.length - 1;
                  const classes = isLast ? "p-4 " : "p-4 border-blue-gray-50 ";
                  if (item.del === 'yes') {
                    sendClass = 'bg-red-100/80 !border-b-4 border-b-white';
                  } else {
                    sendClass = 'even:bg-blue-gray-50/30';
                  }
                  return (
                    <tr key={uid} className={sendClass}>
                      <td className='item-description pl-4 pr-2'>{c++}</td>
                      <td className={classes}>
                        <p className='item-name'>{displayName}</p>
                        <p className='item-description'>{email+' - '+phone}</p>
                      </td>
                      <td className={classes}>
                        <p className='item-description uppercase text-center'>{status}</p>
                      </td>
                      <td className={classes}>
                        { del == 'yes' ?
                        <Tooltip content='Restore' className='tooltip-style'><button onClick={()=>{updateUser(item, 'no')}} className='action-btn'><FaReply size='12'/></button></Tooltip>
                        :
                        <Tooltip content='Delete' className='tooltip-style'><button onClick={()=>{updateUser(item, 'yes')}} className='action-btn'><FaTimes size='12'/></button></Tooltip>
                        }
                        <Tooltip content='Reset Password' className='tooltip-style'><button onClick={()=>{sendResetMail(displayName, email)}} className='action-btn'><BsPersonFillGear size='12'/></button></Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          :null }
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