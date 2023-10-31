
import { createContext, useEffect, useState } from 'react'
import { getProductsDocuments, getSalesDocuments } from '../utils/firebase/firebase.utils';
import { ItemsArray } from '../TestData.jsx'


const processProducts = async () => {
  const productMap = await getProductsDocuments();
  console.log('+++++++++++++++++++++++++');
  console.log(productMap);
  console.log('+++++++++++++++++++++++++');
  return (productMap);
}



export const ProductsContext = createContext({
  products: [],
  getProduct: () => {},
  sales: [],
  getSales: () => {}
});


export const ProductsProvider = ({children}) => {
  const [ products, setProducts ] = useState(ItemsArray);
  const [ sales, setSales ] = useState([]);

  console.log('----- Products and Sales context loaded -----');

    useEffect(() => {

      console.log('Im Here..!');
      // getProduct();
      getSales();

    },[]);

    const getProduct = async () => {
      const productMap = await getProductsDocuments();
      setProducts(productMap);
    }


    const getSales = async () => {
      const salesMap = await getSalesDocuments();
      setSales(salesMap);
    }




    const value = { products, sales, getProduct, getSales };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

