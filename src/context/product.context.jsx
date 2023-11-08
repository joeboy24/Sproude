
import { createContext, useEffect, useState } from 'react'
import { createExpensesDoc, createProductDoc, createPurchasesDoc, deleteExpensesDoc, deleteProductDoc, getExpensesDocs, getProductsDocuments, 
  getPurchasesDocs, 
  getSalesDocuments, infoToast, successToast, updateExpensesDoc, updateProductDoc, updateSalesDoc } from '../utils/firebase/firebase.utils';
import { ItemsArray } from '../TestData.jsx'
import { toast } from 'sonner';


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
  updateSalesRecord: () => {},
  expenses: [],
  addExpensesRecord: () => {},
  getExpensesRecords: () => {},
  updateExpensesRecord: () => {},
  purchss: [],
  addPurchases: () => {},
  getPurchases: () => {},
});


export const ProductsProvider = ({children}) => {
  const [ products, setProducts ] = useState([]);
  const [ sales, setSales ] = useState([]);
  const [ expenses, setExpenses ] = useState([]);
  const [ purchss, setPurchss ] = useState([]);

  // console.log('----- Products and Sales context loaded -----');

    useEffect(() => {

      getPurchases();
      getProduct();
      getSales();
      getExpensesRecords();
      console.log(purchss)

    },[]);


    // Products
    const addProduct = async (docToAdd) => {
      await createProductDoc(docToAdd).then(
        getProduct(),
        successToast('Item successfully added')
      );
    }

    const getProduct = async () => {
      const productMap = await getProductsDocuments();
      setProducts(productMap);
      // console.log(productMap);
    }

    const delProduct = async (docId, delString) => {
      await deleteProductDoc(docId, delString).then(
        getProduct(),
        successToast('Product has been '+`${delString === 'yes' ? 'temporarily deleted' : 'successfully restored'}`)
      );


      // toast.promise(deleteProductDoc(docId, delString), {
      //   loading: 'Loading...',
      //   success: (data) => {
      //     return `${data.name} toast has been temporarity deleted`;
      //   },
      //   error: 'Oops..! Error encountered',
      // });
    }

    const updateProduct = async (docToUpdate) => {
      await updateProductDoc(docToUpdate).then(
        getProduct(),
        successToast('Product update successful')
      );
    }



    // Sales
    const getSales = async () => {
      const salesMap = await getSalesDocuments();
      setSales(salesMap);
    }

    const updateSalesRecord = async (docToUpdate) => {
      await updateSalesDoc(docToUpdate);
      getSales();
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


    // Purchases 
    const addPurchases = async (purInputs) => {
      await createPurchasesDoc(purInputs).then(
        // setPurchss(getPurchases()),
        getPurchases(),
        successToast('Purchase record successfully saved'),
        // localStorage.setItem('localCart', '')
        // localStorage.setItem('locPurItems', '')
      );
    }

    const getPurchases = async () => {
      const purMap = await getPurchasesDocs();
      setPurchss(purMap);
      // infoToast('Inside PurchaseDocs2')
      // console.log(purMap)
      return purMap;
    }


    const value = { 
      products, addProduct, getProduct, updateProduct, delProduct, 
      sales, getSales, updateSalesRecord, 
      expenses, addExpensesRecord, getExpensesRecords, updateExpensesRecord, delExpRecord,
      purchss, addPurchases, getPurchases
    };
  return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>)
}

