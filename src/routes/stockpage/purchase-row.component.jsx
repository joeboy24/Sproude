import { Drawer, Button, IconButton, Typography, ButtonGroup, Tooltip } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiEditAlt, BiExpand, BiSolidCircle } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { FaPrint, FaReply } from 'react-icons/fa6';
import { PiWarningOctagon } from 'react-icons/pi';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import { FaCheck, FaMinus, FaPlus, FaShareAlt, FaTimes, FaTrashRestore } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
// import ExpandDrawer from './expand-drawer-content.components';
import { BsCheck2Circle, BsCheck2Square, BsCheckCircle, BsCheckCircleFill, BsCheckSquare } from 'react-icons/bs';
import { ProductsContext } from '../../context/product.context';



const PurchaseRow = ({ supplier, purchase, getId, getPurDel, classes, sendClass, openDialog, getDrawerId }) => {
    const { id, supplier_name, supplier_contact, qty, cost, del_status, purchase_date, purchased_items, created_at, del } = purchase;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);
    const { delProduct, getProduct } = useContext(ProductsContext);

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    // console.log('-- Supp --')
    // console.log(supplier.id)

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete this record?")) { 
            purchase['del'] = 'yes'
            getPurDel(purchase, 'delete');
        }
    }

    const restoreFunc = () => {

        if (window.confirm("Are you sure you want to restore this record?")) { 
            purchase['del'] = 'no'
            getPurDel(purchase, 'delete');
        }
    }

    const pendingUpdate = () => {
        if (window.confirm("Click ok to confirm status change")) { 
            purchase['del_status'] = 'yes'
            getPurDel(purchase, 'update');
        }
    }

    const sendOpenDialog = () => {
        getId(id);
        openDialog();
    }

    const handleDrawer = () => {
        getDrawerId(id);
    }


    
    return (
        <>
        <tr key={id} className={sendClass}>
            <td className={classes}>
                <p className='item-name'>{ supplier ? supplier.supplier_name :null}</p>
                <p className='item-description'>{supplier_contact}</p>
            </td>
            <td className={classes}>
                <Tooltip content='View Items' className='tooltip-style'>
                    <p className='item-description no-of-items-btn blue-head' onClick={handleDrawer}>{purchased_items.length} Items</p>
                </Tooltip>
                { del === 'no' ?
                    del_status !== 'no' 
                    ? <p className='item-description pb-2'><BsCheck2Circle size='14' className='float-left mt-0.5' />&nbsp;<span>Delivered</span></p> 
                    : <p className='item-description warning-btn hover:opacity-80' onClick={pendingUpdate}><PiWarningOctagon size='18' className='float-left' />&nbsp;<span>Pending</span></p>
                : del_status !== 'no' 
                    ? <p className='item-description pb-2'><BsCheck2Circle size='14' className='float-left mt-0.5' />&nbsp;<span>Delivered</span></p> 
                    : <p className='item-description warning-btn opacity-70'><PiWarningOctagon size='18' className='float-left' />&nbsp;<span>Pending</span></p>
                }
            </td>
            <td className={classes}>
                <p className='item-name text-right'>₵ {cost}</p>
                <p className='item-description text-right'>Qty: {qty}</p>
            </td>
            <td className={classes}>
                <p className='item-name text-right'>{purchase_date}</p>
                {/* <p className='item-description text-right'>RTL: {rtl_price}</p>
                <p className='item-description text-right'>WHL.: {whl_price}</p> */}
            </td>
            <td className={classes}>
                { del === 'no' 
                ? <><button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button>
                    {/* <Tooltip content='Distribute' className='tooltip-style'><button className='action-btn' onClick={sendOpenDialog}><FaShareAlt size='12'/></button></Tooltip>
                    <Tooltip content='Expand' className='tooltip-style'><button className='action-btn' onClick={handleDrawer}><BiExpand size='12'/></button></Tooltip> */}
                  </>
                : <button className='del-btn' onClick={restoreFunc}><FaReply size='12'/></button>
                }
            </td>
        </tr>

        </>
    );
}

export default PurchaseRow;