
import React, { useContext, useEffect, useState } from 'react';
import '../stockpage/stockpage.styles.css';
import '../other-styles.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { ProductsContext } from '../../context/product.context';
import { GrEdit } from 'react-icons/gr';
import AlertDialog from '../dialog.components';

const ExpensesPage = () => {
  var c = 1;
  const cur_date = new Date();

  const { expenses, addExpensesRecord, getExpensesRecords, updateExpensesRecord, delExpRecord } = useContext(ProductsContext);
  const [open, setOpen] = useState(false);
  const [ alertMsg, setAlertMsg ] = useState({});

  // const [ branch, setBranch ] = useState('');
  // console.log(expenses);


  const handleOpen = () => setOpen(!open);


  const handleSubmit = async (event) => {
    const { target } = event;
    event.preventDefault();
    var secret = 'SK'+Math.random().toString(36).slice(2);
    
    // return await updateExpensesRecord(12).then(
    //   handleOpen()
    // );

    const branch_id = target.branch_id.value;
    if (branch_id === '0') {
      return alert('Oops..! Select branch to proceed');
    }
    const expInputs = {
      id: secret,
      user_id: 1,
      created_at: cur_date,
      branch_id: branch_id,
      exp_title: target.exp_title.value,
      exp_description: target.exp_description.value,
      cost: target.cost.value
      // obj: []
    };
    
    const xn = [];
    xn.push({...expInputs, id: secret});
    await addExpensesRecord(expInputs).then(
      // handleOpen()
      setAlertMsg({a: 'success', b: 'Expense record successfully added'})
    );
    document.getElementById("ensesForm").reset();
    handleOpen();
    
  }

  const handleChange = (e) => {
    // return alert(e.target.value);
    // setBranch(e.target.value);
    // console.log(branch);
  }

  const handleExpDel = async (docId) => {
    // return alert(docId);
    if (window.confirm("Click ok to confirm expenses record deletion.")) { 
      await delExpRecord(docId).then(
        setAlertMsg({a: 'success', b: 'Expense deletion successful'})
      );
      handleOpen();
    }
  }

  // useEffect(() => {
  //   handleOpen();
  // },[alertMsg])


  
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


          <form id='ensesForm' onSubmit={handleSubmit}>
            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Date (Readonly)</p></div>  
              
              <div className='input-group-right'>
                <XformInput name='created_at' id='date_today' value={cur_date.toLocaleDateString()+' '+cur_date.toLocaleString('en-IN').split(' ')[1]} type='text' min='0' size='lg' label='System Date' readOnly/>
              </div>
            </div>

            <div className='items-input-group flex'>
              <div className='input-group-left'><p>Select branch name</p></div>
              <div className='input-group-right'>
                <select className='custom-select' name="branch_id" id="">
                  <option value="0">-- Select Branch --</option>
                  <option value="1">Branch 1</option>
                  <option value="2">Branch 2</option>
                </select>
              </div>
            </div>
            
            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Expense Title</p></div>
              <div className='input-group-right'><XformInput name='exp_title' type='text' size='lg' label='Title' required/></div>
            </div>
  
            <div className='items-input-group flex'>
              <div className='input-group-left'><p>Short description (max: 100 characters)</p></div>
              <div className='input-group-right'><Textarea name='exp_description' type='text' maxLength='100' size='lg' label='Expense Description' required/></div>
            </div>

            <div className='items-input-group flex'>
              <div className='input-group-left'><p className='mt-2'>Amount spent</p></div>
              <div className='input-group-right'><XformInput name='cost' type='number' min='0' size='lg' label='Cost' required/></div>
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

      { expenses.length > 0 ?
        <Card className='general-container-size'>
          <CardBody>
            <table className="cart-tbl w-full min-w-max table-auto text-left">
              <thead>
                  <tr className='text-sm'>
                      <th>#</th>
                      <th>Expense Details</th>
                      <th>User/Branch</th>
                      <th className='text-right'>Amount</th>
                      <th className='text-right'>ACTIONS</th>
                  </tr>
              </thead>
              <tbody>
                {
                  expenses.map((exp, index) => {
                    const isLast = index === expenses.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    const { id, branch_id, user_id, exp_title, exp_description, cost, created_at } = exp;
                    return (
                      <tr key={id}>
                        <td className={`${classes} item-description w-10`}>{c++}</td>
                        <td className={classes}>
                          <p className='item-name'>{exp_title}</p>
                          <p className='item-description'>{exp_description}</p>
                          <p className='item-description'>Ref.: {id.substring(3, 15)}</p>
                          <p className='item-description'>{created_at.timestamp}</p>
                        </td>
                        <td className={`${classes}`}>
                          <p className='item-description'>User: {user_id}</p>
                          <p className='item-description'>Branch: {branch_id}</p>
                        </td>
                        <td className={`${classes} text-right`}>
                          <p className='item-name'>₵{cost}</p>
                        </td>
                        <td className={`${classes} text-right`}>
                          <button type='submit' onClick={() => { handleExpDel(id) }} className='del-btn'><FaTimes size='12'/></button>
                          {/* <button className='action-btn'><GrEdit size='12'/></button> */}
                        </td>
                      </tr>
                    )
                  }).reverse()
                }
              </tbody>
            </table>
          </CardBody>
        </Card>
        : null
      }

      <AlertDialog open={open} alertMsg={alertMsg} size='xs' handler={handleOpen}
        footerBtn={
        <Button variant="gradient" color="green" onClick={handleOpen}><span>Continue</span></Button>
      }/>
    </>
  )
}

export default ExpensesPage