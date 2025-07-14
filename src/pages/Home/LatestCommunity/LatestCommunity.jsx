import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CommunityCard from './CommunityCard';

const LatestCommunity = () => {

      const axiosSecure = useAxiosSecure();

  const { data: forums = [], isLoading } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axiosSecure.get("/forum/recent");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center text-primary min-h-screen text-xl py-10">
        Loading...
      </div>
    );
  }


    return (
        <div className='lg:w-10/12 w-11/12 mx-auto my-20' >
            <h1 className=" lg:text-5xl text-3xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
          Latest 
        </span>
      </h1>
      <h2 className=" font-black text-primary text-5xl  lg:text-7xl font-title text-center uppercase leading-none">
        {" "}
        Community Posts
      </h2>
             <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6">
        {forums.map((forum) => (
          <CommunityCard forum={forum} key={forum._id} />
        ))}
      </div>
        </div>
    );
};

export default LatestCommunity;