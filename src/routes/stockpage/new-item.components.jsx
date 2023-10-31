
import React from 'react';
import './stockpage.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const NewItem = () => {
  return (
    <>
      <Card className='general-container-size'>
        <CardBody>
          <div className='flex'>
            <HiOutlineClipboardDocumentList size='40' />
            <BsPlus size='20' />
          </div>

          <p className='card-header-top'>Add new item</p>
          {/* <p className='card-header-top'><BsClipboardPlus size='32' className='float-left mr-2 mt-1 text-blue-gray-300' /> Add new item</p> */}
          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Item Name</p></div>
            <div className='input-group-right'><XformInput type='text' size='lg' label='Name'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Type item brand name only</p></div>
            <div className='input-group-right'><XformInput type='text' size='lg' label='Brand Name'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Scan item barcode</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='Barcode'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Select Category from list below</p></div>
            <div className='input-group-right'>
              <Select size='lg' label="Select Category">
                <Option value="0">Water</Option>
                <Option>Food</Option>
                <Option>Wine</Option>
                <Option>Sneaker</Option>
                <Option>Dress</Option>
              </Select>
            </div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Provide link to item image</p></div>
            <div className='input-group-right'><XformInput type='text' size='lg' label='Image URL'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Short item description (max: 32 characters)</p></div>
            <div className='input-group-right'><Textarea type='text' maxLength='32' size='lg' label='Item Description'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>General Quantity</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='Quantity'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Retail Quantity</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='RTL Quantity'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Wholesale Quantity</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='WHL Quantity'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Cost Price</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='Price'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Retail Price</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='RTL Price'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Wholesale Price</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='WHL Price'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Select item expiry date</p></div>
            <div className='input-group-right'><XformInput type='text' size='lg' label='Expiry Date'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Puts item on landing page</p></div>
            <div className='input-group-right'>
              <Select size='lg' label="Publish">
                <Option selected>No</Option>
                <Option>Yes</Option>
              </Select>
            </div>
          </div>

          <hr className="my-2 border-blue-gray-50" />

          <div className='items-input-group flex'>
            <div className='input-group-left'></div>
            <div className='input-group-right'>
              <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Submit</span>&nbsp;&nbsp;</Button>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  )
}

export default NewItem