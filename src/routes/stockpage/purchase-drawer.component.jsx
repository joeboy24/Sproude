
import { IconButton } from '@material-tailwind/react'
import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import { ProductsContext } from '../../context/product.context';
import { BiSolidCircle } from 'react-icons/bi';

const PurchaseDrawer = ({ itemsPur }) => {

  return (
    <>
    {/* <div>ExpandDrawer {item_details[0].price}</div> */}
    <div className='general-container-wrapper'>
      <div className='general-container-size'>
        <table className='w-full invoice-center'>
          <tbody>
              <tr className='blue-head-with-top-padd'>
                <td className='text-center'>Purchased Items</td>
              </tr>
              <tr>
                <td className='text-center'><p className='item-description'>Total: {itemsPur.purchased_items.length} Items</p></td>
              </tr>
            
              <tr>
                  <td className='text-center'>
                    <div className='purchased-items-container'>
                    {
                      itemsPur.purchased_items.map(item => 
                      <p key={item.id} className='added-items'><BiSolidCircle size='8' className='float-left' />&nbsp; {item.name} &nbsp;</p>
                    )}
                    </div>
                  </td>
              </tr>
          </tbody>
        </table>

        {/* <table className='w-1/2 invoice-center float-right'>
          <tbody className='w-full'>
              <tr className='pt-4'>
                  <td><p>Discount</p><p>Tax</p><p className='pt-2'>Total</p></td>
                  <td><p>{discount}</p><p>0.00</p><p className='text-xl font-semibold'>₵{total}</p></td>
              </tr>
              <tr>
                  <td>Amount Paid<p className='item-description'>Change</p></td>
                  <td>{amt_paid}<p className='item-description'>{total - amt_paid <= 0 ? total - amt_paid : null}</p></td>
              </tr>
          </tbody>
        </table> */}
      </div>
    </div>
    </>
  )
}

export default PurchaseDrawer