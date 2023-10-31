
import React from 'react';
import '../stockpage/stockpage.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'

const ExpensesPage = () => {
  const cur_date = new Date();
  
  return (
    <>
      <Card className='general-container-size'>
        <CardBody>
          <div className='flex'>
            <LiaFileInvoiceDollarSolid size='40' />
            <BsPlus size='20' />
          </div>

          <p className='card-header-top'>Add Expenses</p>
          {/* <p className='card-header-top'><BsClipboardPlus size='32' className='float-left mr-2 mt-1 text-blue-gray-300' /> Add new item</p> */}

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Date (Readonly)</p></div>
            <div className='input-group-right'><XformInput type='text' min='0' size='lg' value={cur_date.toLocaleDateString()+' '+cur_date.toLocaleString('en-IN').split(' ')[1]} label='System Date' readonly/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Select branch name</p></div>
            <div className='input-group-right'>
              <Select size='lg' label="Branch">
                <Option value="0">-- Branches --</Option>
                <Option>Branch 1</Option>
                <Option>Branch 2</Option>
                <Option>Branch 3</Option>
              </Select>
            </div>
          </div>
          
          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Expense Title</p></div>
            <div className='input-group-right'><XformInput type='text' size='lg' label='Title'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p>Short description (max: 100 characters)</p></div>
            <div className='input-group-right'><Textarea type='text' maxLength='100' size='lg' label='Expense Description'/></div>
          </div>

          <div className='items-input-group flex'>
            <div className='input-group-left'><p className='mt-2'>Amount spent</p></div>
            <div className='input-group-right'><XformInput type='number' min='0' size='lg' label='Cost'/></div>
          </div>

          <hr className="my-2 border-blue-gray-50" />

          <div className='items-input-group flex'>
            <div className='input-group-left'></div>
            <div className='input-group-right'>
              <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Add Expense</span>&nbsp;&nbsp;</Button>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  )
}

export default ExpensesPage