import React, { useContext, useEffect, useState } from 'react';
import './stockpage.styles.css';
import '../other-styles.styles.css';
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Drawer, Input, Option, Popover, PopoverContent, PopoverHandler, Select, Textarea } from '@material-tailwind/react';
import { BsBagPlus, BsCheck2Circle, BsCheckCircle, BsClipboardPlus, BsPlus, BsPlusCircle  } from 'react-icons/bs';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import XformInput from '../../components/form/forminput.component';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { ProductsContext } from '../../context/product.context';
import InventoryRow from './inventory-row.component';
import { IoWarningOutline } from 'react-icons/io5';
import { LuBaggageClaim, LuClipboardSignature, LuUserPlus } from 'react-icons/lu';
import { Toaster, toast } from 'sonner'
import { createSupplierDoc, deletePurchasesDoc, errorToast, getPurchasesDocs, getSupplierDocs, infoToast, successToast } from '../../utils/firebase/firebase.utils';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { FcInfo } from 'react-icons/fc';
import { MdAddTask } from 'react-icons/md';
import { BiSolidCircle, BiSolidPlusSquare, BiTrash } from 'react-icons/bi';
import { CartContext } from '../../context/cart.context';
import PurchaseRow from './purchase-row.component';
import PurchaseDrawer from './purchase-drawer.component';


const PurchasesPage = () => {

    // console.log('-- New Item Page Started --');
  var i = 1;
  var pId2 = 'P'+Math.random().toString(36).slice(2);
  const pId = pId2.toUpperCase().substring(0, 7);
  const defaultFormValues = {
    supplier_name: '',
    supplier_contact: '',
    purchase_date: '',
    del_status: '',
    qty: '',
    cost: '',
    del: 'no',
    purchased_items: [],
    created_at: new Date,
    updated_at: ''
  }


//   const locPurItems = JSON.parse(localStorage.getItem('locPurItems'));
//   const { } = useContext(CartContext);
  const [ showHeader, setShowHeader ] = useState('new');
  const { products, expenses, getProduct, purchss, addPurchases, getPurchases, supplier, addSupplier, getSupplier } = useContext(ProductsContext);
  const [ updateID, setUpdateID ] = useState('');
  const [ formFields, setFormFields ] = useState(defaultFormValues);
  const { supplier_name, supplier_contact, purchase_date, del_status, qty, cost, del } = formFields;

  const [ localCart, setLocalCart ] = useState(purchss);
  const [ searchItems, setSearchItems ] = useState([]);
  const [ searchItemValue, setSearchItemValue ] = useState('');
  const [ purchaseRecords, setPurchaseRecords ] = useState(purchss);
  const [ toggleRefresh, setToggleRefresh ] = useState(false);
  const [ searchKey, setSearchKey ] = useState('');
  const [ recs, setRecs ] = useState(purchss);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [openBottom, setOpenBottom] = useState(false);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  const [ drawerRec, setDrawerRec ] = useState();
  const [ suppliers, setSuppliers ] = useState(supplier);

  const [supName, setSupName] = useState("");
  const onChangeSup = ({ target }) => setSupName(target.value);
  const [addIndItem, setAddIndItem] = useState("");
  const onchangeInd = ({ target }) => {
    setAddIndItem(target.value);
    var newQty = localCart.reduce((total, el) => total + (+el.qty), 0)
    formFields['qty'] = newQty + (+target.value)
    setFormFields(formFields)
  }

  const clearLocalCart = () => {
    if (window.confirm("Click `OK` to empty items container")) { 
      localStorage.removeItem('locPurItems')
      setLocalCart([])
    }
  }

  // console.log(purchaseRecords)

  const pullDrawerId = (id) => {
      openDrawerBottom();
      setDrawerRec(purchss.find(el => el.id == id));
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    var sendArray = {...formFields, [name]: value};
    localStorage.setItem('localPurchases', JSON.stringify(sendArray))
    setFormFields(sendArray);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const locPurItems = JSON.parse(localStorage.getItem('locPurItems'));

    if (!locPurItems || locPurItems.length < 1) {
        return infoToast('Attention..! Add purchased items to proceed')
    }
    if (event.target.del_status.value == '-- Delivery Status --') {
        return infoToast('Select delivery status to proceed')
    }
    formFields['purchased_items'] = localCart;
    addPurchases(formFields).then(
      setSearchItems([]),
      localStorage.removeItem('localCart'),

      localStorage.removeItem('locPurItems'),
      setLocalCart([]),
      formFields['qty'] = 0,
      setFormFields(formFields)
    );

  }


  const pull_id = (id) => {
    setShowHeader('update')
    setFormFields(products.find(el => el.id == id));
  }

  const pull_purDel = (purDel, added) => {
    // console.log(purDel)
    // console.log(added)
    deletePurchasesDoc(purDel, added).then(
      getPurchases()
    );
  }


  // const handleAddNewItem = () => {
  //   setShowHeader('new'); 
  //   setFormFields({}); 
  //   handleOpen();
  // }




  // Search Item Add
  const handleSearchItems = (event) => {
    const { name, value } = event.target;
    
    if (value.length > 0) {
        const result = products.filter(el => el.name.toLowerCase().includes(value) || el.barcode.includes(value));
        if (result) {
            setSearchItemValue(value);
            setSearchItems(result);
            // successToast('Correct')
        }
    } else {
        // errorToast('Empty')
        setSearchItemValue(value);
        setSearchItems([]);
    }
    // localStorage.setItem('locPurItems', JSON.stringify(result));
  }

  const handItemSubmit = () => {}


  const handleItemDoubleClick = (id) => {
    
    // const qtyToAdd = event.target.qtyToAdd.value;
    // console.log(addIndItem)
    // return
    // {id: 'XdavrMns3VLlARYQmojj', name: 'Spoude Sachet Water', description: 'Single Bag (1)'},
    // {id: 'QBl5dhcbbusAlDE6wErN', name: 'Cranberry Juice', description: 'Single Package'} JSON.parse(localStorage.getItem('locPurItems'))
    const getCurLocItems = localCart;
    const itemToAdd = products.find(item => item.id == id);
    const existCheck = getCurLocItems.find(el => el.id == id);

    if (!existCheck) {
        getCurLocItems.push({id: id, name: itemToAdd.name, description: itemToAdd.description, qty: addIndItem});
        setLocalCart(getCurLocItems);
        localStorage.setItem('locPurItems', JSON.stringify(getCurLocItems));
        successToast('Item successfully added')
    } else {
        errorToast('Oops..! Item already exists')
    }
    setToggleRefresh(!toggleRefresh)
    
    // salesReceiver.push({...doc.data(), id: doc.id})
    // const locPurItems = JSON.parse(localStorage.getItem('locPurItems'));
  }


  const handleItemRemove = (id) => {
    // return alert(id)
    if (window.confirm("Click 'OK' to confirm item deletion")) { 
        const locFilter = localCart.filter(el => el.id !== id);
        setLocalCart(locFilter);
        localStorage.setItem('locPurItems', JSON.stringify(locFilter));
        successToast('Item removed from record')
    }
  }

  
  const handlePurSearch = (event) => {
    const skey = event.target.value; // || el.cost.toLowerCase().includes(skey.toLowerCase)
    setSearchKey(skey)
    const result = purchss.filter(el => el.supplier_name.toLowerCase().includes(skey))
    setPurchaseRecords(result)
    console.log(skey)
    // console.log(purchaseRecords)
    // console.log(searchKey)
  }


  const addNewSupplier = async () => {
    const docToAdd = {
      supplier_name: supName,
      created_at: new Date()
    }
    addSupplier(docToAdd).then(setSupName(''));
    // await createSupplierDoc(docToAdd).then(successToast('Successfully added '+supName+' as supplier'))
    // const supps = 
    // getSupplier();
    // console.log(supps)
    // setSuppliers(supps);
  }



  useEffect(() => {
    // setRecs(purchss)
    setPurchaseRecords(purchss)
    // console.log(getPurchases())
  },[purchss]);

  // console.log(1)

  useEffect(() => {

    // localStorage.removeItem('localPurchases')
    const locPur = localStorage.getItem('localPurchases');
    const locPurItems = localStorage.getItem('locPurItems');

    if (locPur) {
        setFormFields(JSON.parse(locPur));
    }
    if (locPurItems) {
        setLocalCart(JSON.parse(locPurItems));
    }
    if (localCart) {
      formFields['qty'] = localCart.reduce((total, el) => total + (+el.qty), 0)
      setFormFields(formFields)
    }

    // getPurchases();
    // console.log(getPurchases())
  },[]);


  useEffect(() => {
    if (localCart) {
      formFields['qty'] = localCart.reduce((total, el) => total + (+el.qty), 0)
      setFormFields(formFields)
    }
  },[localCart]);


  useEffect(() => {
    setSuppliers(supplier);
  },[supplier]);




  return (
    <>
      <Card className='general-container-size !p-2'>

        <CardBody> 

          
          <Popover>
            <PopoverHandler>
              {/* <Button>Popover</Button> */}
              <p className='change-date-link-inverse float-right'><LuUserPlus size='16' className='float-left mr-2 mt-0.5' /> Add Supplier</p>
            </PopoverHandler>
            <PopoverContent>
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  type="email"
                  label="Supplier Name"
                  value={supName}
                  onChange={onChangeSup}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  size="sm"
                  color={supName ? "gray" : "blue-gray"}
                  disabled={!supName}
                  onClick={addNewSupplier}
                  className="!absolute right-1 top-1 rounded"
                > Add
                </Button>
              </div>

            </PopoverContent>
          </Popover>

          <div className="input-with-btn">
              <Input
                  type="text"
                  label="Search Purchases"
                  value={searchKey}
                  onChange={handlePurSearch}
                  className="scan-input rounded-md"
                  containerProps={{
                  className: "min-w-0",
                  }} autoFocus
              />
              <Button
                  size="sm"
                  // onClick={reloadInvoiceInSalesView}
                  // disabled={!searchKey}
                  className={`${products ? "bg-gray-200" : "bg-blue-gray-800"} !absolute right-1 top-1 rounded`} 
                  >
                  <FaSearch size='14' className='float-left' />
              </Button>
          </div>

          <div className='border py-3 mt-5 mb-4 rounded-md'>
              <form onSubmit={handleSubmit}>
                  <div className='cart-cont1 w-full'>
                    <select className='xform-input w-2/6 custom-select' size='lg' label="Select status" name='supplier_name' onChange={handleChange}>
                      <option defaultValue='0'>-- Supplier Name --</option>
                      { suppliers.map(supp => 
                        <option key={supp.id} value={supp.id}>{supp.supplier_name}</option>
                      )}
                    </select>
                    {/* <XformInput className='xform-input w-2/6' onChange={handleChange} value={supplier_name} name='supplier_name' type='text' size='md' label="Supplier's Name" required/> */}
                    <XformInput className='xform-input w-2/6' onChange={handleChange} value={supplier_contact} name='supplier_contact' type='number' min='0' size='md' label="Supplier's Contact" required/>
                    <XformInput className='xform-input w-2/6' onChange={handleChange} value={purchase_date} name='purchase_date' type='date' size='md' label='Purchase Date' required/>
                  </div>
                  <div className='cart-cont1 w-full'>
                      <XformInput className='xform-input w-2/6' onChange={handleChange} value={qty} name='qty' type='number' min='0' size='md' label='Total Qty' readOnly/>
                      <XformInput className='xform-input w-2/6' onChange={handleChange} value={cost} name='cost' type='number' min='0' size='md' label='Total Cost' required/>
                      <select className='xform-input w-2/6 custom-select' size='lg' label="Select status" name='del_status' onChange={handleChange}>
                          <>
                              <option defaultValue='0'>-- Delivery Status --</option>
                              <option value='yes'>Delivered</option>
                              <option value='no'>Pending</option>
                          </>
                      </select>
                  </div>
                  <hr className="my-3 border-blue-gray-100" />

                  <p className='blue-head text-xs mx-4 my-1 tracking-wide'><FcInfo size='16' className='float-left' /> &nbsp; Add purchased items to record</p>

                  <div className='flex w-full px-1'>
                      <XformInput className='xform-input w-2/3' onChange={handleSearchItems} value={searchItemValue} name='qty' type='text' min='0' size='md' label='Scan / Type Code'/>
                      {/* <button onClick={handleAddNewItem} className='change-date-link !my-1.5'><BsPlusCircle size='16' className='float-left mr-2 mt-0.5' /> Add Item</button> */}
                  </div>

                  { searchItems.length > 0 ? 
                      <div className='search-items-container'>
                          { searchItems.map(item => item.del == 'no' ?
                            <div key={item.id}>
                              {/* <p className='search-items' onDoubleClick={() => {handleItemDoubleClick(item.id)}} key={item.id}>
                                <BiSolidCircle size='8' className='float-left' />&nbsp; {item.name} &nbsp;
                              </p> */}
                              
                              <Popover>
                                <PopoverHandler>
                                  <p className='search-items'><BiSolidCircle size='8' className='float-left' />&nbsp; {item.name} &nbsp;</p>
                                  {/* <p className='change-date-link-inverse float-right'><LuUserPlus size='16' className='float-left mr-2 mt-0.5' /> Add Supplier</p> */}
                                </PopoverHandler>
                                <PopoverContent>
                                  <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                      name='qtyToAdd'
                                      type="number" min='1'
                                      label="Quantity"
                                      value={addIndItem}
                                      onChange={onchangeInd}
                                      className="pr-24"
                                      containerProps={{
                                        className: "min-w-0",
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => {handleItemDoubleClick(item.id)}}
                                      color={addIndItem ? "gray" : "blue-gray"}
                                      disabled={addIndItem < 1}
                                      className="!absolute right-1 top-1 rounded"
                                    > Add Item
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                               :null 
                          )}
                      </div>
                  :null}
                  
                  { localCart.length > 0 ? 
                      <div className='purchased-items-container'>
                      <p className='added-items-clear' onClick={clearLocalCart}>&nbsp; CLEAR &nbsp;<BiTrash size='16' className='float-right' /></p>
                          { localCart.map(item => 
                              <p className='added-items' onDoubleClick={() => {handleItemRemove(item.id)}} key={item.id}><BiSolidCircle size='8' className='float-left' />&nbsp; {item.name+' / '+item.qty} &nbsp;</p>
                          )}
                      </div>
                  :null}
                  { localCart.length > 0 ?
                      <Button type='submit' className='float-right m-2' size='sm' variant="outlined">&nbsp;<TbShoppingBagPlus size='18' className='float-left mr-2'/> Save Purchase &nbsp;</Button>
                  : null }
              </form>
              <p className='my-12'></p>
          </div> 
            
          { purchaseRecords.length > 0 ?
            <div className='tbl-container overflow-auto'>
              <table className="cart-tbl w-calc[100%-100px] min-w-max table-auto text-left">
                <thead>
                    <tr>
                        <th>SUPPLIER</th>
                        <th>STATUS</th>
                        <th className='text-right'>COST/QTY</th>
                        <th className='text-right'>DATE</th>
                        <th className='text-right'>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {purchaseRecords.map((pur, index) => {
                      var sendClass = '';
                      const isLast = index === 0;
                      const classes = isLast ? "p-4" : "p-4 border-blue-gray-50";
                      const supp = suppliers.find(el => el.id == pur.supplier_name)
                      if (pur.del === 'no') {
                        sendClass = 'even:bg-blue-gray-50/30';
                      } else {
                        sendClass = 'bg-red-100/80 !border-b-4 border-b-white';
                      }
                      return(
                        <PurchaseRow key={pur.id} getId={pull_id} getPurDel={pull_purDel} i={i++} purchase={pur} supplier={supp} getDrawerId={pullDrawerId} classes={classes} sendClass={sendClass} openDialog={handleOpen}/>
                      );
                    })}
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
            </div>
          : null
          // <p className='item-description text-center uppercase'>Oops..! No items found</p>
          }

          { openBottom == true ? 
              <Drawer placement="bottom" open={openBottom} onClose={closeDrawerBottom} className="p-4 overflow-auto">
                  <PurchaseDrawer itemsPur={drawerRec} />
              </Drawer>
          :null}
        </CardBody>
      </Card>



      
      {/* <Dialog open={open} handler={handleOpen}>
        
        <div className='dialog-top flex'><TbShoppingBagPlus size='20'/>
          { showHeader === 'new'
          ? 
          <p className='text-center'>&nbsp;&nbsp;New Purchase</p>
           : <p className='text-center'>&nbsp;&nbsp;Update Product</p>
           }
        </div>

        <form onSubmit={handleSubmit}>

          <DialogBody className='dialog-body-container'>
            <div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p className='mt-2'>Supplier's Name</p></div>
                    <div className='input-group-right'><XformInput onChange={handleChange} value={supplier_name} name='supplier_name' type='text' size='lg' label="Supplier's Name" required/></div>
                </div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p>Supplier's Contact</p></div>
                    <div className='input-group-right'><XformInput onChange={handleChange} value={supplier_contact} name='supplier_contact' type='number' min='0' size='lg' label="Supplier's Contact" required/></div>
                </div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p className='mt-2'>Purchase date</p></div>
                    <div className='input-group-right'><XformInput onChange={handleChange} value={purchase_date} name='purchase_date' type='date' size='lg' label='Purchase Date' required/></div>
                </div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p>Delivery status</p></div>
                    <div className='input-group-right'>
                    <select className='custom-select' size='lg' label="Select status" name='del_status' onChange={handleChange}>
                        <option value='yes'>Delivered</option>
                        <option value='no'>Pending</option>
                    </select>
                    </div>
                </div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p>Total Quantity</p></div>
                    <div className='input-group-right'><XformInput onChange={handleChange} value={qty} name='qty' type='number' min='0' size='lg' label='Total Qty' required/></div>
                </div>

                <div className='items-input-group flex'>
                    <div className='input-group-left'><p>Total Cost</p></div>
                    <div className='input-group-right'><XformInput onChange={handleChange} value={cost} name='cost' type='number' min='0' size='lg' label='Total Cost' required/></div>
                </div>

                <hr className="my-2 border-blue-gray-50" />

                <div className='items-input-group flex'>
                    <div className='input-group-left'></div>
                    <div className='input-group-right'>
                    <Button className='myBtn float-right' type='submit'>&nbsp;&nbsp;<BsCheckCircle size='18' className='float-left'/>&nbsp;&nbsp;<span>Submit</span>&nbsp;&nbsp;</Button>
                    </div>
                </div>
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

      </Dialog> */}
    </>
  )
}

export default PurchasesPage