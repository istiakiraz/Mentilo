import React from 'react';
import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';
import useAuth from '../hooks/useAuth';

const TrainerRoute = ({children}) => {
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

    if(!user || userInfo.role !== "trainer"){
        return <Navigate  to='/forbidden'></Navigate>
    }


    return children
};

export default TrainerRoute;