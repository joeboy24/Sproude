import { Input } from '@material-tailwind/react';
import React from 'react'
import './xform.styles.css'
import { HiGlobeAlt } from 'react-icons/hi2';
import { PiBuildingsBold } from 'react-icons/pi';
import { MdShortText } from 'react-icons/md';
import { TbCurrentLocation, TbGlobe } from 'react-icons/tb';
import { TiPhoneOutline } from 'react-icons/ti';

const XformInput = ({ size, label, className, elementClass, inIcon, labelProp, ...otherProps}) => {
  return (
    <>
    <div className={className}>
        <Input icon={inIcon} className={elementClass} size={size} label={label} {...otherProps}
        labelProps={{
          className: labelProp,
        }}
        containerProps={{ className: "active:!rounded-full" }}
        />
    </div>
    </>
  )
}

export default XformInput;
