
import { createContext, useEffect, useState } from 'react'
import { createExpensesDoc, getExpensesDocs, getProductsDocuments, getSalesDocuments } from '../utils/firebase/firebase.utils';
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
  getSales: () => {},
  expenses: [],
  addExpensesRecord: () => {}
});


export const ProductsProvider = ({children}) => {
  const [ products, setProducts ] = useState(ItemsArray);
  const [ sales, setSales ] = useState([]);
  const [ expenses, setExpenses ] = useState([]);

  console.log('----- Products and Sales context loaded -----');

    useEffect(() => {

      // console.log('Im Here..!');
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



    // Expenses 
    const addExpensesRecord = async (expInputs) => {

      const crt = sales.map(ct => ct.id !== 0
        ? {item_id: ct.id, buyer_name: ct.buyer_name}
        : null
      );
      // expInputs['obj'] = crt;
      await createExpensesDoc(expInputs);
      console.log(expInputs);
    }

    const getExpensesRecords = async () => {
      const expMap = await getExpensesDocs();
      setExpenses(expMap);
    }


    const value = { products, getProduct, sales, getSales, expenses, addExpensesRecord, getExpensesRecords };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

