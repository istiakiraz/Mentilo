import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserInfo from '../hooks/useUserInfo';
import { Navigate } from 'react-router';

const SharedRoute = ({children}) => {
    const {user, loading} = useAuth();
   const {userInfo , userInfoLoading} = useUserInfo()

    if(loading || userInfoLoading){
        return <div className='text-secondary' >
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }

    if(!user || userInfo.role === "member"){
        return <Navigate  to='/forbidden'></Navigate>
    }


    return children
};

export default SharedRoute;