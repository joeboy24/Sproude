// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc, getDoc , setDoc, getFirestore, collection, addDoc, getDocs, query, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGO18AsLnyl0lP7rUb77t4OoPRX15d1nI",
  authDomain: "sproude-pos.firebaseapp.com",
  projectId: "sproude-pos",
  storageBucket: "sproude-pos.appspot.com",
  messagingSenderId: "729588805983",
  appId: "1:729588805983:web:607601d4ef77b744ca06ea"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


export const db = getFirestore();

export const createSalesDoc = async (docToAdd) => {
    const salesRefValue = collection(db, 'sales');
    try {
        await addDoc(salesRefValue, docToAdd);
    } catch (error) {
        alert('Internet Disconnected');
        // switch (error.code) {
        //   case ('auth/popup-closed-by-user'):
        //       alert('Popup Closed..!');
        //     break;
        
        //   default:
        //       alert('An error occured: '+error.code);
        //     break;
        // }
        console.log('Error occoured: ', error.message);
    }
    // console.log('Inside: '+JSON.stringify(docToAdd));
    
}

export const getProductsDocuments = async () => {
    
    const collRef = collection(db, 'products');
    const querySnapshot = await getDocs(query(collRef));
    // const getIt = await getDocs(query(collection(db, 'products')));
    const getProductsFromFirebase = [];

    // const productsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowercase()] = items;
    //     return acc;
    // }, {})

    const productsMap = () => querySnapshot.forEach((doc) => {
        getProductsFromFirebase.push({...doc.data(), id: doc.id});
    });
    productsMap();
    // console.log(getProductsFromFirebase);
    return getProductsFromFirebase;

}

export const getSalesDocuments = async () => {

    const salesReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'sales')));

    const salesMap = () => querySnapshot.forEach((doc) => {
        salesReceiver.push({...doc.data(), id: doc.id});
    });
    salesMap();
    // console.log(salesReceiver);
    return salesReceiver;

}


// Expenses

export const createExpensesDoc = async (docToAdd) => {
    const expRefValue = collection(db, 'expenses');
    try {
        await addDoc(expRefValue, docToAdd);
    } catch (error) {
        console.log('Error occoured at Expenses: ', error.message);
    }
    
}

export const getExpensesDocs = async () => {

    const expReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'expenses')));

    const expMap = () => querySnapshot.forEach((doc) => {
        expReceiver.push({...doc.data(), id: doc.id});
    });
    expMap();
    // console.log(expReceiver);
    return expReceiver;

}

export const updateExpensesDoc = async (docUpdate) => {
    // return alert(docUpdate);
    const expRefValue = doc(db, 'expenses', 'x3w4apJ4z4mrBZ5nQdOU');
    try {
        await updateDoc(expRefValue, { branch_id: docUpdate });
        // await setDoc(userDocRef, {
        //   displayName, email, createdAt, ...additionalinfo
        // });
    } catch (error) {
        console.log('Error occoured at Expenses: ', error.message);
    }
    
}

export const deleteExpensesDoc = async (docId) => {
    const expRef = doc(db, 'expenses', docId);
    await deleteDoc(expRef);
}


// Products

export const createProductDoc = async (docToAdd) => {
    const prodRefValue = collection(db, 'products');
    try {
        await addDoc(prodRefValue, docToAdd);
        console.log('Product document successfully added');
    } catch (error) {
        console.log('Error occoured at Products: ', error.message);
    }
}

export const deleteProductDoc = async (docId, delString) => {
    const upRefValue = doc(db, 'products', docId);
    try {
        await updateDoc(upRefValue, { del: delString });
    } catch (error) {
        console.log('Error occoured at products deletion: ', error.message);
    }
}

export const updateProductDoc = async (docToUpdate) => {
    const upRefValue = doc(db, 'products', docToUpdate.id);
    try {
        await updateDoc(upRefValue, docToUpdate);
    } catch (error) {
        console.log('Error occoured at products deletion: ', error.message);
    }
}