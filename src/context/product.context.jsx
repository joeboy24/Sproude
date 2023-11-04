
import { createContext, useEffect, useState } from 'react'
import { createExpensesDoc, createProductDoc, deleteExpensesDoc, deleteProductDoc, getExpensesDocs, getProductsDocuments, getSalesDocuments, updateExpensesDoc, updateProductDoc } from '../utils/firebase/firebase.utils';
import { ItemsArray } from '../TestData.jsx'


const processProducts = async () => {
  const productMap = await getProductsDocuments();
  return (productMap);
}



export const ProductsContext = createContext({
  products: [],
  addProduct: () => {},
  getProduct: () => {},
  updateProduct: () => {},
  sales: [],
  getSales: () => {},
  expenses: [],
  addExpensesRecord: () => {},
  getExpensesRecords: () => {},
  updateExpensesRecord: () => {}
});


export const ProductsProvider = ({children}) => {
  const [ products, setProducts ] = useState(ItemsArray);
  const [ sales, setSales ] = useState([]);
  const [ expenses, setExpenses ] = useState([]);

  // console.log('----- Products and Sales context loaded -----');

    useEffect(() => {

      getProduct();
      getSales();
      getExpensesRecords();

    },[]);


    // Products
    const addProduct = async (docToAdd) => {
      await createProductDoc(docToAdd).then(
        getProduct()
      );
    }

    const getProduct = async () => {
      const productMap = await getProductsDocuments();
      setProducts(productMap);
    }

    const delProduct = async (docId, delString) => {
      await deleteProductDoc(docId, delString).then(
        getProduct()
      );
    }

    const updateProduct = async (docToUpdate) => {
      await updateProductDoc(docToUpdate).then(
        getProduct()
      );
    }



    // Sales
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
      getExpensesRecords();
    }

    const getExpensesRecords = async () => {
      const expMap = await getExpensesDocs();
      setExpenses(expMap);
    }

    const updateExpensesRecord = async (num) => {
      await updateExpensesDoc(num);
      getExpensesRecords();
    }

    const delExpRecord = async (docId) => {
      await deleteExpensesDoc(docId);
      getExpensesRecords();
    }

    // useEffect(() => {
    // },[expenses]);


    const value = { products, addProduct, getProduct, updateProduct, delProduct, sales, getSales, expenses, addExpensesRecord, getExpensesRecords, updateExpensesRecord, delExpRecord };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

