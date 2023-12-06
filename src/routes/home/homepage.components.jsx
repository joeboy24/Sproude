import React, { useContext, useState } from 'react'
import './homepage.styles.css'
import '../other-styles.styles.css'
import homeBg from '../../assets/sproude_home.jpg'
import vector2 from '../../assets/sproude-vector-02.png'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { BsCart4 } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { UserContext } from '../../context/user.context'

const Homepage = () => {
  const { company } = useContext(UserContext);
  const [ curCompany, setCurCompany ] = useState(company);
  // const { companyDisplayName, companyName, slogan, address1, address2, phone, email, country, logo } = formFields;
  console.log(company)

  useState(() => {
    if (company !== null) {
      // console.log(company)
      setCurCompany(company)
    }
  }, [company]);

  return (
    <>
      <div className='home-container'>
        {/* <img className='w-12' src={homeBg} alt="" /> */}
        <div className='sproude'>
        {curCompany ? 
          <>
            <h2>{curCompany.companyDisplayName}</h2> 
              <h4>{curCompany.slogan}</h4>
          </>
        :
          <>
            <h2>PivoApps</h2> 
            <h4>Shaping Ideas</h4>
          </>
        }
        </div>
        <div className='pivoapps'>
          <img src="https://firebasestorage.googleapis.com/v0/b/sproude-pos.appspot.com/o/files%2Fec1084bc-1792-4b0a-85ad-feb6a35f7f60?alt=media&token=72532b5b-b67e-4e07-968a-b2a7a41eef61" alt="" />
          <h4>PivoApps Salestrack</h4>
        </div>
      </div>
      {/* <div className='general-container-size flex'>

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

      </div> */}
    </> 
  )
}

export default Homepage