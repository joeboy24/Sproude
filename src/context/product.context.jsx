
import { createContext, useEffect, useState } from 'react'
import { getProductsDoc } from '../utils/firebase/firebase.utils';
// import { ItemsArray } from '../TestData.jsx'


export const ProductsContext = createContext({
    products: [],
    getProduct: () => {}
});


export const ProductsProvider = ({children}) => {
    const [ products, setProducts ] = useState([]);


    useEffect(() => {

      getProduct();

    },[]);

    const getProduct = () => {
      setProducts(getProductsDoc);
    }

    const value = { products, getProduct };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

