import React from 'react'
import './homepage.styles.css'
import '../other-styles.styles.css';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { BsCart4 } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'

const Homepage = () => {
  return (
    <>
      <div className='general-container-size flex'>

        {/* <div className='home-menu-card2'>
          <a href='/stock'>
            <Card>
              <CardBody>
                <HiOutlineClipboardDocumentList size={50} />
                <p className='home-header'>Stock</p>
                <p className='home-sub-header'>Total Records <span className='float-right'>1,224</span></p>
              </CardBody>
            </Card>
          </a>
        </div> */}

        <a href='/stock' className='home-menu-card'> 
          <div>
            <HiOutlineClipboardDocumentList size={50} />
            <p className='home-header'>Stock</p>
            <p className='home-sub-header'>Total Records <span className='float-right'>1,224</span></p>
          </div>
        </a>

        <a href='/sales' className='home-menu-card'> 
          <div>
            <BsCart4 size={50} />
            <p className='home-header'>Sales</p>
            <p className='home-sub-header'>Total Sales <span className='float-right'>14,527</span></p>
          </div>
        </a>

        <a href='/expenses' className='home-menu-card'> 
          <div>
            <LiaFileInvoiceDollarSolid size={50} />
            <p className='home-header'>Expenditure</p>
            <p className='home-sub-header'>Total Expenses <span className='float-right'>1,000</span></p>
          </div>
        </a>

      </div>
    </> 
  )
}

export default Homepage