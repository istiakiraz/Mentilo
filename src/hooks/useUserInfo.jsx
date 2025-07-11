import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserInfo = () => {

    const {user, loading: authLoading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: userInfo = {},
        isLoading: userInfoLoading,
        refetch

    } = useQuery({
        queryKey: ['userInfo', user?.email],
         enabled: !authLoading && !!user?.email,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/${user?.email}`);

            return res.data.userInfo;
        }
    })

    return {
        userInfo , userInfoLoading : userInfoLoading , refetch
    }
};

export default useUserInfo;