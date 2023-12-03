

import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { UserContext } from '../context/user.context';

const RequireAuth = () => {
    console.log('Require Auth')
    // const { currentUser } = useAuth();
    const currentUser = JSON.parse(localStorage.getItem('curUser'));
    const location = useLocation();

    useEffect(() => {
        console.log('Cur Changes')
        console.log(currentUser)
    },[currentUser]);
    

    return (
        // currentUser?.auth
        currentUser?.uid
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace/>
    );
}

export default RequireAuth;