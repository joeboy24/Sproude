
import React, { useContext } from 'react';
import '../stockpage/stockpage.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { ProductsContext } from '../../context/product.context';

const ExpensesPage = () => {
  const cur_date = new Date();

  const { expenses, addExpensesRecord, getExpensesRecords } = useContext(ProductsContext);


  const handleSubmit = (event) => {
    const { target } = event;
    event.preventDefault();
    return alert(target.exp_title.value);
    var secret = 'SK'+Math.random().toString(36).slice(2);

    const branch_id = target.branch_id.value;
    if (branch_id === 0) {
      return alert('Oops..! Select branch to proceed')
    }
    const expInputs = {
      id: secret,
      created_at: cur_date,
      branch_id: branch_id,
      exp_title: target.exp_title.value,
      exp_description: target.exp_description.value,
      cost: target.cost.value
      // obj: []
    };
    // const expInputs = {
    //   "espx": [ {"id": 1, "name": "Narnia", 
    //   created_at: cur_date, 
    //   branch_id: branch_id, 
    //   exp_title: target.exp_title.value, 
    //   exp_description: target.exp_description.value,
    //   cost: target.cost.value
    // }, {"id":2, "name": "Sacoridiat", exp_title: target.exp_title.value} ]
    // };
    // return alert(checks);
    const xn = [];
    xn.push({...expInputs, id: secret});
    addExpensesRecord(expInputs);
    getExpensesRecords();
    // console.log(xn);
    
  }

  const handleChange = (e) => {
    return alert(e.target.value);
  }
  
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


          <form onSubmit={handleSubmit}>
            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Date (Readonly)</p></div>
              <div className='input-group-right'><XformInput name='created_at' type='text' min='0' size='lg' value={cur_date.toLocaleDateString()+' '+cur_date.toLocaleString('en-IN').split(' ')[1]} label='System Date' readOnly/></div>
            </div>

            <div className='items-input-group flex'>
              <div className='input-group-left'><p>Select branch name</p></div>
              <div className='input-group-right'>
                {/* <Select onChange={handleChange} name='branch_id' size='lg' label="Branch">
                  <Option>-- Branches --</Option>
                  <Option>Branch 1</Option>
                  <Option>Branch 2</Option>
                  <Option>Branch 3</Option>
                </Select> */}
                <select onChange={handleChange} name="branch_id" id="">
                  <option value="0">0</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
            
            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Expense Title</p></div>
              <div className='input-group-right'><XformInput onChange={handleChange} name='exp_title' type='text' size='lg' label='Title' /></div>
            </div>
  
            <div className='items-input-group flex'>
              <div className='input-group-left'><p>Short description (max: 100 characters)</p></div>
              <div className='input-group-right'><Textarea name='exp_description' type='text' maxLength='100' size='lg' label='Expense Description' /></div>
            </div>

            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Amount spent</p></div>
              <div className='input-group-right'><XformInput name='cost' type='number' min='0' size='lg' label='Cost' /></div>
            </div>

            <hr className="my-2 border-blue-gray-50" />

            <div className='items-input-group flex'>
              <div className='input-group-left'></div>
              <div className='input-group-right'>
                <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Add Expense</span>&nbsp;&nbsp;</Button>
              </div>
            </div>
          </form>

        </CardBody>
      </Card>
    </>
  )
}

export default ExpensesPage