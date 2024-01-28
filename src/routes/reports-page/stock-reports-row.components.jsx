
import React, { useContext } from 'react'
// import './scanpage.styles.css'
import { ProductsContext } from '../../context/product.context';
import useAuth from '../../hooks/useAuth';
import { newDate, newTime } from './reports.components';


const StockReportsRow = ({c, stock}) => {
    const { id, product_id, image, name, description, category, brand, qty, rtl_qty, whl_qty, price, rtl_price, whl_price, publish, barcode, expiry, del } = stock;
   
  return (
    <tr>
        <td className='item-description'>{c}</td>
        <td className='text-left'>{name}
            <p className='item-description'>{brand} - {category}</p>
            <p className='item-description mt-2'>{product_id} - {description}</p>
        </td>
        <td>Gen: {(+price).toLocaleString()}
            {/* <p className='item-description'>Gen: {price.toLocaleString()}</p> */}
            <p className='item-description'>RTL: {(+rtl_price).toLocaleString()}</p>
            <p className='item-description'>WHL.: {(+whl_price).toLocaleString()}</p>
        </td>
        <td>Gen: {(+qty).toLocaleString()}
            {/* <p className='item-description'>Gen: {qty.toLocaleString()}</p> */}
            <p className='item-description'>RTL: {(+rtl_qty).toLocaleString()}</p>
            <p className='item-description'>WHL.: {(+whl_qty).toLocaleString()}</p>
        </td>
        <td>
            <p className='item-description'>Publish: {publish}</p>
            <p className='item-description'>Deleted: {del}</p>
            <p className='item-description'>Expiry: {expiry}</p>
        </td>
    </tr>
  )
}

export default StockReportsRow