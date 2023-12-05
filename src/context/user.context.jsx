import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, errorToast, getCompanyDoc, getUsersDocuments, infoToast, onAuthStateChangeListener, signOutUser } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null ,
    users: [],
    getUsers: () => {},
    company: null,
    getCompany: () => {},
});

export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ users, setUsers ] = useState(null);
    const [ company, setCompany ] = useState(null);

    const getCompany = async () => {
        const fetchCompany = await getCompanyDoc();
        setCompany(fetchCompany);
    }

    const userFunc = () => {
        const unsubscribe = onAuthStateChangeListener( async (user) => {
            // console.log(user);
            if (user) {
                const getUser = await createUserDocumentFromAuth(user);
                if (getUser.del == 'yes'){
                    errorToast('Oops..! Unable to login. Contact Administrator')
                    return signOutUser;
                }
                setCurrentUser(getUser);
                localStorage.setItem('curUser', JSON.stringify(user));
                // infoToast('Cache Set')
                // console.log(getUser);
            } else {
                // infoToast('Cache cleared')
                localStorage.setItem('curUser', '');
            }
            // console.log(localStorage.getItem('curUser'));
        })
        return unsubscribe;
    }

    const getUsers = async () => {
        const fetchUsers = await getUsersDocuments();
        setUsers(fetchUsers);
        // infoToast('Users Reloaded')
    }

    useEffect(() => {
        getCompany();
        userFunc();
        getUsers();
        // const unsubscribe = onAuthStateChangeListener((user) => {
        //     // console.log(user);
        //     if (user) {
        //         setCurrentUser(createUserDocumentFromAuth(user));
        //     }
        //     localStorage.setItem('curUser', JSON.stringify(user));
        //     // console.log(localStorage.getItem('curUser'));
        // })

        // return unsubscribe;
    }, []);

    // useEffect(() => {
    //     console.log('New CurrentUser');
    //     console.log(currentUser);
    // }, [currentUser]);

    const value = { currentUser, setCurrentUser, users, getUsers, company, getCompany }; 

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

