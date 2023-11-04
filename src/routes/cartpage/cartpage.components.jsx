import { Drawer, Button, IconButton, Typography, Card, CardBody, MenuHandler, MenuList, MenuItem, Menu } from '@material-tailwind/react';
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
import { createSalesDoc, getProductsDocuments } from '../../utils/firebase/firebase.utils';
import { FaCalendarAlt, FaPlus, FaTimes } from 'react-icons/fa';
import CustomRadio from '../../components/form/custom-radio.components';
 
 

const XcartPage = () => {
    var c = 1;
    var i = 1;
    const { cartItems, cartCount, cartTotal, salesRecords, addItemsToCart, saveToLocal, retrieveFromLocal, addSalesRecord } = useContext(CartContext);

    console.log('System has started');
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
        rtl_price: "",
        whl_price: "",
        qty: "",
        price: "",
        rtl_price: "",
        whl_price: "",
        publish: "",
        del: "",
    };
    
    // id: Math.random() * 1000
    const defaultExpand = 'John Doe';
    const { products, getProduct } = useContext(ProductsContext);
    const [ searchResult, setSearchResult ] = useState([]);
    const [ expandProduct, setExpandProduct ] = useState(dumProd);
    const [ NewCartItem, setNewCartItem ] = useState([]);
    const [ isDropOpen, setIsDropOpen ] = useState('');
    const [ purchaseType, setPurchaseType ] = useState('RTL');

    const [ newSearchKey, setNewSearchKey ] = useState('');
    // const [ newSearchArray, setNewSearchArray ] = useState([]);

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setNewSearchKey(value.toLowerCase());
        const newArray = products.filter(product => product.name.toLowerCase().includes(newSearchKey));
        setSearchResult(newArray);
        setIsDropOpen('yes');
    }

    const handleItemSubmit = (event) => {
        event.preventDefault();
        const ProductToAdd = products.find(item => item.id === expandProduct.id);
        
        addItemsToCart(ProductToAdd, NewCartItem);
        setExpandProduct(dumProd);
        setNewSearchKey('');
    }


    const handleQtyChange = (event) => {
        const { value } = event.target;
        setNewCartItem({ id: expandProduct.id, qty: value, purchase_type: purchaseType });
    }

    // const checkMeOut = () => addItemsToCart(products[0]);
    const checkMeOut = () => {
        getProduct();
        // const storedVal = JSON.parse(localStorage.getItem("localCart"));
        // console.log(storedVal); 

        // const sendDoc = {"id":"Mbl3v433qhq","user":"Code80","item_details":[{"item_id":4,"price":"35","quantity":19,"purchase_total":1076},{"item_id":1,"price":"7","quantity":24,"purchase_total":1076},{"item_id":3,"price":"3","quantity":17,"purchase_total":1076},{"item_id":2,"price":"24","quantity":8,"purchase_total":1076}],"total":1066,"paid_debt":0,"pay_mode":"momo","buyer_name":"dafdf","buyer_contact":"41546387590","discount":"10","amt_paid":"6000","del_status":"no","created_at":"2023-10-27T00:40:16.555Z","updated_at":null}
        // createSalesDoc(sendDoc);
        // console.log(sendDoc);
    };


    useEffect(() => {
        retrieveFromLocal();
    }, [])

    // useEffect(() => {
    //     console.log('Purchase complete..!')
    // }, [salesRecords])


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
        var orderId = 'M'+Math.random().toString(36).slice(2);
        var dis = event.target.discount.value;
        var pay_mode = event.target.pay_mode.value;
        var amt_paid = event.target.amt_paid.value;
        var tot = cartTotal;
        var paid_debt = amt_paid;

        if (dis > 0) {
            tot = cartTotal - dis;
        }
        if (amt_paid < cartTotal) {
            pay_mode = 'post_pay';
        }

        const payInputs = {
            id: orderId.toUpperCase(),
            user: 'Code80',
            item_details: [],
            total: tot,
            debt_bal: cartTotal - amt_paid,
            paid_debt: paid_debt,
            pay_mode: pay_mode,
            buyer_name: event.target.buyer_name.value,
            buyer_contact: event.target.buyer_contact.value,
            discount: dis,
            amt_paid: amt_paid,
            del_status: event.target.del_status.value,
            created_at: new Date(),
            updated_at: null,
        };
        if (payInputs.pay_mode === 0) {
            return alert('Oops..! Select `Payment Mode` to proceed');
        } else if (payInputs.del_status === 0) {
            return alert('Oops..! Select `Delivery Status` to proceed');
        }

        addSalesRecord(payInputs);
        // setPayDetails(payInputs);
        // console.log(payInputs);
    }


  return (
    <>
    {/* <AdminNavbar />
    <MenuStrip />
    <div className='general-container-wrapper'> */}
        <Card className='general-container-size'>
            <CardBody>
                <div className='flex mb-3 w-full h-7'>
                    <div className="flex gap-3">
                        { purchaseType === 'RTL'
                        ? <><CustomRadio onClick={() => {setPurchaseType('RTL')}} radioText='Retail' defaultChecked/>
                            <CustomRadio onClick={() => {setPurchaseType('WHL')}} radioText='Wholesale' /></> 
                        : <><CustomRadio onClick={() => {setPurchaseType('RTL')}} radioText='Retail'/>
                            <CustomRadio onClick={() => {setPurchaseType('WHL')}} radioText='Wholesale' defaultChecked /></> 
                        }
                    </div>

                    <div className='absolute right-7'>
                        <Menu>
                            <MenuHandler>
                                <p className='change-date-link'><FaCalendarAlt size='16' className='float-left mr-2 mt-0.5' /> Change Date</p>
                            </MenuHandler>
                            <MenuList>
                                {/* <MenuItem> */}
                                    <XformInput type='date' size='sm' label='Change Date'/>
                                {/* </MenuItem> */}
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                
                <div className='cart-top'>
                    <form onSubmit={handleItemSubmit}>
                    <div className='flex w-full'>
                        <input type="hidden" name='id' onChange={()=>{}} value={expandProduct.id} />
                        <XformInput id='searchInput' onChange={handleSearch} value={newSearchKey} className='xform-input w-4/6' size='md' label={ expandProduct.name } required/>
                        <XformInput id='reference' onChange={()=>{}} value={ expandProduct.product_id } className='xform-input w-2/6' size='md' label='Reference' required/>
                    </div>
                    <div className='search-list'>
                        { isDropOpen === '' ? null :
                        <Card className='search-list-card relative'>
                            <IconButton className='icon-btn absolute right-1' onClick={() => setIsDropOpen('')}><FaTimes size='16'/></IconButton>
                            {
                                searchResult.length > 0 ?
                                searchResult.map(el => 
                                    <p onClick={() => {
                                        // alert(el.name);
                                        setExpandProduct(el);
                                        setNewSearchKey(el.name);
                                        setIsDropOpen('');
                                        // console.log(expandProduct);
                                    }} key={el.id}>
                                        <img className='search-item-img' src={el.image} alt={el.name} />
                                        <span>{el.name} - {el.description}</span>
                                    </p>
                                )
                                : <p>No records found</p>
                            }
                        </Card>
                        }
                    </div>
                    {/* GH₵ */}
                    <div className='flex w-full'>
                        <XformInput className='xform-input w-2/6' size='md' onChange={()=>{}} label='Price' value={ purchaseType === 'RTL' ? expandProduct.rtl_price : expandProduct.whl_price }/>
                        <XformInput name='qty' className='xform-input w-2/6' type='number' onChange={handleQtyChange} min='1' max={ purchaseType === 'RTL' ? expandProduct.rtl_qty : expandProduct.whl_qty } size='md' label='Qty.' required/>
                        <Button className='w-2/6 m-1 myBtn' type='submit'><BsPlusCircle size='18' className='float-left'/><span>Add to Cart</span></Button>
                    </div>
                    {/* <p>{ NewCartItem.qty } - { NewCartItem.id }</p>
                    <p>{cartTotal}</p> */}
                    </form>
                    {/* <button onClick={checkMeOut}>Try</button>
                    <p>Length: {products.length}</p>
                    <p> - {purchaseType} </p>
                    { products.length > 0 ?
                        <div>
                        {products.map(el => 
                            <p key={el.id}>{el.id} - {el.name}</p>
                        )}
                        </div>
                    : null
                    } */}
                    
                    { expandProduct.product_id === '' ? null :
                    <table className='inv-tbl'>
                        <tbody>
                            <tr><td className='inv-tbl-left'>Qty. Available</td><td>{ purchaseType === 'RTL' ? expandProduct.rtl_qty : expandProduct.whl_qty }</td></tr>
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
                            const classes = isLast ? "p-4" : "p-4 border-blue-gray-50";
                            return(
                                <XcartItemRow c={c++} key={product.id} product={product} classes={classes} />
                            );
                        })}
                        <tr>
                            <td></td>
                            <td className='px-4 text-right'>
                                <p className='item-name'>Total :</p>
                                <p className='item-description'>Qty. / Amount Payable</p>
                            </td>
                            <td className='pl-14 py-3'><p className='item-description'>{cartCount}</p></td>
                            <td className='px-4 text-center'><p className='item-name'>{cartTotal.toLocaleString()}</p></td>
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
                        <input type='number' min='0' className='xform-input myInput-dark' name='discount' placeholder="Discount eg. 10" required/>
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

        { salesRecords.length > 0 ?
            <Card className='cartpage-content'>
                <CardBody>
                    <div className='table-container1 overflow-auto'>
                        {/* <div className='table-child'>
                            <p>
                            Lorem ipsum dollar sit amit Lorem ipsum dollar sit amit Lorem ipsum dollar sit amit Lorem ipsum dollar sit amit 
                            LoremipsumdollarsitamitLoremipsumdollarsitamitLoremipsumdollarsitamitLoremipsumdollarsitamitLoremipsumdollarsitamitLoremipsumdollarsitamitLoremipsumdollarsitamit
                            </p>
                        </div>
                        <table className="cart-tbl border border-orange-400 w-calc[100%-100px] bg-green-500 min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ORDER NO.</th>
                                    <th>PAYMENT</th>
                                    <th>BUYER</th>
                                    <th className='text-center'>TOTAL GH₵</th>
                                    <th>DATE CREATED</th>
                                    <th>DATE CREATED</th>
                                    <th>DATE CREATED</th>
                                    <th className='text-right'>ACTIONS</th>
                                </tr>
                            </thead>
                        </table> */}

                        <table className="cart-tbl w-calc[100%-100px] min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ORDER REF#</th>
                                    <th>PAYMENT</th>
                                    <th>BUYER</th>
                                    <th className='text-center'>TOTAL GH₵</th>
                                    <th>DATE</th>
                                    <th className='text-right'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {salesRecords.map((order, index) => {
                                    const isLast = index === cartItems.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-blue-gray-50";
                                    return(
                                        <>
                                        <XcartSalesRow key={order.id} i={i++} order={order} classes={classes} />
                                        </>
                                    );
                                }).reverse()}
                                <tr>
                                    <td></td>
                                    <td className='px-4 text-right'>
                                        <p className='item-name'>Total :</p>
                                        <p className='item-description'>Records / Amount</p>
                                    </td>
                                    <td className='pl-14 py-3'><p className='item-description'>{cartCount}</p></td>
                                    <td className='pl-14 py-3'></td>
                                    <td className='px-4 text-center'><p className='item-name'>{(salesRecords.reduce((total, item) => total + item.total, 0)).toFixed(2).toLocaleString()}</p></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            : null
            // <p>No items in cart</p>
        }
    {/* </div> */}
    </>
  )
}




// export const AlertMsg = () => { 

//     const [openBottom, setOpenBottom] = useState(false);
//     const openDrawerBottom = () => setOpenBottom(true);
//     const closeDrawerBottom = () => setOpenBottom(false);

//     useEffect(() => {
//         openDrawerBottom();
//     }, []);
//     // alert('Works Perfect');

//     <Drawer
//         placement="bottom"
//         open={openBottom}
//         onClose={closeDrawerBottom}
//         className="p-4"
//     >
//         <div className="mb-6 flex items-center justify-between">
//         <Typography variant="h5" color="blue-gray">
//             Material Tailwind
//         </Typography>
//         <IconButton
//             variant="text"
//             color="blue-gray"
//             onClick={closeDrawerBottom}
//         >
//             <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="h-5 w-5"
//             >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//             />
//             </svg>
//         </IconButton>
//         </div>
//         <Typography color="gray" className="mb-8 pr-4 font-normal">
//         Material Tailwind features multiple React and HTML components, all
//         written with Tailwind CSS classes and Material Design guidelines.
//         </Typography>
//         <div className="flex gap-2">
//         <Button size="sm" variant="outlined">
//             Documentation
//         </Button>
//         <Button size="sm">Get Started</Button>
//         </div>
//     </Drawer>

// };

export default XcartPage