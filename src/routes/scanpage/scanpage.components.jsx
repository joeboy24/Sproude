
import React, { useContext, useEffect, useState } from 'react'
import './scanpage.styles.css'
import { Button, Card, CardBody, Dialog, DialogBody, Drawer, IconButton, Input } from '@material-tailwind/react'
import QRCode from 'react-qr-code';
import GenInvoice from './gen-invoice.components';
import ReceiptWithQrCode from './receipt-with-qrcode.components';
import { CartContext } from '../../context/cart.context';
import XcartSalesRow from '../cartpage/cart-sales-row.component';
import ExpandDrawer from '../cartpage/expand-drawer-content.components';
import { ProductsContext } from '../../context/product.context';
import { BsBagCheck } from 'react-icons/bs';
import { infoToast } from '../../utils/firebase/firebase.utils';
import { FaPrint, FaTimes } from 'react-icons/fa';

const ScanPage = () => {
    var c = 1;
    var i = 1;
    const [scanInput, setScanInput] = useState('');
    const onChange = ({ target }) => setScanInput(target.value);

    // const { salesRecords } = useContext(CartContext);
    const { sales, products, getProduct, getSales, updateSalesRecord } = useContext(ProductsContext);
    const [ drawerRec, setDrawerRec ] = useState();
    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const [ newSearchKey, setNewSearchKey ] = useState('');
    const [ searchResult, setSearchResult ] = useState(sales);
    const [ invoiceRecord, setInvoiceRecord ] = useState([]);
    const [ displayInvoice, setDisplayInvoice ] = useState('no');
    const [ showSingleInvoice, setShowSingleInvoice ] = useState(false);
    const [ reloadDom, setReload ] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    

    // console.log(sales);

    const pullDrawerId = (id) => {
        openDrawerBottom();
        setDrawerRec(sales.find(el => el.id == id));
    }


    const pullDialogId = (id) => {
        const holdRec = sales.find(el => el.id == id);
        // const elmHoldFromSales = sales.filter(el => el.id !== id);
        // if (holdRec.del_status !== 'no') {
            setDisplayInvoice('yes')
            setInvoiceRecord(holdRec)
            setDrawerRec(holdRec);
            // setSearchResult(elmHoldFromSales)
            // handleOpen();
            setOpen(true)
            if(holdRec.del_status !== 'no'){
                setTimeout(() => {
                    window.print()
                }, 1000);
            }
        // } else {
            
        // }
    }


    const handleSearch = (event) => {
        const { name, value } = event.target;
        setNewSearchKey(value.toLowerCase());
        var subValue = value;

        if (value.length >= 20) {
            subValue = value.substring(1, 17);
        }
        const newArray = sales.filter(record => record.id.toLowerCase().includes(subValue.toLowerCase()));
        if (newArray) {

            if (newArray.length == 1) {
                console.log('--1--')
                console.log(newArray)
                setDisplayInvoice('yes');
                setDrawerRec(newArray[0])
                setInvoiceRecord(newArray[0])
                setOpen(true)
                
                localStorage.setItem('temInvoice', newArray[0])
            } else {
                if(displayInvoice !== 'no'){
                    setDisplayInvoice('no')
                    setOpen(true)
                }
            }
                setSearchResult(newArray);
        }
    }
    // D1kGpdlvEkXFWvfykOqT


    const reloadInvoiceInSalesView = () => {}


    const handlePay = (event) => {
        event.preventDefault();
        const { total } = invoiceRecord;

        var orderId = 'M'+Math.random().toString(36).slice(2);
        var dis = event.target.discount.value;
        var pay_mode = event.target.pay_mode.value;
        var amt_paid = event.target.amt_paid.value;
        var del_status = event.target.del_status.value;
        var tot = total - dis;
        var paid_debt = tot;
        var debt_bal = 0;

        if (pay_mode == '0' || pay_mode == '-- Payment Mode --') {
            return infoToast('Oops..! Select `Payment Mode` to proceed');
        } else if (del_status == '0' || del_status == '-- Delivery Status --') {
            return infoToast('Oops..! Select `Delivery Status` to proceed');
        }

        if (amt_paid < tot) {
            pay_mode = 'post_pay';
            paid_debt = amt_paid;
            debt_bal = tot - amt_paid;
        }
        // return alert(amt_paid+' '+pay_mode+' '+tot);

        var checks = invoiceRecord;
        var checksResult = {...checks, 
            // id: orderId.toUpperCase(),
            // user: 'Code80',
            // item_details: [],
            total: tot,
            debt_bal: debt_bal,
            paid_debt: paid_debt,
            pay_mode: pay_mode,
            // buyer_name: event.target.buyer_name.value,
            // buyer_contact: event.target.buyer_contact.value,
            discount: dis,
            amt_paid: amt_paid,
            del_status: del_status,
            // created_at: new Date(),
            // count: sales.reduce((t, c) => t + 1, 0),
            updated_at: new Date(), 
            del: 'no'
        };
        
        setNewSearchKey('')
        updateSalesRecord(checksResult);
        // setDisplayInvoice('no')
        const elmHoldFromSales = sales.filter(el => el.id !== checks.id);
        setSearchResult(elmHoldFromSales)
        // setReload(!reloadDom)
        setTimeout(() => {
            setInvoiceRecord(checksResult);
            // pullDialogId(checksResult.id)
            getSales()
            // getProduct()
            // window.print()
        }, 1000);
    }

    // useEffect(() => {
    //     setReload(!reloadDom);
    //     console.log(reloadDom);
    // },[searchResult]);

    useEffect(() => {
        setSearchResult(Object.assign(searchResult, invoiceRecord));
    },[invoiceRecord]);

    useEffect(() => {
        // const locInvoice = localStorage.getItem('temInvoice')
        setSearchResult(sales);
        // if(locInvoice) {
        //     setInvoiceRecord(locInvoice)
        // }
    },[sales]);

    // useEffect(() => {
    //     setSearchResult(sales);
    // },[products]);

    

  return (
    <>
        <Card className='general-container-size no-print'>
            <CardBody>
                <div className='scanner-top'>
                    <div className="relative flex w-full">
                        <Input
                            type="text"
                            label="Scan QR Code"
                            value={newSearchKey}
                            onChange={handleSearch}
                            className="scan-input rounded-md"
                            containerProps={{
                            className: "min-w-0",
                            }} autoFocus
                        />
                        <Button
                            size="sm"
                            onClick={reloadInvoiceInSalesView}
                            disabled={!newSearchKey}
                            className={`${scanInput ? "bg-gray-200" : "bg-blue-gray-800"} !absolute right-1 top-1 rounded`} >
                            Read Code 
                        </Button>
                    </div>
                </div>

            { displayInvoice !== 'no' ?
                <>
                { invoiceRecord.del_status === 'no' ? 
                    <form onSubmit={handlePay}>
                        <div className='pay-mode'> 
                                
                            <input className='xform-input myInput-dark' name='buyer_name' value={invoiceRecord.buyer_name} placeholder="Buyer's Name" readOnly/>
                            <input type='number' min='0' className='xform-input myInput-dark' value={invoiceRecord.buyer_contact} name='buyer_contact' placeholder="Contact" readOnly/>
                            <select name='del_status' className='xform-input myInput-dark'>
                                {/* <option defaultValue="0">-- Delivery Status --</option> */}
                                <option value="yes">Delivered</option>
                                {/* <option value="no">Not Delivered</option> */}
                            </select>
                        
                            <select name='pay_mode' className='xform-input myInput-dark'>
                                <option defaultValue="0">-- Payment Mode --</option>
                                <option value="cash">Cash</option>
                                <option value="cheque">Cheque</option>
                                <option value="momo">Mobile Money</option>
                                <option value="post_pay">Post Payment(Debt)</option>
                            </select>
                            <input type='number' min='0' className='xform-input myInput-dark' step='any' name='discount' placeholder="Discount eg. 10" required/>
                            <input type='number' min='0' className='xform-input myInput-dark' step='any' name='amt_paid' placeholder="Amount Paid" required/>
                            
                        </div>
                        <Button type='submit' className='float-right' size='sm' variant="outlined">&nbsp;<BsBagCheck size='18' className='float-left mr-2'/> Confirm Payment &nbsp;</Button>
                    </form>
                :null}

                <div className='w-full float-right mt-7'>
                    {/* { invoiceRecord.del_status !== 'no' ? */}
                        <Button className='float-left no-print text-xs font-light m-1' size='sm' variant="outlined" onClick={() => {window.print()}}>&nbsp;<FaPrint size='12' className='float-left mr-2'/> Print Receipt &nbsp;</Button>
                    {/* :null} */}
                    <GenInvoice invoiceRecord={invoiceRecord}/>
                </div>
                </>
            :null}

            </CardBody>
        </Card>


        <Card className='cartpage-content no-print'>
            <CardBody>
                <div className='table-container1 overflow-auto'>
                    <table className="cart-tbl w-calc[100%-100px] min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ORDER REF#</th>
                                <th>PAYMENT</th>
                                <th>BUYER</th>
                                <th className='text-center'>TOTAL GH₵</th>
                                <th>DATE</th>
                                <th className='text-right'>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* { displayInvoice !== 'no' ? 
                                <XcartSalesRow key={invoiceRecord.id} getDialogId={pullDialogId} getDrawerId={pullDrawerId} i={i++} order={invoiceRecord} classes='p-4 border-blue-gray-50' />
                            :null} */}
                            { searchResult.length == 1 ? 
                                <XcartSalesRow key={searchResult[0].id} getDialogId={pullDialogId} getDrawerId={pullDrawerId} i={i++} order={searchResult[0]} classes='p-4 border-blue-gray-50' />
                            :null}
                            { searchResult.length > 1 ?
                               searchResult.map((order, index) => {
                                    const isLast = index === searchResult.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-blue-gray-50";
                                    return(
                                        <>
                                        <XcartSalesRow key={order.id} getDialogId={pullDialogId} getDrawerId={pullDrawerId} i={i++} order={order} classes={classes} />
                                        </>
                                    );
                                }).reverse()
                            :null}
                            {/* <tr key={order.id}>
                                <td></td>
                                <td className='px-4 text-right'>
                                    <p className='item-name'>Total :</p>
                                    <p className='item-description'>Records / Amount</p>
                                </td>
                                <td className='pl-14 py-3'><p className='item-description'>{cartCount}</p></td>
                                <td className='pl-14 py-3'></td>
                                <td className='px-4 text-center'><p className='item-name'>{(searchResult.reduce((total, item) => total + item.total, 0)).toFixed(2).toLocaleString()}</p></td>
                                <td></td>
                            </tr> */}
                        </tbody>
                    </table>


                    { openBottom == true ? 
                        <Drawer placement="bottom" open={openBottom} onClose={closeDrawerBottom} className="p-4 overflow-auto">
                            <ExpandDrawer order={drawerRec} />
                        </Drawer>
                    :null}
                    

                </div>
            </CardBody>
        </Card>


        { open == true ?
            <div className='receipt-cover p-2 rounded-md bg-white'>
                <Button className='float-left no-print' size='sm' variant="outlined" onClick={() => {window.print()}}>&nbsp;<FaPrint size='18' className='float-left mr-2'/> Print &nbsp;</Button>
                <IconButton size='sm' className='del-btn float-right no-print' onClick={handleOpen}><FaTimes size='16'/></IconButton>
                <div className='w-1/3 receipt-container pr-2'>
                    <ReceiptWithQrCode invoiceRecord={drawerRec} scanCode={scanInput} />
                </div>
            </div>
        :null}
        

        {/* <Dialog size='sm' open={open} handler={handleOpen}>
            <DialogBody>
            { open == true ?
                <>
                <Button className='float-right no-print' size='sm' variant="outlined" onClick={() => {window.print()}}>&nbsp;<FaPrint size='18' className='float-left mr-2'/> Print &nbsp;</Button>
                <div className='receipt-container pr-2'>
                    <ReceiptWithQrCode invoiceRecord={drawerRec} scanCode={scanInput} />
                </div>
                </>
            :null}
            </DialogBody>
        </Dialog> */}

    </>
  )
}

export default ScanPage