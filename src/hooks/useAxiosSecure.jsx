import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: `https://mentilo-server.vercel.app`,
})

const useAxiosSecure = () => {

    const {user ,signOutUser} = useAuth();
    const navigate = useNavigate();

     useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        // console.log('interceptors', error?.response?.status);
        const status = error?.response?.status;

        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          signOutUser()
            .then(() => navigate('/sign-in'))
            .catch(() => console.log());
        }

        return Promise.reject(error);
      }
    );

    // Cleanup: eject interceptor when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, signOutUser]);


    return axiosSecure
};

export default useAxiosSecure;