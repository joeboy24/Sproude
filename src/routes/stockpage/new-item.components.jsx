
import React, { useContext, useState } from 'react';
import './stockpage.styles.css';
import '../other-styles.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheck2Circle, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, } from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon, } from "@heroicons/react/24/solid";
import { RiListSettingsLine } from 'react-icons/ri';
import { ProductsContext } from '../../context/product.context';
import InventoryRow from './inventory-row.component';
import { IoWarningOutline } from 'react-icons/io5';
import { LuClipboardSignature } from 'react-icons/lu';
import { Toaster, toast } from 'sonner'
import { infoToast } from '../../utils/firebase/firebase.utils';

const NewItem = () => {

  // console.log('-- New Item Page Started --');
  var i = 1;
  var pId2 = 'P'+Math.random().toString(36).slice(2);
  const pId = pId2.toUpperCase().substring(0, 7);
  const defaultFormValues = {
    // "id": 1,
    product_id: pId,
    image: "",
    name: "",
    description: "",
    category: "",
    brand: "",
    qty: "",
    rtl_qty: "",
    whl_qty: "",
    price: "",
    rtl_price: "",
    whl_price: "",
    publish: "no",
    barcode: "",
    expiry: "",
    del: "no",
  }
  const [ showHeader, setShowHeader ] = useState('new');
  const [ formFields, setFormFields ] = useState(defaultFormValues);
  const { products, addProduct, getProduct, updateProduct } = useContext(ProductsContext);
  const [ updateID, setUpdateID ] = useState('');
  const { id, product_id, image, name, description, category, brand, qty, rtl_qty, whl_qty, price, rtl_price, whl_price, publish, barcode, expiry, del } = formFields;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value, product_id: pId, del: 'no'});
    // console.log(value);
    // console.log(formFields);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    formFields['publish'] = event.target.publish.value;
    // console.log(formFields);
    // return alert('done');
    if (!formFields.category || formFields.category == '' || formFields.category == '-- Select --') {
      return infoToast('Attention..! Category field is required')
    }

    if (formFields.id) {
      // return alert(formFields.id);
      updateProduct(formFields).then(handleOpen);
    } else {
      // return alert(showHeader);
      addProduct(formFields).then(handleOpen);
    }
  }

  const testMeFunc = () => {
    alert('Test Me');
  }

  const pull_id = (id) => {
    setShowHeader('update')
    setFormFields(products.find(el => el.id == id));
  }

  const handleAddNewItem = () => {
    setShowHeader('new'); 
    setFormFields({}); 
    handleOpen();
  }






  return (
    <>
      <Card className='general-container-size'>

        <CardBody>
          <div className='flex float-right mb-2'>
            <BsPlus size='20' />
            <HiOutlineClipboardDocumentList size='40' />
          </div>

          <p onClick={handleAddNewItem} className='change-date-link-inverse float-left'><BsPlusCircle size='16' className='float-left mr-2 mt-0.5' /> Add New Item</p>

          { products.length > 0 ?
            <table className="cart-tbl w-calc[100%-100px] min-w-max table-auto text-left">
              <thead>
                  <tr>
                      <th className='text-center'>#</th>
                      <th>PRODUCT DETAILS</th>
                      <th>STATUS</th>
                      <th>QUANTITY</th>
                      <th className=' text-right'>PRICE GH₵</th>
                      <th className='text-right'>ACTIONS</th>
                  </tr>
              </thead>

              <tbody>
                  {products.map((product, index) => {
                    var sendClass = '';
                    const isLast = index === products.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-blue-gray-50";
                    if (product.del === 'no') {
                      sendClass = 'even:bg-blue-gray-50/30';
                    } else {
                      sendClass = 'bg-red-100/80 !border-b-4 border-b-white';
                    }
                    return(
                      <InventoryRow key={product.id} getId={pull_id} i={i++} product={product} classes={classes} sendClass={sendClass} openDialog={handleOpen}/>
                    );
                  }).reverse()}
                  {/* <tr>
                      <td></td>
                      <td className='px-4 text-right'>
                          <p className='item-name'>Total :</p>
                          <p className='item-description'>Records / Amount</p>
                      </td>
                      <td className='pl-14 py-3'><p className='item-description'>{cartCount}</p></td>
                      <td className='pl-14 py-3'></td>
                      <td className='px-4 text-center'><p className='item-name'>{(salesRecords.reduce((total, item) => total + item.total, 0)).toFixed(2).toLocaleString()}</p></td>
                      <td></td>
                  </tr> */}
              </tbody>
            </table>
          : null
          // <p className='item-description text-center uppercase'>Oops..! No items found</p>
          }
        </CardBody>
      </Card>



      
      <Dialog open={open} handler={handleOpen}>
        
        <div className='dialog-top flex'><LuClipboardSignature size='20'/>
          { showHeader === 'new'
          ? <p className='text-center'>&nbsp;&nbsp;Add New Item</p>
          : <p className='text-center'>&nbsp;&nbsp;Update Product</p>
          }
        </div>

        <form onSubmit={handleSubmit}>

          <DialogBody className='dialog-body-container'>
            <div>
              {/* <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Product Id</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={pId.toUpperCase().substring(0, 7)} name='product_id' type='text' size='lg' label='Product Id' readOnly required/></div>
              </div> */}

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Item Name</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={name} name='name' type='text' size='lg' label='Name' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p>Type item brand name only</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={brand} name='brand' type='text' size='lg' label='Brand Name' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Scan item barcode</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={barcode} name='barcode' type='number' min='0' size='lg' label='Barcode' /></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p>Select Category from list below</p></div>
                <div className='input-group-right'>
                  <select className='custom-select' size='lg' label="Select Category" name='category' onChange={handleChange}>
                    <option defaultValue={category}>-- Select --</option>
                    {/* <option value={category} selected>{category}</option> */}
                    <option>Water</option>
                    <option>Food</option>
                    <option>Wine</option>
                    <option>Sneaker</option>
                    <option>Dress</option>
                  </select>
                </div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p>Provide link to item image</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={image} name='image' type='text' size='lg' label='Image URL' /></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p>Short item description (max: 32 characters)</p></div>
                <div className='input-group-right'><Textarea onChange={handleChange} value={description} name='description' type='text' maxLength='32' size='lg' label='Item Description' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>General Quantity</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={qty} name='qty' type='number' min='0' size='lg' label='Quantity' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Retail Quantity</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={rtl_qty} name='rtl_qty' type='number' min='0' size='lg' label='RTL Quantity' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Wholesale Quantity</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={whl_qty} name='whl_qty' type='number' min='0' size='lg' label='WHL Quantity'/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Cost Price</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={price} step='any' name='price' type='number' min='0' size='lg' label='Price' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Retail Price</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={rtl_price} step='any' name='rtl_price' type='number' min='0' size='lg' label='RTL Price' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Wholesale Price</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={whl_price} step='any' name='whl_price' type='number' min='0' size='lg' label='WHL Price'/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p className='mt-2'>Select item expiry date</p></div>
                <div className='input-group-right'><XformInput onChange={handleChange} value={expiry} name='expiry' type='date' size='lg' label='Expiry Date' required/></div>
              </div>

              <div className='items-input-group flex'>
                <div className='input-group-left'><p>Put item on landing page</p></div>
                <div className='input-group-right'>
                  <select className='custom-select' size='lg' label="Publish" name='publish' onChange={handleChange}>
                    <option defaultValue={publish}>No</option>
                    {/* <option value={publish} selected>{publish}</option> */}
                    <option>Yes</option>
                  </select>
                </div>
              </div>

              {/* <hr className="my-2 border-blue-gray-50" />

              <div className='items-input-group flex'>
                <div className='input-group-left'></div>
                <div className='input-group-right'>
                  <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Submit</span>&nbsp;&nbsp;</Button>
                </div>
              </div> */}
            </div>
          </DialogBody>

          <DialogFooter>
            <Button type='reset' variant="text" color="red" onClick={handleOpen} className="mr-1" >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type='submit'>
              <BsCheck2Circle size='18' className='float-left'/>&nbsp;&nbsp;
              { showHeader === 'new'
              ? <span>Submit</span>
              : <span>Update</span>
              }
            </Button>
          </DialogFooter>

        </form>

      </Dialog>
    </>
  )
}

export default NewItem