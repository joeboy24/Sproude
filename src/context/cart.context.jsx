import { createContext, useEffect, useState } from "react";
import { createSalesDoc, errorToast, getPurchasesDocs, getSalesDocuments, infoToast, successToast } from "../utils/firebase/firebase.utils";


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
        successToast('Item quantity increased')
        return cartItems.map((item) => item.id === itemToAdd.id 
        ? {...item, quantity: item.quantity + qtyPlus, purchase_type: purchaseType, used_price: usedPrice } 
        : item
        );
    }

    // Item does not exist

    successToast('Item has been added to cart');
    return [...cartItems, {...itemToAdd, quantity: +curQty, purchase_type: purchaseType, used_price: usedPrice, barcode: '3298971278965'}];
}


const processDecrement = (cartItems, itemToDecrease, cartCount) => {
    const existingItem = cartItems.find(el => el.id === itemToDecrease.id);

    if (existingItem) {
        return cartItems.map(item => item.id === itemToDecrease.id && itemToDecrease.quantity > 1
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
    // console.log(payInputs);
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
    addSalesRecord: () => {},
    purchss: [],
    getPurchases: () => {},
})


export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState([]);
    const [ cartTotal, setCartTotal ] = useState([]);
    const [ salesRecords, setSalesRecords ] = useState([]);
    const [ purchss, setPurchss ] = useState([]);

    // console.log('----- Cart context loaded -----');

    // Add item to cart or perform increment
    const addItemsToCart = (itemToAdd, typeNqty) => {
        setCartItems(processIncrement(cartItems, itemToAdd, typeNqty));
        
        // console.log(itemToAdd);
        // saveToLocal();
    }

    // Perform diminution
    const decreaseItemQty = (itemToDecrease) => {
        const existingItem = cartItems.find(el => el.id === itemToDecrease.id);
        if(existingItem.quantity > 1){
            setCartItems(processDecrement(cartItems, itemToDecrease, cartCount));
            successToast('Item quantity reduced')
        } else {
            errorToast('Item quantity cannot be less than 1. Delete from cart if you wish')
        }
    }

    // Remove item from cart
    const removeCartItem = (itemToRemove) => {
        const newCart = cartItems.filter(item => item.id !== itemToRemove.id);
        saveToLocal(newCart);
        setCartItems(newCart);
        successToast('Item removed from cart')
    }

    // Add payInputs to sales record insert
    const addSalesRecord = async (payInputs) => {
        const sendNewSalesRecord = processSalesInsert(cartTotal, cartItems, payInputs, salesRecords);
        await createSalesDoc(sendNewSalesRecord).then(
            getSalesRecord(),
            successToast('Sales record successfully added')
        );
        localStorage.setItem('localCart','');
        setCartItems({});
    }

    const getSalesRecord = async () => {
        const salesMap = await getSalesDocuments();
        setSalesRecords(salesMap);
    }

    const getPurchases = async () => {
      const purMap = await getPurchasesDocs();
      setPurchss(purMap);
      // infoToast('Inside PurchaseDocs2')
      // console.log(purMap)
      return purMap;
    }

    // useEffect(() => {
    // },[salesRecords]);

    useEffect(() => {
        getSalesRecord();
        // saveToLocal();
        // console.log('--- Get sales records ---');
    },[]);

    // UseEffect to stage changes anytime cartItems state changes
    useEffect(() => {
        if (cartItems.length > 0) {
            
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

        }
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
    const value = { cartItems, cartCount, cartTotal, salesRecords, addItemsToCart, decreaseItemQty, saveToLocal, retrieveFromLocal, removeCartItem, addSalesRecord, purchss, getPurchases };
    // const value = { cartItems, cartCount, cartTotal, addItemsToCart, decreaseItemQty, removeCartItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}