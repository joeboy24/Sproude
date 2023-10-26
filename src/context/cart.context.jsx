import { createContext, useEffect, useState } from "react";


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


export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    addItemsToCart: () => {},
    decreaseItemQty: () => {}
})


export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState([]);
    const [ cartTotal, setCartTotal ] = useState([]);

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
            // console.log('from saveToLocal Stored Value = '+storedVal[0].name+' - qty = '+storedVal[0].quantity);   
        }
    };
    

    const retrieveFromLocal = () => {
        if(localStorage.getItem('localCart')) {
            const storedVal = JSON.parse(localStorage.getItem("localCart"));
            setCartItems(storedVal);
            // console.log('cartContext localCart => '+storedVal);
        }
    }

    // Capture responses as a value object to be saved in context
    const value = { cartItems, cartCount, cartTotal, addItemsToCart, decreaseItemQty, saveToLocal, retrieveFromLocal, removeCartItem };
    // const value = { cartItems, cartCount, cartTotal, addItemsToCart, decreaseItemQty, removeCartItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}