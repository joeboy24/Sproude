
import React, { useContext } from 'react'
// import './scanpage.styles.css'
import { ProductsContext } from '../../context/product.context';
import useAuth from '../../hooks/useAuth';
import { newDate, newTime } from './reports.components';


const SalesReportsRow = ({c, sale}) => {
    const { company } = useAuth()
    const { products } = useContext(ProductsContext);
    const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, secs, created_at, updated_at } = sale;
    // const { country, companyName, slogan, phone, email, logo, address1, address2 } = company;

    const cur_date = new Date(created_at.seconds*1000);
    
    const tot_qty = item_details.reduce(
        (total, item) => total + item.quantity, 0
    );
    const tot_amt = item_details.reduce(
        (total, item) => total + item.purchase_total, 0
    );
    var dt = newDate(sale.created_at);
    var tm = newTime(sale.created_at);


  return (
    <tr>
        <td className='item-description'>{c}</td>
        <td className='text-left'>
            {id.substring(2, 10)}<p className='item-description'>{buyer_name} - {buyer_contact}</p>
            <p className='item-description mt-2'>Date:&nbsp;{dt+' | '+tm}
            </p>
        </td>
        <td>{pay_mode}
            { pay_mode == 'post_pay' ? 
                <>
                    <p className='item-description'>Discount: {discount}</p>
                    <p className='item-description'>Paid: {paid_debt.toLocaleString()}</p>
                    <p className='item-description'>Bal.: {debt_bal.toLocaleString()}</p>
                </>
            :<p className='item-description'>Amt. Paid: {amt_paid}</p>}
        </td>
        <td className='text-center capitalize'>{del_status}</td>
        <td>{total.toLocaleString()}</td>
    </tr>
  )
}

export default SalesReportsRow