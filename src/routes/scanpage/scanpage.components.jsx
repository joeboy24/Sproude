
import React, { useState } from 'react'
import './scanpage.styles.css'
import { Button, Card, CardBody, Input } from '@material-tailwind/react'
import QRCode from 'react-qr-code';
import GenInvoice from './invoice.components';

const ScanPage = () => {
    const [scanInput, setScanInput] = useState('');
    const onChange = ({ target }) => setScanInput(target.value);

  return (
    <>
    <Card className='general-container-size'>
        <CardBody>
            <div className='scanner-top'>
                <div className="relative flex w-full">
                    <Input
                        type="text"
                        label="Scan QR Code"
                        value={scanInput}
                        onChange={onChange}
                        className="scan-input rounded-md"
                        containerProps={{
                        className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        color={scanInput ? "gray" : "blue-gray"}
                        disabled={!scanInput}
                        className="!absolute right-1 top-1 rounded" >
                        Read Code 
                    </Button>
                </div>
            </div>

            <div className='receipt-container pr-2 float-left'>
                <QRCode value={scanInput} size='120' style={{ width: '100%' }}/>

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
            </div>


            <div className='w-[calc(67%-20px)] float-right'>
                <GenInvoice />
            </div>

        </CardBody>
    </Card>
    </>
  )
}

export default ScanPage