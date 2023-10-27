// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc, getDoc , setDoc, getFirestore, collection, addDoc } from "firebase/firestore";

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
        console.log('Error occoured: ', error.message);
    }
    // console.log('Inside: '+JSON.stringify(docToAdd));
    
}

export const getProductsDoc = async () => {
    // const prodValRef = doc(db, 'products');
    // await getDoc(prodValRef);
}