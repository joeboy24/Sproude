import { ButtonGroup, IconButton, Typography } from '@material-tailwind/react';
import React, { useContext } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { CartContext } from '../../context/cart.context';

const XcartItemRow = ({ c, product, classes }) => {
    const { name, description, quantity, price } = product;
    const { cartItems, addItemsToCart, decreaseItemQty, removeCartItem } = useContext(CartContext);

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
                <IconButton size='sm' className='del-btn' onClick={removeFunc}><FaTimes size='16'/></IconButton>
            </td>
        </tr>

        {/* <tr className="even:bg-blue-gray-50/30">
            <div>
                <table className='sales-tbl-expand'>
                    <tbody>
                        <tr>
                            <td>
                                <p>Item Name</p>
                                <span>Item Description</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </tr> */}
        </>
    );
}

export default XcartItemRow;