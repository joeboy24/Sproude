import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangeListener } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null 
});

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            // console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            localStorage.setItem('curUser', JSON.stringify(user));
            // console.log(localStorage.getItem('curUser'));
        })

        return unsubscribe;
    }, []);

    // useEffect(() => {
    //     console.log('New CurrentUser');
    //     console.log(currentUser);
    // }, [currentUser]);

    const value = { currentUser, setCurrentUser }; 

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

