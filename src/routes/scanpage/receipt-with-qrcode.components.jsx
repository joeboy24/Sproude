
import { React, useContext } from 'react'
import QRCode from 'react-qr-code'
import { ProductsContext } from '../../context/product.context';


const ReceiptWithQrCode = ({ users, company, invoiceRecord, scanCode }) => {
  const { products } = useContext(ProductsContext);
  const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, created_at, updated_at } = invoiceRecord;
  const { country, companyName, slogan, phone, email, logo, address1, address2 } = company;
  
  const tot_qty = item_details.reduce(
      (total, item) => total + item.quantity, 0
  );
  const tot_amt = item_details.reduce(
      (total, item) => total + item.purchase_total, 0
  );

  const recUser = users.filter(el => el.uid == user);
  console.log(users);
  console.log(user);
  console.log(recUser);
  console.log(recUser[0]);
  
  return (
    <>
      <div key={id}>
        <QRCode value={id} size={120} style={{ width: '100%' }}/>

        <h2 className='text-center text-sm font-semibold mt-4 mb-1 uppercase'>{companyName}</h2>
        <p className='text-center text-sm font-normal'>{address1+' '+address2}</p>
        <p className='text-center text-sm font-normal'>{phone}</p>

        <h4 className='text-center text-xs font-semibold mt-3 mb-2 uppercase'>Purchase Receipt</h4>
        <table>
            <tbody>
                <tr className='border-b border-b-gray-300'><td>Date:17 July, 2023</td><td className='text-right'>Time:3:30 PM</td></tr>
                <tr><td className='pt-1'>Sales ATD:</td><td className='text-right pt-1'>{recUser[0].displayName}</td></tr>
                <tr><td>Ref No:</td><td className='text-right'>{id.substring(2,15)}</td></tr>
                {/* <tr><td>Batch No:</td><td className='text-right'>00273</td></tr>
                <tr><td>Merchant ID:</td><td className='text-right'>13436925488</td></tr> */}
                {
                  item_details.map(item => {
                    const { item_id, quantity, price, purchase_type, purchase_total } = item;
                    const product = products.find(el => el.id === item_id);
                    return (<tr key={item_id} className='border-b border-b-gray-300'><td>{product.name}</td><td className='text-right'>{quantity+' x '+price}</td></tr>);
                  })
                }
                <tr className='border-b border-b-gray-300'><td>Discount:</td><td className='text-right'>{discount}</td></tr>
                <tr className='text-sm font-semibold'><td className='pb-1'>Amount:</td><td className='text-right pb-1'>Gh₵ {total.toLocaleString()}</td></tr>
            </tbody>
        </table>
        
        <h4 className='text-center text-xs font-semibold my-1 pb-1 uppercase border-b border-b-gray-300'>Payment Details</h4>
        <table>
            <tbody>
                <tr><td>Paid With:</td><td className='text-right'>{pay_mode}</td></tr>
                <tr><td>Contact:</td><td className='text-right'>{buyer_contact}</td></tr>
                <tr><td>Status:</td><td className='text-right pb-1 text-sm font-semibold'>
                  {
                      del_status !== 'no' 
                      ? <p>Delivered</p> : <p>Not Delivered</p>
                  }
                </td>
                <td></td>
                </tr>
            </tbody>
        </table>
      </div>
      
    </>
  )
}

export default ReceiptWithQrCode