import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    




    return (
        <div>
            
        </div>
    );
};

export default useUserInfo;