
import React, { useEffect, useState } from 'react'
import './reports.styles.css'
import '../other-styles.styles.css'
import { Button, Card, CardBody, Input, Popover, PopoverContent, PopoverHandler, Tooltip } from '@material-tailwind/react'
import { FiDownload, FiFilter } from 'react-icons/fi'
import { PiPrinterFill } from 'react-icons/pi'
import { FaFileLines, FaRegFileLines } from 'react-icons/fa6'
import XformInput from '../../components/form/forminput.component'
import { BiRefresh } from 'react-icons/bi'
import { FetchReports, FetchReportsNoDate, errorToast, infoToast, successToast } from '../../utils/firebase/firebase.utils'
import useAuth from '../../hooks/useAuth'
import SalesReportsRow from './sales-reports-row.components'
import StockReportsRow from './stock-reports-row.components'
import PurchaseReportsRow from './purchase-reports-row.components'
import { useNavigate } from 'react-router-dom'

const ReportsPage = () => {
    // console.log('Started');
    var c = 1;
    var i = 1;
    var y = 1;
    const navigate = useNavigate()
    const { company } = useAuth();
    // const { country, companyName, slogan, phone, email, logo, address1, address2 } = company;
    const [ fetchRecords, setFetchRecords ] = useState([])
    const [ showDate, setShowDate ] = useState(true)
    const [ totalSales, setTotalSales ] = useState(0)

    const showDateFunc = ({target}) => {
        if (target.value == 'sales') {
            setShowDate(true)
        } else {
            setShowDate(false)
        }
    }

    const printPage = () => {
        window.print()
    }

    const reportFilter = async (event) => {
        event.preventDefault()
        const { target } = event;
        const report_type = target.report_type.value;
        const order = target.order.value;
        // console.log(report_type)

        if (report_type == 'sales') {

            if (!target.from || !target.to || target.from.value == '') {
                infoToast('Select Date From/To to Proceed')
                return window.location.reload()
            }
            const from = target.from.value;
            const to = target.to.value;
            // return infoToast(report_type)

            if (!from || !to) {
                return infoToast('Select Date From/To to Proceed')
            }
            const fromSecs = processSecs(from)
            const toSecs = processSecs(to)
            console.log(fromSecs+' '+toSecs)
            // return
            
            const records = await FetchReports(report_type, fromSecs, toSecs, order)
            if (records.length > 0) {
                setFetchRecords(records)
                successToast('Query Successful')

                const setTotSales = records.reduce((total, el) => total + el.total, 0)

                const sendRecords = {
                    report_type: report_type,
                    fromSecs: fromSecs,
                    toSecs: toSecs,
                    fullDuration: newDate(fromSecs)+' - '+newDate(toSecs),
                    total: records.reduce((total, el) => total + el.total, 0),
                    discount: records.reduce((total, el) => total + (+el.discount), 0),
                    debt_bal: records.reduce((total, el) => total + el.debt_bal, 0),
                    paid_debt: records.reduce((total, el) => total + el.paid_debt, 0)
                }
                setTotalSales(sendRecords);
            }else{
                setFetchRecords([])
                errorToast('Oops..! No records found')
            }

        } else if (report_type == 'stock') {
            // return successToast(report_type)

            // report_type = 'products';
            const records = await FetchReportsNoDate('products', order)
            if (records.length > 0) {
                setFetchRecords(records)
                successToast('Query Successful')

                const sendRecords = {
                    report_type: report_type,
                    count: records.length,
                    total_qty: records.reduce((total, el) => total + (+el.qty), 0)
                }
                setTotalSales(sendRecords);
            }else{
                setFetchRecords([])
                errorToast('Oops..! No records found')
            }
            
        } else if (report_type == 'purchases') {
            
            const records = await FetchReportsNoDate('purchases', order)
            if (records.length > 0) {
                setFetchRecords(records)
                successToast('Query Successful')

                const sendRecords = {
                    report_type: report_type,
                    count: records.length,
                    total_qty: records.reduce((total, el) => total + (+el.qty), 0),
                    total_cost: records.reduce((total, el) => total + (+el.cost), 0)
                }
                setTotalSales(sendRecords);
            }else{
                setFetchRecords([])
                errorToast('Oops..! No records found')
            }
            
        }
    }




    // useEffect(() => {
    //     console.log(showDate)
    // }, [showDate]);





  return (
    <>
    <div className='general-container-size bg-white p-6 rounded-md'>
        {/* <CardBody> */}
            <div className="border-b mb-4 h-10 no-print">
                <div className='float-left uppercase'>{totalSales ? <p>{totalSales.report_type} Report</p> :<p>Reports</p>}</div>
                <div className='float-right'>
            
                    <Tooltip content='Download Excel' className='tooltip-style no-print'><button className='action-btn'><FiDownload size='12'/></button></Tooltip>
                    <Tooltip content='Print' className='tooltip-style no-print'><button className='action-btn' onClick={printPage}><FaRegFileLines size='12'/></button></Tooltip>
                    
                    <Popover>
                        <PopoverHandler>
                            <button className='action-btn'><FiFilter size='12'/></button>
                        </PopoverHandler>

                        <PopoverContent>
                            <form onSubmit={reportFilter}>
                                <div className="relative h-10 w-72 min-w-[200px] my-3">
                                    <select name='report_type' onChange={showDateFunc}
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                        <option value="sales">Sales</option>
                                        <option value="stock">Stock</option>
                                        <option value="purchases">Purchases</option>
                                    </select>
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Report Type
                                    </label>
                                </div>

                                { showDate === true ?
                                <>
                                    <XformInput type='date' label='Date From' name='from' className='my-3' />
                                    <XformInput type='date' label='Date To' name='to' className='my-3' />
                                </>
                                :null}

                                <div className="relative h-10 w-72 min-w-[200px] my-3">
                                    <select name='order'
                                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                                        <option value="asc">None</option>
                                        <option value="asc">Accending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                    <label
                                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                        Order
                                    </label>
                                </div>
                                
                                <Button className='myBtn float-right w-full' type='submit'>&nbsp;&nbsp;<BiRefresh size='18' className='float-left'/>&nbsp;&nbsp;<span>Reload</span>&nbsp;&nbsp;</Button>
                            </form>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>

            { company && fetchRecords.length > 0 ?
            
            <div className='invoice-container'>

                <div className='tbl-container overflow-auto'>
                    {/* <div className='invoice-top w-full flex pt-10'>
                        <div className='company-details-left w-2/3'>
                            <img 
                            src={company.logo}
                            // src="https://png.pngtree.com/template/20190119/ourmid/pngtree-water-logo-image_52770.jpg" 92 Cansas Street | Melbourne, Victoria | 001345894777
                            alt="" />
                            <h2>{company.companyName}</h2>
                            <p>Invoice</p>
                        </div>

                        <div className='company-details-right'>
                            <table className='w-full'>
                                <tbody>
                                    <tr><td>Address</td><td>{company.address1}</td></tr>
                                    <tr><td>& Contact</td><td>{company.address2}</td></tr>
                                    <tr><td></td><td>{company.phone}</td></tr>
                                    <tr><td></td><td>{company.country}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    <table className='w-full invoice-center-top'>
                        <tbody>
                            { totalSales.report_type == 'sales' ?
                            <>
                                <tr className='blue-head'>
                                    <td>{totalSales.report_type} Report From / To</td>
                                    <td></td>
                                    <td>Balance</td>
                                    <td className='text-right'>Net Amount (GHS)</td>
                                </tr>
                                <tr className='relative'>
                                    <td>{totalSales.fullDuration}</td>
                                    <td></td>
                                    <td>₵{(totalSales.debt_bal).toLocaleString()}</td>
                                    <td className='amount-focus text-right'>₵{((+totalSales.total)-(+totalSales.discount)).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className='blue-head'>Signed By: Admin</td>
                                </tr>
                            </>
                            : totalSales.report_type == 'stock' ?
                            <>
                                <tr className='blue-head'>
                                    <td>{totalSales.report_type} Report</td>
                                    <td className='text-right'>{totalSales.count} | Total Count</td>
                                </tr>
                                <tr>
                                    <td>Signed By: Admin</td>
                                    <td className='text-right'>{(totalSales.total_qty).toLocaleString()} | Total Items&nbsp;</td>
                                </tr>
                            </>
                            : 
                            <>
                                <tr className='blue-head'>
                                    <td>{totalSales.report_type} Report</td>
                                    <td className=''>Count: {totalSales.count}</td>
                                    <td className='text-right'>Total</td>
                                </tr>
                                <tr>
                                    <td>Signed By: Admin</td>
                                    <td className=''>Quantity: {(totalSales.total_qty).toLocaleString()}&nbsp;</td>
                                    <td className='text-xl text-right'>₵{(+totalSales.total_cost).toLocaleString()}</td>
                                </tr>
                            </>
                            }
                        </tbody>
                    </table>
                </div>
                
                <table className='w-full mt-16 invoice-center'>
                    <tbody>
                        <tr className='blue-head-with-top-padd'>
                            <td>#</td>
                            { totalSales.report_type == 'sales' ?
                            <>
                                <td className='text-left'>Sales Details</td>
                                <td>Payments</td>
                                <td className='w-1/6 text-center'>Delivery</td>
                                <td>Total</td>
                            </>
                            : totalSales.report_type == 'stock' ?
                            <>
                                <td className='text-left'>Product Details</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Others</td>
                            </>
                            : 
                            <>
                                <td className='text-left'>Supplier Details</td>
                                <td>Status</td>
                                <td>Products</td>
                                <td>Total</td>
                            </>
                            }
                        </tr>
                        { totalSales.report_type == 'sales' ? 
                            fetchRecords.map(sale => {
                                // console.log(newDate(sale.created_at));
                                return(<SalesReportsRow key={sale.id} c={c++} sale={sale} />);
                            })
                        : totalSales.report_type == 'stock' ?
                            fetchRecords.map(stock => {
                                // console.log(newDate(sale.created_at));
                                return(<StockReportsRow key={stock.id} c={c++} stock={stock} />);
                            })
                        :
                            fetchRecords.map(purchase => {
                                // console.log(newDate(sale.created_at));
                                return(<PurchaseReportsRow key={i++} c={c++} purchase={purchase} />);
                            })
                        }
                        
                        {/* <tr>
                            <td className='text-left'></td>
                            <td>Subtotal:</td>
                            <td className='text-center'>{tot_qty}</td>
                            <td>{tot_amt.toLocaleString()}</td>
                        </tr> */}
                    </tbody>
                </table>
                
                <table className='w-1/2 invoice-center float-right'>
                    <tbody className='w-full'>
                        
                        { totalSales.report_type == 'sales' ? 
                        <>
                            <tr>
                                <td>Amount Paid<p className='item-description'>Bal.</p></td>
                                <td>{(totalSales.paid_debt).toLocaleString()}
                                    <p className='item-description'>{(totalSales.debt_bal).toLocaleString()}</p>
                                </td>
                            </tr>
                            <tr className='pt-4'>
                                <td><p>Discount</p><p>Tax</p><p className='pt-2'>Total</p></td>
                                <td><p>{(totalSales.discount).toLocaleString()}</p>
                                    <p>0.00</p>
                                    <p className='text-xl font-semibold'>₵{(totalSales.total).toLocaleString()}</p>
                                </td>
                            </tr>
                        </>
                        :null}
                    </tbody>
                </table>
                
            </div>
            :<p className='filter-note'>No records found... Use filter to generate reports</p>}

        {/* </CardBody> */}
    </div>
    </>
  )
}



export const processDate = (x) => {
    var newDate
    if (x.seconds) {
        newDate = new Date(x.seconds*1000) 
    } else {
        newDate = new Date(x*1000)
    }
    // var newDate = new Date(x.seconds*1000)
    var dtArray = newDate.split(" ")
    return dtArray[0]
}

export const processTime = () => {}

export const processSecs = (x) => {
    var dt = new Date(x);
    // add 1 day for accuracy
    dt = dt.setDate(dt.getDate() + 1);
    // dt = dt-57570000;
    dt = dt.toString()
    dt = dt.substring(0, 10)
    // dt = '98725878kljkfjl72834758'.substring(0, 10);
    return dt;
}

export const newDate = (x) => {
    var dt
    // if (x == '') {return 'Null'}
    if (x.seconds) {
        dt = new Date(x.seconds*1000) 
    } else {
        dt = new Date(x*1000)
    }
    dt = dt.toString()
    dt = dt.split(" ")
    dt = dt[0]+' '+dt[1]+'/'+dt[2]+'/'+dt[3]
    return dt
}

export const newTime = (x) => {
    var dt = new Date(x.seconds*1000)
    dt = dt.toString()
    dt = dt.split(" ")
    dt = dt[4]
    return dt
}

export default ReportsPage