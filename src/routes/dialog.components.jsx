
import React from 'react'
import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Textarea } from '@material-tailwind/react';
import { IoWarningOutline } from 'react-icons/io5';
import { BsCheckCircle } from 'react-icons/bs';
import './other-styles.styles.css';


const AlertDialog = ({ open, alertMsg, footerBtn, ...otherProps }) => {
  return (
    <>
      <Dialog open={open} {...otherProps}>
        {/* <DialogHeader> */}
        <div className='dialog-top flex'>
            { alertMsg.a == 'success' 
            ? <BsCheckCircle size='20'/> 
            : <IoWarningOutline size='20'/>
            }
            <p className='text-center'>&nbsp;&nbsp;{alertMsg.a}&nbsp;&nbsp;</p>
        </div>
        {/* </DialogHeader> */}

        <DialogBody>
            <p className='text-center p-3'>{alertMsg.b}</p>
        </DialogBody>

        <DialogFooter>{footerBtn}</DialogFooter>
      </Dialog>
    </>
  )
}

export default AlertDialog