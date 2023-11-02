
import { IconButton } from '@material-tailwind/react'
import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import { ProductsContext } from '../../context/product.context';

const ExpandDrawer = ({ order, orderedItems }) => {
  const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, created_at, updated_at } = order;
  const { products } = useContext(ProductsContext);
  const tot_qty = orderedItems.reduce(
    (total, item) => total + item.quantity, 0
  );
  const tot_amt = orderedItems.reduce(
    (total, item) => total + item.purchase_total, 0
  );

  return (
    <>
    <div className='general-container-wrapper'>
      {/* <IconButton className='absolute' variant="text" color="blue-gray" onClick={closeDrawerBottom}>
          <FaTimes className='right-0' />
      </IconButton> */}
      <div className='general-container-size'>
        {/* <div>ExpandDrawer {orderedItems[0].price}</div> */}
        <table className='w-full invoice-center'>
          <tbody>
              <tr className='blue-head-with-top-padd'>
                  <td className='text-left'>Item Details</td>
                  <td>Price</td>
                  <td className='w-1/6 text-center'>Qty.</td>
                  <td>Line Total</td>
              </tr>
              {
                orderedItems.map((item) => {
                  const { item_id, quantity, price, purchase_type, purchase_total } = item;
                  const product = products.find(el => el.id === item_id);
                  return (
                    <tr>
                        <td className='text-left'>{product.name}<p className='item-description'>{purchase_type} - {product.description}</p></td>
                        <td>{price}</td>
                        <td className='text-center'>{quantity}</td>
                        <td>{purchase_total}</td>
                    </tr>
                  )
                })
              }
              <tr>
                  <td className='text-left'></td>
                  <td>Subtotal:</td>
                  <td className='text-center'>{tot_qty}</td>
                  <td>{tot_amt}</td>
              </tr>
          </tbody>
        </table>

        <table className='w-1/2 invoice-center float-right'>
          <tbody className='w-full'>
              <tr className='pt-4'>
                  <td><p>Discount</p><p>Tax</p><p className='pt-2'>Total</p></td>
                  <td><p>{discount}</p><p>0.00</p><p className='text-xl font-semibold'>₵{total}</p></td>
              </tr>
              <tr>
                  <td>Amount Paid<p className='item-description'>Change</p></td>
                  <td>{amt_paid}<p className='item-description'>{total - amt_paid < 0 ? total - amt_paid : null}</p></td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default ExpandDrawer