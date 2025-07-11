import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AllTrainerCard from "./AllTrainerCard";


const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["approvedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers?status=approved");
      return res.data;
    },
  });

 if (isLoading) {
    return <div className="text-center min-h-screen text-primary py-10 text-xl">Loading...</div>;
  }

  
  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10" >

        <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary" >All Trainers</h1>

        {/* <h4 className="text-5xl" >{trainers.length}</h4> */}

        <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6 " >
            {
                trainers?.map(trainer=> <AllTrainerCard trainer={trainer} key={trainer._id} ></AllTrainerCard>)
            }
        </div>
     
     
    </div>
  );
};

export default AllTrainer;