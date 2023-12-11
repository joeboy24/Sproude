import React, { useContext, useState } from 'react'
import './homepage.styles.css'
import '../other-styles.styles.css'
import homeBg from '../../assets/spoude_home.jpg'
import vector2 from '../../assets/spoude-vector-02.png'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { BsCart4 } from 'react-icons/bs'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { UserContext } from '../../context/user.context'
import { Button } from '@material-tailwind/react'

const Homepage = () => {
  const { company } = useContext(UserContext);
  const [ newComp, setNewComp ] = useState(company);
  // const { companyDisplayName, companyName, slogan, address1, address2, phone, email, country, logo } = formFields;
  // console.log(company)

  // useState(() => {
  //   // if (company !== null) {
  //   //   // console.log(company)
  //   //   setNewComp(company)
  //   // }
  //   setTimeout(() => {
  //     console.log(company)
  //     setNewComp(company)
  //   }, 3000);
  // }, []);

  return (
    <div className='home-container'>
      {/* {company ?
      <p>{company.companyName}</p>
      :null} */}
      <div className='spoude'>
        {company ? 
          <>
            <img className='w-16 mx-[calc((100%-64px)/2)]' src={company.logo} alt="" />
            <h2>{company.companyDisplayName}</h2> 
              <h4>{company.slogan}</h4>
          </>
        :
          <>
            <img className='w-16 mx-[calc((100%-64px)/2)]' src="https://firebasestorage.googleapis.com/v0/b/spoude-pos.appspot.com/o/files%2Fec1084bc-1792-4b0a-85ad-feb6a35f7f60?alt=media&token=72532b5b-b67e-4e07-968a-b2a7a41eef61" alt="" />
            <h2>PivoApps</h2> 
            <h4>Shaping Ideas</h4>
          </>
        }
        <Button className='m-2'>Upgrade to Pro</Button>
      </div>
      <div className='pivoapps'>
        <img src="https://firebasestorage.googleapis.com/v0/b/spoude-pos.appspot.com/o/files%2Fec1084bc-1792-4b0a-85ad-feb6a35f7f60?alt=media&token=72532b5b-b67e-4e07-968a-b2a7a41eef61" alt="" />
        <h4>PivoApps Salestrack</h4>
      </div>
    </div>
  )
}

export default Homepage