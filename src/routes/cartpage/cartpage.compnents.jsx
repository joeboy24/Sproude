import { Drawer, Button, IconButton, Typography, Card, CardBody } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react'
import XformInput from '../../components/form/forminput.component';
import './cartpage.styles.css'
import { BsBagCheck, BsBasket, BsBasket2Fill, BsBasketFill, BsCart4, BsPlus, BsPlusCircle } from 'react-icons/bs';
import { TABLE_ROWS } from '../../TestData.jsx'
import AdminNavbar from '../../components/mynavbar/admin-navbar.components';
import MenuStrip from '../../components/menu-strip/menu-strip.components';
import { ProductsContext } from '../../context/product.context';
import { CartContext } from '../../context/cart.context';
import XcartItemRow from './cart-item-row.components';
import XcartSalesRow from './cart-sales-row.component';
 


const XcartPage = () => {
    var c = 1;
    const { cartItems, cartCount, cartTotal, addItemsToCart, saveToLocal, retrieveFromLocal } = useContext(CartContext);

    console.log('System has started');
    // console.log(localStorage.getItem("aaxy"));
    // const storedVal = JSON.parse(localStorage.getItem("localCartItems"));
    // console.log(storedVal);

    const dumProd = {
        id: "",
        product_id: "",
        image: "",
        name: "Search Item",
        description: "",
        category: "",
        brand: "",
        qty: "",
        price: "",
        publish: "",
        del: "",
    };
    
    // id: Math.random() * 1000
    const defaultExpand = 'John Doe';
    const { products } = useContext(ProductsContext);
    const [ searchResult, setSearchResult ] = useState([]);
    const [ expandProduct, setExpandProduct ] = useState(dumProd);
    const [ NewCartItem, setNewCartItem ] = useState([]);
    const [ isDropOpen, setIsDropOpen ] = useState('');

    const [ newSearchKey, setNewSearchKey ] = useState('');
    // const [ newSearchArray, setNewSearchArray ] = useState([]);

    const handleSearch = (event) => {
        setIsDropOpen('yes');
        const { name, value } = event.target;
        setNewSearchKey(value.toLowerCase());
        const newArray = products.filter(product => product.name.toLowerCase().includes(newSearchKey));
        setSearchResult(newArray);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const ProductToAdd = products.find(item => item.id === expandProduct.id);
        
        addItemsToCart(ProductToAdd, NewCartItem.qty);
        setExpandProduct(dumProd);
        setNewSearchKey('');
    }


    const handleQtyChange = (event) => {
        const { value } = event.target;
        setNewCartItem({ id: expandProduct.id, qty: value });
    }

    // const checkMeOut = () => addItemsToCart(products[0]);
    const checkMeOut = () => {
        // saveToLocal();
        const storedVal = JSON.parse(localStorage.getItem("localCart"));
        console.log(storedVal);   
        // localStorage.setItem('localCartItems', 'local storage checks');
        // console.log(localStorage.getItem("localCartItems"));

        // localStorage.setItem('localCartItems2', JSON.stringify(products));
        // const storedCartValues = JSON.parse(localStorage.getItem("localCartItems2"));
        // console.log(storedCartValues);
    };


    useEffect(() => {
        retrieveFromLocal();
    }, [])


    // Handle Payment and Order insert
    // const defaultPayInputs = {
    //     pay_mode: '',
    //     buyer_name: '',
    //     buyer_contact: '',
    //     discount: '',
    //     amt_paid: '',
    //     del_status: '',
    // };
    const [ payDetails, setPayDetails ] = useState([]);
    const { pay_mode, buyer_name, buyer_contact, discount, amt_paid, del_status } = payDetails;

    const handlePay = (event) => {
        event.preventDefault();
        const payInputs = {
            pay_mode: event.target.pay_mode.value,
            buyer_name: event.target.buyer_name.value,
            buyer_contact: event.target.buyer_contact.value,
            discount: event.target.discount.value,
            amt_paid: event.target.amt_paid.value,
            del_status: event.target.del_status.value,
        };
        if (payInputs.pay_mode == 0) {
            return alert('Oops..! Select `Payment Mode` to proceed');
        } else if (payInputs.del_status == 0) {
            return alert('Oops..! Select `Delivery Status` to proceed');
        }

        console.log(payInputs);
        // setPayDetails(payInputs);
        // console.log(payDetails);
    }


  return (
    <>
    <AdminNavbar />
    <MenuStrip />
    <div className='cartpage-container'>
        <Card className='cartpage-content'>
            <CardBody>
                <div className='cart-top'>
                    <form onSubmit={handleSubmit}>
                    <div className='flex w-full'>
                        <input type="hidden" name='id' value={expandProduct.id} />
                        <XformInput id='searchInput' onChange={handleSearch} value={newSearchKey} className='xform-input w-4/6' size='md' label={ expandProduct.name } required/>
                        <XformInput id='reference' value={ expandProduct.product_id } className='xform-input w-2/6' size='md' label='Reference' required/>
                    </div>
                    <div className='search-list'>
                        { isDropOpen === '' ? null :
                        <Card className='search-list-card'>
                            {
                                searchResult.map(el => (
                                    <p onClick={() => {
                                        // alert(el.name);
                                        setExpandProduct(el);
                                        setNewSearchKey(el.name);
                                        setIsDropOpen('');
                                        // console.log(expandProduct);
                                    }} key={el.id}>
                                        <img className='search-item-img' src={el.image} alt={el.name} />
                                        <span>{el.name}</span>
                                    </p>
                                ))
                            }
                        </Card>
                        }
                    </div>
                    {/* GH₵ */}
                    <div className='flex w-full'>
                        <XformInput className='xform-input w-2/6' size='md' label='Price' value={ expandProduct.price }/>
                        <XformInput name='qty' className='xform-input w-2/6' type='number' onChange={handleQtyChange} min='1' max={ expandProduct.qty } size='md' label='Qty.' required/>
                        <Button className='w-2/6 m-1 myBtn' type='submit'><BsPlusCircle size='18' className='float-left'/><span>Add to Cart</span></Button>
                    </div>
                    {/* <p>{ NewCartItem.qty } - { NewCartItem.id }</p>
                    <p>{cartTotal}</p> */}
                    </form>
                    <button onClick={checkMeOut}>Try</button>
                    
                    { expandProduct.product_id === '' ? null :
                    <table className='inv-tbl'>
                        <tbody>
                            <tr><td className='inv-tbl-left'>Qty. Available</td><td>{ expandProduct.qty }</td></tr>
                            <tr><td className='inv-tbl-left'>Item Brand</td><td>{ expandProduct.brand }</td></tr>
                            <tr><td className='inv-tbl-left'>Description</td><td>{ expandProduct.description }</td></tr>
                        </tbody>
                    </table>
                    }
                </div>

                <div className='cart-header'>
                    <div className='basket-container'>
                        <BsCart4 className='basket'/>
                    </div>
                    <div className='cart-text'>Cart { cartItems.length > 0 ? null : <span>Empty</span> }</div>
                </div>

                { cartItems.length > 0 ?
                    <table className="cart-tbl w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Details</th>
                                <th>Quantity</th>
                                <th className='text-center'>Price (Gh₵)</th>
                                <th className='text-right'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {cartItems.map((product, index) => {
                            const isLast = index === cartItems.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return(
                                <XcartItemRow c={c++} key={product.id} product={product} classes={classes} />
                            );
                        })}
                        <tr>
                            <td></td>
                            <td className='px-4 text-right'>
                                <p className='item-name'>Total :</p>
                                <p className='item-description'>Amount Payable</p>
                            </td>
                            <td className='pl-14 py-3'><p className='item-name'>{cartCount}</p></td>
                            <td className='px-4 text-center'><p className='item-name'>{cartTotal}</p></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    : null
                    // <p>No items in cart</p>
                }

                <form onSubmit={handlePay}>
                    <div className='pay-mode'>
                        {/* <div className='flex'> */}
                            <select name='pay_mode' className='xform-input myInput-dark'>
                                <option value="0">-- Payment Mode --</option>
                                <option value="cash">Cash</option>
                                <option value="cheque">Cheque</option>
                                <option value="momo">Mobile Money</option>
                                <option value="post_pay">Post Payment(Debt)</option>
                            </select>
                            {/* <XformInput name='buyer_name' className='xform-input w-[calc(100%/3-8px)] my-2' elementClass='myInput-dark2' size='lg' label="Buyer's Name" required/>
                            <XformInput type='number' name='buyer_contact' min='0' className='xform-input w-[calc(100%/3-8px)] my-5' elementClass='myInput-dark2' size='lg' label="Buyer's Contact" required/>
                        </div> */}
                        <input className='xform-input myInput-dark' name='buyer_name' placeholder="Buyer's Name" required/>
                        <input type='number' min='0' className='xform-input myInput-dark' name='buyer_contact' placeholder="Contact" required/>
                        <input type='number' min='0' className='xform-input myInput-dark' name='discount' placeholder="Discount eg. 10" value='0' required/>
                        <input type='number' min='0' className='xform-input myInput-dark' name='amt_paid' placeholder="Amount Paid" required/>
                        {/* <div className='flex'>
                            <XformInput type='number' name='discount' min='0' className='xform-input w-[calc(100%/3-8px)] my-2' elementClass='myInput-dark2' size='lg' label='Discount' value='0' required/>
                            <XformInput type='number' name='amt_paid' min='0' className='xform-input w-[calc(100%/3-8px)] my-2' elementClass='myInput-dark2' size='lg' label='Amount Paid' required/> */}
                            <select name='del_status' className='xform-input myInput-dark'>
                                <option value="0">-- Delivery Status --</option>
                                <option value="yes">Delivered</option>
                                <option value="no">Not Delivered</option>
                            </select>
                        {/* </div> */}
                        
                        
                    </div>
                    { cartItems.length > 0 ?
                        <Button type='submit' className='float-right' size='sm' variant="outlined">&nbsp;<BsBagCheck size='18' className='float-left mr-2'/> Pay Now &nbsp;</Button>
                    : null }
                </form>

            </CardBody>
        </Card>

        <Card className='cartpage-content'>
            <CardBody>
                { cartItems.length > 0 ?
                    <table className="cart-tbl w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Details</th>
                                <th>Quantity</th>
                                <th className='text-center'>Price (Gh₵)</th>
                                <th className='text-right'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {cartItems.map((product, index) => {
                            const isLast = index === cartItems.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return(
                                <XcartSalesRow c={c++} key={product.id} product={product} classes={classes} />
                            );
                        })}
                        <tr>
                            <td></td>
                            <td className='px-4 text-right'>
                                <p className='item-name'>Total :</p>
                                <p className='item-description'>Amount Payable</p>
                            </td>
                            <td className='pl-14 py-3'><p className='item-name'>{cartCount}</p></td>
                            <td className='px-4 text-center'><p className='item-name'>{cartTotal}</p></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    : null
                    // <p>No items in cart</p>
                }
            </CardBody>
        </Card>
    </div>
    </>
  )
}




export const AlertMsg = () => { 

    const [openBottom, setOpenBottom] = useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    useEffect(() => {
        openDrawerBottom();
    }, []);
    // alert('Works Perfect');

    <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4"
    >
        <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
            Material Tailwind
        </Typography>
        <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
            </svg>
        </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
        Material Tailwind features multiple React and HTML components, all
        written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
        <Button size="sm" variant="outlined">
            Documentation
        </Button>
        <Button size="sm">Get Started</Button>
        </div>
    </Drawer>

};

export default XcartPage