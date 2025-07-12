import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AllClassCard from './AllClassCard';

const AllClasses = () => {

    const axiosSecure = useAxiosSecure()

     const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center min-h-screen text-primary py-10 text-xl">Loading...</div>;
  }

    return (
        <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10" >
             <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary" >All Trainers</h1>
             <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6 " >
            {
                classes?.map(classCard=> <AllClassCard classCard={classCard} key={classCard._id} ></AllClassCard>)
            }
        </div>
        </div>
    );
};

export default AllClasses;