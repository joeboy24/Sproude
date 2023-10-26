import { Drawer, Button, IconButton, Typography, ButtonGroup } from '@material-tailwind/react';
import React, { useContext, useState } from 'react'
import { BiExpand } from 'react-icons/bi';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';
import ExpandDrawer from './expand-drawer-content.components';

const XcartSalesRow = ({ c, product, classes }) => {
    const { name, description, quantity, price } = product;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const removeFunc = () => {
        if (window.confirm("Are you sure you want to delete item from cart?")) { 
            removeCartItem(product);
        }
    }
    
    return (
        <>
        <tr className="even:bg-blue-gray-50/30">
            <td className='item-description pl-4 pr-2'>{c}</td>
            <td className={classes}>
                {/* <Typography variant="small" color="blue-gray" className="font-light">
                    {name}
                </Typography> */}
                <p className='item-name'>{name}</p>
                <p className='item-description'>{description}</p>
            </td>
            <td className={classes}>
                <ButtonGroup size='sm' variant="outlined">
                    <IconButton className='increment-btn' onClick={() => decreaseItemQty(product)}><FaMinus size='12'/></IconButton>
                    <IconButton className='increment-btn'>{quantity}</IconButton>
                    <IconButton className='increment-btn' onClick={() => addItemsToCart(product, 0)}><FaPlus /></IconButton>
                </ButtonGroup>
            </td>
            <td className={classes}>
                {/* <Typography variant="small" color="blue-gray" className="font-light">
                    {price}
                </Typography> */}
                <p className='item-name text-center'>{price}</p>
            </td>
            <td className={classes}>
                <button className='action-btn' onClick={openDrawerBottom}><BiExpand size='12'/></button>
                <button className='del-btn' onClick={removeFunc}><FaTimes size='12'/></button>
            </td>
        </tr>

        <Drawer placement="bottom" open={openBottom} onClose={closeDrawerBottom} className="p-4 overflow-auto">
            <IconButton variant="text" color="blue-gray" onClick={closeDrawerBottom}>
                <FaTimes />
            </IconButton>
            <ExpandDrawer order={product} />
        </Drawer>
        </>
    );
}

export default XcartSalesRow;