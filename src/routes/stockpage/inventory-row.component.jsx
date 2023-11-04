import { Drawer, Button, IconButton, Typography, ButtonGroup } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiEditAlt, BiExpand } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { FaPrint, FaReply } from 'react-icons/fa6';
import { PiWarningOctagon } from 'react-icons/pi';
import { FaCheck, FaMinus, FaPlus, FaTimes, FaTrashRestore } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
// import ExpandDrawer from './expand-drawer-content.components';
import { BsCheck2Circle, BsCheck2Square, BsCheckCircle, BsCheckCircleFill, BsCheckSquare } from 'react-icons/bs';
import { ProductsContext } from '../../context/product.context';



const InventoryRow = ({ i, product, classes, sendClass, openDialog, testMe, getId }) => {
    const { id, product_id, image, name, description, category, brand, qty, rtl_qty, whl_qty, price, rtl_price, whl_price, publish, barcode, expiry, del } = product;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);
    const { delProduct, getProduct } = useContext(ProductsContext);

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete this record?")) { 
            delProduct(id, 'yes');
        }
    }

    const restoreFunc = () => {

        if (window.confirm("Are you sure you want to restore this record?")) { 
            delProduct(id, 'no');
        }
    }

    const sendOpenDialog = () => {
        getId(id);
        openDialog();
    }


    
    return (
        <>
        <tr className={sendClass}>
            <td className='item-description p-2.5 w-12 text-center'><p className='pb-2'>{i}</p><img className='search-item-img !w-full' src={image} />{product.key}</td>
            <td className={classes}>
                <p className='item-name'>{name} - {brand}</p>
                <p className='item-description'>Id: {product_id} Barcode: {barcode}</p>
                <p className='item-description'>Cat.: {category}</p>
                <p className='item-description'>Desc.: {description}</p>
            </td>
            <td className={classes}>
                {
                    del === 'no' 
                    ? <p className='item-name pb-2'><BsCheck2Circle size='18' className='float-left mt-0.5' />&nbsp;<span>Active</span></p> 
                    : <p className='item-description not-delivered-btn'><PiWarningOctagon size='18' className='float-left' />&nbsp;<span>Inactive</span></p>
                }
                <p className='item-description'>Publish: {publish}</p>
                <p className='item-description'>Expiry: {expiry}</p>
            </td>
            <td className={classes}>
                <p className='item-name'>{qty}</p>
                <p className='item-description'>RTL: {rtl_qty}</p>
                <p className='item-description'>WHL.: {whl_qty}</p>
            </td>
            <td className={classes}>
                <p className='item-name text-right'>{price}</p>
                <p className='item-description text-right'>RTL: {rtl_price}</p>
                <p className='item-description text-right'>WHL.: {whl_price}</p>
            </td>
            <td className={classes}>
                {/* <button className='action-btn' onClick={openDrawerBottom}><BiExpand size='12'/></button> */}
                {/* <button className='action-btn'><FaPrint size='12'/></button> */}
                { del === 'no' 
                ? <button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button>
                : <button className='del-btn' onClick={restoreFunc}><FaReply size='12'/></button>
                }
                <button className='action-btn' onClick={sendOpenDialog}><GrEdit size='12'/></button>
            </td>
        </tr>

        </>
    );
}

export default InventoryRow;