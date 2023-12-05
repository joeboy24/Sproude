

import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { UserContext } from '../context/user.context';

const RequireAuth = ({ allowedRoles }) => {
    // const { currentUser } = useAuth();
    // console.log('Require Auth')
    // console.log(currentUser)
    var currentUser = '';
    const location = useLocation();
    if (localStorage.getItem('curUser') !== ''){
        currentUser = JSON.parse(localStorage.getItem('curUser'));
    }

    // useEffect(() => {
    //     console.log('Cur Changes')
    //     console.log(currentUser)
    // },[currentUser]);
    

    return (
        // currentUser?.auth
        currentUser?.uid
        // allowedRoles.includes(currentUser?.status)
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace/>
    );
}

export default RequireAuth;