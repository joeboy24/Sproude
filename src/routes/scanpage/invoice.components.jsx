
import React from 'react'
import './scanpage.styles.css'


const GenInvoice = () => {
  return (
    <div className='invoice-container'>

        <div className='invoice-top w-full flex'>
            <div className='company-details-left w-2/3'>
                <img src="https://png.pngtree.com/template/20190119/ourmid/pngtree-water-logo-image_52770.jpg" alt="Sproud Logo" />
                <h2>Sproude H2O</h2>
                <p>Invoice</p>
            </div>

            {/* <div className='company-details-right'>
                <table className='w-full'>
                    <tbody>
                        <tr><td>Address</td><td>92 Cansas Street</td></tr>
                        <tr><td>& Contact</td><td>Melbourne, Victoria</td></tr>
                        <tr><td></td><td>001345894777</td></tr>
                        <tr><td></td><td>Australia</td></tr>
                    </tbody>
                </table>
            </div> */}
        </div>

        <table className='w-full invoice-center-top'>
            <tbody>
                <tr className='blue-head'>
                    <td>Billed to</td>
                    <td>Date of Issue</td>
                    <td>Invoice Number</td>
                    <td className='text-right'>Amount Due (GHS)</td>
                </tr>
                <tr className='relative'>
                    <td>John Doe</td>
                    <td>31/10/2023</td>
                    <td>A72339DGHS823</td>
                    <td className='amount-focus text-right'>₵5,500.00</td>
                </tr>
                <tr>
                    <td>Nestle Ghana Ltd.</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>0247873637</td>
                    <td className='blue-head'>Due Date</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Behind marina Mall</td>
                    <td>31/10/2023</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <table className='w-full mt-16 invoice-center'>
            <tbody>
                <tr className='blue-head-with-top-padd'>
                    <td className='text-left'>Item Details</td>
                    <td>Price</td>
                    <td className='w-1/6 text-center'>Qty.</td>
                    <td>Line Total</td>
                </tr>
                <tr>
                    <td className='text-left'>Sproude Bottle Water <p className='item-description'>Single Item</p></td>
                    <td>3</td>
                    <td className='text-center'>24</td>
                    <td>₵72.00</td>
                </tr>
                <tr>
                    <td className='text-left'>Sproude Sachet Water <p className='item-description'>Single Bag</p></td>
                    <td>6</td>
                    <td className='text-center'>15</td>
                    <td>₵90.00</td>
                </tr>
            </tbody>
        </table>

        <table className='w-1/2 invoice-center float-right'>
            <tbody className='w-full'>
                <tr className='pt-4'>
                    <td>Total<p>Tax</p></td>
                    <td>5,500.00<p>0.00</p></td>
                </tr>
                <tr>
                    <td>Amount Paid<p className='item-description'>Change</p></td>
                    <td>5,750.00<p className='item-description'>250.00</p></td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default GenInvoice