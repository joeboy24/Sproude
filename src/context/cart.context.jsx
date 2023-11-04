import { createContext, useEffect, useState } from "react";
import { createSalesDoc, getSalesDocuments } from "../utils/firebase/firebase.utils";


const processIncrement = (cartItems, itemToAdd, typeNqty) => {
    // Item exist
    const curQty = typeNqty.qty;
    const purchaseType = typeNqty.purchase_type
    if (purchaseType == 'RTL') {
        var usedPrice = itemToAdd.rtl_price;
    } else {
        var usedPrice = itemToAdd.whl_price;
    }

    var qtyPlus = 1;
    if (curQty != 0) {
        qtyPlus = +curQty;
    }
    const existingItem = cartItems.find((el) => el.id === itemToAdd.id)
    if (existingItem) {
        return cartItems.map((item) => item.id === itemToAdd.id 
        ? {...item, quantity: item.quantity + qtyPlus, purchase_type: purchaseType, used_price: usedPrice } 
        : item
        );
    }

    // Item does not exist
    return [...cartItems, {...itemToAdd, quantity: +curQty, purchase_type: purchaseType, used_price: usedPrice, barcode: '3298971278965'}];
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
        ? {item_id: ct.id, price: ct.used_price, quantity: ct.quantity, purchase_type: ct.purchase_type, purchase_total: ct.quantity * (+ct.used_price)}
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

    // console.log('----- Cart context loaded -----');

    // Add item to cart or perform increment
    const addItemsToCart = (itemToAdd, typeNqty) => {
        setCartItems(processIncrement(cartItems, itemToAdd, typeNqty));
        // saveToLocal();
    }

    // Perform diminution
    const decreaseItemQty = (itemToDecrease) => {
        setCartItems(processDecrement(cartItems, itemToDecrease));
        // console.log(itemToDecrease);
    }

    // Remove item from cart
    const removeCartItem = (itemToRemove) => {
        const newCart = cartItems.filter(item => item.id !== itemToRemove.id);
        saveToLocal(newCart);
        setCartItems(newCart);
    }

    // Add payInputs to sales record insert
    const addSalesRecord = async (payInputs) => {
        const sendNewSalesRecord = processSalesInsert(cartTotal, cartItems, payInputs, salesRecords);
        await createSalesDoc(sendNewSalesRecord);
        getSalesRecord();
        localStorage.setItem('localCart','');
        setCartItems('');

        // retrieveFromLocal();
        // setSalesRecords(processSalesInsert(cartTotal, cartItems, payInputs, salesRecords));

        // // Save to db here
        // createSalesDoc(salesRecords);

        // // Add to sales records display on successfull insert
        // console.log('Yeh..! Purchase complete')
    }

    const getSalesRecord = async () => {
        const salesMap = await getSalesDocuments();
        setSalesRecords(salesMap);
    }

    useEffect(() => {
        getSalesRecord();
        // saveToLocal();
        // console.log('--- Get sales records ---');
    },[]);

    // UseEffect to stage changes anytime cartItems state changes
    useEffect(() => {
        
        // Calculate cart count
        const count = cartItems.reduce(
            (total, item) => total + item.quantity, 0
        );
        setCartCount(count);

        // Calculate cart count
        const sum = cartItems.reduce(
            (total, item) => total + (+item.used_price * item.quantity), 0
        );
        setCartTotal(sum);

        // Save cartItems in local storage
        saveToLocal(cartItems);

    }, [cartItems])

    // Save cartItems in local storage
    const saveToLocal = (newCart) => {
        if (cartItems.length > 0) {
            localStorage.setItem('localCart', JSON.stringify(newCart))
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