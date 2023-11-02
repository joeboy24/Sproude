import { Drawer, Button, IconButton, Typography, ButtonGroup } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiEditAlt, BiExpand } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { FaPrint } from 'react-icons/fa6';
import { FaCheck, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
import ExpandDrawer from './expand-drawer-content.components';
import { BsCheck2Square, BsCheckCircle, BsCheckCircleFill, BsCheckSquare } from 'react-icons/bs';

const XcartSalesRow = ({ i, order, classes }) => {
    const { id, user, item_details, total, paid_debt, debt_bal, pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status, purchase_type, created_at, updated_at } = order;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete item from orders?")) { 
            removeCartItem(order);
        }
    }
    
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
                <p className='item-description'>12/12/12</p>
                {/* <p className='item-name'>{created_at}</p>
                <p className='item-description'>{updated_at}</p> */}
            </td>
            <td className={classes}>
                <button className='action-btn' onClick={openDrawerBottom}><BiExpand size='12'/></button>
                <button className='action-btn'><FaPrint size='12'/></button>
                <button className='action-btn'><GrEdit size='12'/></button>
                {/* <button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button> */}
            </td>
        </tr>

        <Drawer placement="bottom" open={openBottom} onClose={closeDrawerBottom} className="p-4 overflow-auto">
            <ExpandDrawer order={order} total={total} amt_paid={amt_paid} orderedItems={item_details} />
        </Drawer>
        </>
    );
}

export default XcartSalesRow;