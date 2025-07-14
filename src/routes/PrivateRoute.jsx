import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();


     const location = useLocation()

    if(loading){
        return <div className='text-secondary' >
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }

    if(!user){
        
         return <Navigate state={location.pathname} to='/signin'></Navigate>
    }


    return children;
};

export default PrivateRoute;