import { createContext, useEffect, useState } from "react";
import { getCompanyDoc } from "../utils/firebase/firebase.utils";


export const SystemContext = createContext({
    company: null,
    getCompany: () => {},
});


export const SystemProvider = ({children}) => {
    const [ company, setCompany ] = useState(null);

    const getCompany = async () => {
        const fetchCompany = await getCompanyDoc();
        setCompany(fetchCompany);
    }


    useEffect(() => {
        getCompany();
    }, []);


    const value = { company, getCompany};
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
}