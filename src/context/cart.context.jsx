import { createContext, useEffect, useState } from "react";
import { createSalesDoc } from "../utils/firebase/firebase.utils";


const processIncrement = (cartItems, itemToAdd, curQty) => {
    // Item exist
    // const { id, qty } = itemToAdd;
    var qtyPlus = 1;
    if (curQty != 0) {
        qtyPlus = +curQty;
    }
    const existingItem = cartItems.find((el) => el.id === itemToAdd.id)
    if (existingItem) {
        return cartItems.map((item) => item.id === itemToAdd.id 
        ? {...item, quantity: item.quantity + qtyPlus } 
        : item
        );
    }

    // Item does not exist
    return [...cartItems, {...itemToAdd, quantity: +curQty}];
    // return [cartItems, {...itemToAdd, qty: itemToAdd.qty}];
}


const processDecrement = (cartItems, itemToDecrease) => {
    const existingItem = cartItems.find(el => el.id === itemToDecrease.id);
    if (existingItem) {
        return cartItems.map(item => item.id === itemToDecrease.id 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
        );
    }
}


const processSalesInsert = (cartTotal, cartItems, payInputs, salesRecords) => {
    // Create doc insert object
    const crt = cartItems.map(ct => ct.id !== 0
        ? {item_id: ct.id, price: ct.price, quantity: ct.quantity, purchase_total: cartTotal}
        : null
    );
    payInputs['item_details'] = crt;
    console.log(payInputs);
    return payInputs;
    // return payInputs;
}


export const CartContext = createContext({
    cartItems: [],
    salesRecords: [],
    cartCount: 0,
    cartTotal: 0,
    addItemsToCart: () => {},
    decreaseItemQty: () => {},
    addSalesRecord: () => {}
})


export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState([]);
    const [ cartTotal, setCartTotal ] = useState([]);
    const [ salesRecords, setSalesRecords ] = useState([]);

    // Add item to cart or perform increment
    const addItemsToCart = (itemToAdd, curQty) => {
        setCartItems(processIncrement(cartItems, itemToAdd, curQty));
        // saveToLocal();
        // console.log(cartItems);
    }

    // Perform diminution
    const decreaseItemQty = (itemToDecrease) => {
        setCartItems(processDecrement(cartItems, itemToDecrease));
    }

    // Remove item from cart
    const removeCartItem = (itemToRemove) => {
        const newCart = cartItems.filter(item => item.id !== itemToRemove.id);
        setCartItems(newCart);
    }

    // Add payInputs to sales record insert
    const addSalesRecord = (payInputs) => {
        retrieveFromLocal();
        setSalesRecords(processSalesInsert(cartTotal, cartItems, payInputs, salesRecords));

        // Save to db here
        createSalesDoc(salesRecords);

        // Add to sales records display on successfull insert
        console.log('Yeh..! Purchase complete')
    }

    // UseEffect to stage changes anytime cartItems state changes
    useEffect(() => {
        
        // Calculate cart count
        const count = cartItems.reduce(
            (total, item) => total + item.quantity, 0
        );
        setCartCount(count);

        // Calculate cart count
        const sum = cartItems.reduce(
            (total, item) => total + ((+item.quantity) * (+item.price)), 0
        );
        setCartTotal(sum);

        // // Save cartItems in local storage
        // localStorage.setItem('localCartItems', JSON.stringify(cartItems));
        saveToLocal();

    }, [cartItems])

    // Save cartItems in local storage
    const saveToLocal = () => {
        if (cartItems.length > 0) {
            localStorage.setItem('localCart', JSON.stringify(cartItems))
            // const storedVal = JSON.parse(localStorage.getItem("localCart"));
        }
    };
    
    // Retrieve from local
    const retrieveFromLocal = () => {
        if(localStorage.getItem('localCart')) {
            const storedVal = JSON.parse(localStorage.getItem("localCart"));
            setCartItems(storedVal);
        }
    }

    // Capture responses as a value object to be saved in context
    const value = { cartItems, cartCount, cartTotal, salesRecords, addItemsToCart, decreaseItemQty, saveToLocal, retrieveFromLocal, removeCartItem, addSalesRecord };
    // const value = { cartItems, cartCount, cartTotal, addItemsToCart, decreaseItemQty, removeCartItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}