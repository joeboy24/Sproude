
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail  
} from "firebase/auth";
import { Toaster, toast } from 'sonner'
import { doc, getDoc , setDoc, getFirestore, collection, where, orderBy, addDoc, getDocs, query, updateDoc, deleteDoc } from "firebase/firestore";


// Firebase configuration
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
export const imageDb = getStorage(firebaseApp);


export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      switch (error.code) {
        case ('auth/popup-closed-by-user'):
            infoToast('Login window closed..!');
          break;
      
        default:
            infoToast('An error occured..!')
            console.log('An error occured: '+error.code);
          break;
      }
    }
    // const userDocRef = await createUserDocumentFromAuth();
    // console.log(user);
}

export const createAuth = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);  
}

export const createUserDocumentFromAuth = async (userAuth, additionalinfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log('userDocRef: ', userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log('userSnapshot: ', userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        // const { email } = userAuth;
        const createdAt = new Date();
        const uid = userAuth.uid;
        const status = 'user';
        const del = 'no';

      try {
        await setDoc(userDocRef, {
          uid, displayName, email, status, del, createdAt, ...additionalinfo
        });
      } catch (error) {
        console.log('An error occured', error.message);
      }
    }
    return await searchUserDoc(userAuth.email)
    return userSnapshot;
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);  
}

export const signOutUser = async () => await signOut(auth);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);


// Company

export const createCompanyDoc = async (docToAdd) => {
    const expRefValue = collection(db, 'company');
    try {
        await addDoc(expRefValue, docToAdd);
    } catch (error) {
        console.log('Error occoured: ', error.message);
    }
    
}

export const getCompanyDoc = async () => {
    const companyReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'company')));

    const companyMap = () => querySnapshot.forEach((doc) => {
        companyReceiver.push({...doc.data(), id: doc.id});
    });
    companyMap();
    // console.log(usersReceiver);
    return companyReceiver[0];
}

export const updateCompanyDoc = async (company) => {
    const upRefValue = doc(db, 'company', company.id);
    try {
        await updateDoc(upRefValue, company).then(
            successToast("Company update successful")
        )
    } catch (error) {
        console.log('Error occoured at sales: ', error.message);
    }
}


// Generate OTP

export const OTPGen = async (limit) => {
    const otpRef = collection(db, 'otpgen');

    for (let i = 0; i < limit; i++) {
        var otpp = 'A'+Math.random()*107000;
        // console.log('OTPGen - '+otpp.substring(0, 5));
        console.log(i+' - '+otpp.substring(0, 5));
        try {
            await addDoc(otpRef, { otp: otpp.substring(0, 5), status: 'no'}).then(
                // window.location.reload()
            );
        } catch (error) {
            infoToast('Internet Disconnected');
            console.log('Error occoured: ', error.message);
        }
        
    }
    
}

export const searchOtp = async (otp) => {
    // const otpRef = await getDocs(query(collection(db, 'otpgen').where("otp", "==", otp)));

    const found = [];
    const otpRef = collection(db, "otpgen");

    const findOtp = await getDocs(query(otpRef, where("otp", "==", otp)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data(), id: doc.id});
    });
    mapOtp();
    return found[0];
}

export const updateOTPDoc = async (otp) => {
    const upRefValue = doc(db, 'otpgen', otp.id);
    try {
        await updateDoc(upRefValue, otp);
    } catch (error) {
        console.log('Error occoured at OTP: ', error.message);
    }
}


// Users

export const searchUserDoc = async (email) => {
    const found = [];
    const otpRef = collection(db, "users");

    const findOtp = await getDocs(query(otpRef, where("email", "==", email)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data()});
    });
    mapOtp();
    // console.log(found[0]);
    return found[0];
}

export const getUsersDocuments = async () => {
    const usersReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'users')));

    const usersMap = () => querySnapshot.forEach((doc) => {
        usersReceiver.push({...doc.data()});
    });
    usersMap();
    // console.log(usersReceiver);
    return usersReceiver;
}

export const updateUserDoc = async (user) => {
    const upRefValue = doc(db, 'users', user.uid);
    try {
        await updateDoc(upRefValue, user).then(
            successToast(user.displayName+"'s record temporarily deleted")
        )
    } catch (error) {
        console.log('Error occoured at sales: ', error.message);
    }
}


// Sales

export const createSalesDoc = async (docToAdd) => {
    // return 
    console.log(docToAdd);
    const salesRefValue = collection(db, 'sales');
    try {
        await addDoc(salesRefValue, docToAdd).then(
            // window.location.reload()
        );
    } catch (error) {
        infoToast('Internet Disconnected');
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

export const getSalesDocuments = async () => {
    const salesReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'sales'), orderBy("created_at", "asc")));

    const salesMap = () => querySnapshot.forEach((doc) => {
        salesReceiver.push({...doc.data(), id: doc.id});
    });
    salesMap();
    // console.log(salesReceiver);
    return salesReceiver;

}

export const updateSalesDoc = async (docToUpdate) => {
    const upRefValue = doc(db, 'sales', docToUpdate.id);
    try {
        await updateDoc(upRefValue, docToUpdate).then(
            successToast('Payment successful')
        )
    } catch (error) {
        console.log('Error occoured at sales: ', error.message);
    }
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

export const deleteProductDoc = async (docId, delString) => {
    const upRefValue = doc(db, 'products', docId);
    try {
        await updateDoc(upRefValue, { del: delString });
    } catch (error) {
        console.log('Error occoured at products deletion: ', error.message);
    }
    const sendPromise = await updateDoc(upRefValue, { del: delString });
    // toast.promise(updateDoc(upRefValue, { del: delString }), {
    //     loading: 'Loading...',
    //     success: (data) => {
    //       return `${data.name} toast has been temporarity deleted`;
    //     },
    //     error: 'Oops..! Error encountered',
    // });
}

export const updateProductDoc = async (docToUpdate) => {
    const upRefValue = doc(db, 'products', docToUpdate.id);
    try {
        await updateDoc(upRefValue, docToUpdate);
    } catch (error) {
        console.log('Error occoured at products deletion: ', error.message);
    }
}

// export const updateMultiProductDoc = async (docsToUpdate) => {
//     // const updateFunc = () => 
//     docsToUpdate.forEach((doc) => {
//         const upRefValue = doc(db, 'products', doc.id);
//         await updateDoc(upRefValue, docToUpdate);
//     })
//     // updateFunc();
//     try {
//     } catch (error) {
//         console.log('Error occoured at products deletion: ', error.message);
//     }
// }


// Purchases

export const createPurchasesDoc = async (docToAdd) => {
    const purRefValue = collection(db, 'purchases');
    try {
        await addDoc(purRefValue, docToAdd);
    } catch (error) {
        console.log('Error occoured at Expenses: ', error.message);
    }
    
}

export const getPurchasesDocs = async () => {

    const purReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'purchases')));

    const purMap = () => querySnapshot.forEach((doc) => {
        purReceiver.push({...doc.data(), id: doc.id});
    });
    purMap();
    // infoToast('Inside PurchaseDocs')
    // console.log(purReceiver)
    return purReceiver;

}


// Toasts

export const successToast = (message) => {
  toast.success(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const errorToast = (message) => {
  toast.error(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const infoToast = (message) => {
  toast.info(message, {
    position: 'top-left',
    duration: '5000'
  })
}