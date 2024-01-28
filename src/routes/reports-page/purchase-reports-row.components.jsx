
import React, { useContext } from 'react'
// import './scanpage.styles.css'
import { ProductsContext } from '../../context/product.context';
import useAuth from '../../hooks/useAuth';
import { newDate, newTime } from './reports.components';


const PurchaseReportsRow = ({c, purchase}) => {
    const { id, supplier_name, supplier_contact, qty, cost, del_status, purchase_date, purchased_items, created_at, del } = purchase;
   
  return (
    <tr>
        <td className='item-description'>{c}</td>
        <td className='text-left'>{supplier_name}
            <p className='item-description'>{supplier_contact}</p>
            <p className='item-description'>Purchased on {purchase_date}</p>
        </td>
        <td>{ del_status == 'yes' ? <p>Delivered</p> : <p>Pending</p> }
            <p className='item-description'>Deleted: {del}</p>
        </td>
        <td>{purchased_items.length > 1 ? <p>{purchased_items.length} Items</p> : <p>{purchased_items.length} Item</p> }
            { purchased_items.map(item => <p key={Math.random()} className='item-description'>{item.name+' | '+item.qty}</p>) }
        </td>
        <td>Cost: {(+cost).toLocaleString()}
            <p className='item-description'>Qty: {(+qty).toLocaleString()}</p>
        </td>
    </tr>
  )
}

export default PurchaseReportsRow