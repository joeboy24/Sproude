
import { createContext, useState } from 'react'
import { ItemsArray } from '../TestData.jsx'


export const ProductsContext = createContext({
    products: [],
});


export const ProductsProvider = ({children}) => {
    const [ products, setProducts ] = useState(ItemsArray);
    const value = { products };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

