
import React, { useContext } from 'react'
import './scanpage.styles.css'
import { ProductsContext } from '../../context/product.context';
import useAuth from '../../hooks/useAuth';


const GenInvoice = ({invoiceRecord}) => {
    const { company } = useAuth()
    const { products } = useContext(ProductsContext);
    const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, created_at, updated_at } = invoiceRecord;
    const { country, companyName, slogan, phone, email, logo, address1, address2 } = company;

    const cur_date = new Date(created_at.seconds*1000);
    
    const tot_qty = item_details.reduce(
        (total, item) => total + item.quantity, 0
    );
    const tot_amt = item_details.reduce(
        (total, item) => total + item.purchase_total, 0
    );


  return (
    <div className='invoice-container'>

        <div className='tbl-container overflow-auto'>
            <div className='invoice-top w-full flex pt-10'>
                <div className='company-details-left w-2/3'>
                    <img 
                    src={logo}
                    // src="https://png.pngtree.com/template/20190119/ourmid/pngtree-water-logo-image_52770.jpg" 92 Cansas Street | Melbourne, Victoria | 001345894777
                    alt="" />
                    <h2>{companyName}</h2>
                    <p>Invoice</p>
                </div>

                <div className='company-details-right'>
                    <table className='w-full'>
                        <tbody>
                            <tr><td>Address</td><td>{address1}</td></tr>
                            <tr><td>& Contact</td><td>{address2}</td></tr>
                            <tr><td></td><td>{phone}</td></tr>
                            <tr><td></td><td>{country}</td></tr>
                            {/* <tr><td>Address</td><td>Franco Estate</td></tr>
                            <tr><td>& Contact</td><td>Kwabenya, Ghana</td></tr>
                            <tr><td></td><td>0202622172</td></tr> */}
                        </tbody>
                    </table>
                </div>
            </div>

            <table className='w-full invoice-center-top'>
                <tbody>
                    <tr className='blue-head'>
                        <td>Billed to</td>
                        <td>Date of Issue</td>
                        <td>Invoice Ref.</td>
                        <td className='text-right'>Amount Due (GHS)</td>
                    </tr>
                    <tr className='relative'>
                        <td>{buyer_name}</td>
                        <td>{cur_date.toLocaleDateString()}</td>
                        <td>{id.substring(2,15)}</td>
                        <td className='amount-focus text-right'>₵{total.toLocaleString()}.00</td>
                    </tr>
                    <tr>
                        <td>{buyer_contact}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Kumasi</td>
                        <td className='blue-head'>Due Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Ghana</td>
                        <td>{cur_date.toLocaleDateString()}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <table className='w-full mt-16 invoice-center'>
            <tbody>
                <tr className='blue-head-with-top-padd'>
                    <td className='text-left'>Item Details</td>
                    <td>Price</td>
                    <td className='w-1/6 text-center'>Qty.</td>
                    <td>Line Total</td>
                </tr>
                {
                    item_details.map((item) => {
                    const { item_id, quantity, price, purchase_type, purchase_total } = item;
                    const product = products.find(el => el.id === item_id);
                    return (
                        <tr key={product.id}>
                            <td className='text-left'>
                                {product.name}<p className='item-description'>{purchase_type} - {product.description}</p>
                            </td>
                            <td>{price}</td>
                            <td className='text-center'>{quantity}</td>
                            <td>{purchase_total.toLocaleString()}</td>
                        </tr>
                    )
                    })
                }
                <tr>
                    <td className='text-left'></td>
                    <td>Subtotal:</td>
                    <td className='text-center'>{tot_qty}</td>
                    <td>{tot_amt.toLocaleString()}</td>
                </tr>
            </tbody>
        </table>

        <table className='w-1/2 invoice-center float-right'>
            <tbody className='w-full'>
                <tr>
                    <td>Amount Paid<p className='item-description'>Change</p></td>
                    <td>{amt_paid}<p className='item-description'>{total - amt_paid <= 0 ? total - amt_paid : null}</p></td>
                </tr>
                <tr className='pt-4'>
                    <td><p>Discount</p><p>Tax</p><p className='pt-2'>Total</p></td>
                    <td><p>{+discount.toLocaleString()}</p><p>0.00</p><p className='text-xl font-semibold'>₵{total.toLocaleString()}.00</p></td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default GenInvoice