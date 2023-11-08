
import React from 'react'
import QRCode from 'react-qr-code'


const ReceiptWithQrCode = ({ scanCode }) => {
  const QrSize = 120;
  
  return (
    <>
      
      <QRCode value={scanCode} size={QrSize} style={{ width: '100%' }}/>

      <h2 className='text-center text-sm font-semibold mt-4 mb-1 uppercase'>Sproude Mart-Portland</h2>
      <p className='text-center text-sm font-normal'>Doctors Bangalow</p>
      <p className='text-center text-sm font-normal'>0247873637</p>

      <h4 className='text-center text-xs font-semibold mt-3 mb-2 uppercase'>Purchase Receipt</h4>
      <table>
          <tbody>
              <tr className='border-b border-b-gray-300'><td>Date:31 Oct 2023</td><td className='text-right'>Time:9:30 PM</td></tr>
              <tr><td className='pt-1'>Sales ATD:</td><td className='text-right pt-1'>John Doe</td></tr>
              <tr><td>Merchant ID:</td><td className='text-right'>13436925488</td></tr>
              <tr><td>Ref No:</td><td className='text-right'>A72339DGHS823</td></tr>
              <tr><td>Batch No:</td><td className='text-right'>00273</td></tr>
              <tr className='text-sm font-semibold'><td className='pb-1'>Amount:</td><td className='text-right pb-1'>Gh₵ 55.00</td></tr>
          </tbody>
      </table>
      <h4 className='text-center text-xs font-semibold my-1 pb-1 uppercase border-b border-b-gray-300'>Payment Details</h4>
      <table>
          <tbody>
              <tr><td>Paid With:</td><td className='text-right'>Vodafone Cash</td></tr>
              <tr><td>Phone Number:</td><td className='text-right'>020****172</td></tr>
              <tr className='text-sm font-semibold'><td className='pb-1'>Approved</td><td></td></tr>
          </tbody>
      </table>
      
    </>
  )
}

export default ReceiptWithQrCode