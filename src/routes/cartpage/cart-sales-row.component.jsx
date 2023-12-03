import { Drawer, Button, IconButton, Typography, ButtonGroup, Tooltip } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiEditAlt, BiExpand } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { FaPrint, FaRegFolderOpen } from 'react-icons/fa6';
import { FaCheck, FaMinus, FaPlus, FaReply, FaTimes } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
import ExpandDrawer from './expand-drawer-content.components';
import { BsCheck2Square, BsCheckCircle, BsCheckCircleFill, BsCheckSquare } from 'react-icons/bs';
import './cartpage.styles.css';
import { infoToast } from '../../utils/firebase/firebase.utils';

const XcartSalesRow = ({ i, order, classes, getDialogId, getDrawerId, hideAction }) => {
    const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, purchase_type, created_at, updated_at } = order;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);

    // console.log(new Date(1701172485 * 1000).getDay());

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete item from orders?")) { 
            removeCartItem(order);
        }
    }

    const sendId = () => {
        getDialogId(id);
    }

    const sendDrawerId = () => {
        getDrawerId(id);
    }

    const getDate = (secs) => {
        // var secs = dt.seconds;
        var newDate = new Date(secs * 1000);
        console.log(newDate);
        return newDate;
    }

    // getDate('1701172485');

    
    return (
        <>
        <tr key={id} className="even:bg-blue-gray-50/30">
            <td className='item-description pl-4 pr-2'>{i}</td>
            <td className={classes}>
                <p className='item-name'>{id.substring(2, 14)}</p>
                <p className='item-description'>User: {user}</p>
                {
                    del_status === 'yes' 
                    ? <p className='item-description delivered-btn'><FaCheck className='float-left mt-0.5' />&nbsp;<span>Delivered</span></p> 
                    : <p className='item-description not-delivered-btn'><FaTimes className='float-left mt-0.5' />&nbsp;<span>Not Delivered</span></p>
                }
            </td>
            <td className={classes}>
                <p className='item-name'>{pay_mode}</p>
                <p className='item-description'>Paid: {amt_paid}</p>
                <p className='item-description'>Discount: {discount}</p>
                <p className='item-description'>Change: {total - amt_paid < 0 ? total - amt_paid : null}</p>
            </td>
            <td className={classes}>
                <p className='item-name'>{buyer_name}</p>
                <p className='item-description'>{buyer_contact}</p>
                <p className='item-description'>{purchase_type}</p>
            </td>
            <td className={classes}>
                <p className='item-name text-center'>{total}</p>
                <p className='item-description text-center'>Bal.: {debt_bal}</p>
            </td>
            <td className={classes}>
                <p className='item-name'>Monday</p>
                <p className='item-description'>{created_at.seconds}</p>
                {/* <p className='item-name'>{created_at}</p>
                <p className='item-description'>{updated_at}</p> */}
            </td>
            <td className={classes}>
                <Tooltip content='Expand' className='tooltip-style'><button className='action-btn' onClick={sendDrawerId}><BiExpand size='12'/></button></Tooltip>
                <Tooltip content='Return' className='tooltip-style'><button className='action-btn'><FaReply size='12'/></button></Tooltip>
                 
                {/* {
                    del_status === 'yes' 
                    ? <Tooltip content='Print' className='tooltip-style'><button className='action-btn' onClick={sendId}><FaPrint size='12'/></button></Tooltip>
                    : <Tooltip content='Open' className='tooltip-style'><button className='action-btn' onClick={sendId}><FaRegFolderOpen size='12'/></button></Tooltip>
                } */}

                { hideAction === 'no' && del_status === 'yes' ? <Tooltip content='Print' className='tooltip-style'><button className='action-btn' onClick={sendId}><FaPrint size='12'/></button></Tooltip> : null }
                { hideAction === 'no' && del_status !== 'yes' ? <Tooltip content='Open' className='tooltip-style'><button className='action-btn' onClick={sendId}><FaRegFolderOpen size='12'/></button></Tooltip> : null }
                { hideAction === 'yes' && del_status === 'yes' ? null : null }
                { hideAction === 'yes' && del_status !== 'yes' ? null : null }
                {/* <button className='action-btn'><GrEdit size='12'/></button> */}
                {/* <button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button> */}
            </td>
        </tr>
        </>
    );
}

export default XcartSalesRow;