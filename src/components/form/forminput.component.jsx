import { Input } from '@material-tailwind/react';
import React from 'react'
import './xform.styles.css'

const XformInput = ({ size, label, className, elementClass, ...otherProps}) => {
  return (
    <>
    <div className={className}>
        <Input className={elementClass} size={size} label={label} {...otherProps}/>
    </div>
    </>
  )
}

export default XformInput;
