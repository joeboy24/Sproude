import { Drawer, Button, IconButton, Typography, ButtonGroup } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiEditAlt, BiExpand, BiSolidCircle } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { FaPrint, FaReply } from 'react-icons/fa6';
import { PiWarningOctagon } from 'react-icons/pi';
import { FaCheck, FaMinus, FaPlus, FaTimes, FaTrashRestore } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
// import ExpandDrawer from './expand-drawer-content.components';
import { BsCheck2Circle, BsCheck2Square, BsCheckCircle, BsCheckCircleFill, BsCheckSquare } from 'react-icons/bs';
import { ProductsContext } from '../../context/product.context';



const PurchaseRow = ({ purchase, getId, classes, sendClass, openDialog }) => {
    const { id, supplier_name, supplier_contact, qty, cost, del_status, purchase_date, purchased_items, created_at, del } = purchase;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);
    const { delProduct, getProduct } = useContext(ProductsContext);

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete this record?")) { 
            // delProduct(id, 'yes');
        }
    }

    const restoreFunc = () => {

        if (window.confirm("Are you sure you want to restore this record?")) { 
            // delProduct(id, 'no');
        }
    }

    const sendOpenDialog = () => {
        getId(id);
        openDialog();
    }


    
    return (
        <>
        <tr key={id} className={sendClass}>
            <td className={classes}>
                <p className='item-name'>{supplier_name}</p>
                <p className='item-description'>{supplier_contact}</p>
            </td>
            <td className={classes}>
                <p className='item-name'>Cost: {cost}</p>
                <p className='item-description'>Qty: {qty}</p>
                { purchased_items.map(item => 
                    <p className='added-items'><BiSolidCircle size='8' className='float-left' />&nbsp; {item.name} &nbsp;</p>
                )}
            </td>
            <td className={classes}>
                {
                    del_status !== 'no' 
                    ? <p className='item-name pb-2'><BsCheck2Circle size='18' className='float-left mt-0.5' />&nbsp;<span>Delivered</span></p> 
                    : <p className='item-description not-delivered-btn'><PiWarningOctagon size='18' className='float-left' />&nbsp;<span>Pending</span></p>
                }
            </td>
            <td className={classes}>
                <p className='item-name text-right'>{cost}</p>
            </td>
            <td className={classes}>
                <p className='item-name text-right'>{purchase_date}</p>
                {/* <p className='item-description text-right'>RTL: {rtl_price}</p>
                <p className='item-description text-right'>WHL.: {whl_price}</p> */}
            </td>
            <td className={classes}>
                { del === 'no' 
                ? <><button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button>
                    <button className='action-btn' onClick={sendOpenDialog}><GrEdit size='12'/></button>
                  </>
                : <button className='del-btn' onClick={restoreFunc}><FaReply size='12'/></button>
                }
            </td>
        </tr>

        </>
    );
}

export default PurchaseRow;