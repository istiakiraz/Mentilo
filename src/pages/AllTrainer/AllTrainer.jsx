import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AllTrainerCard from "./AllTrainerCard";
import TrainerCardSkeleton from "./LoadingCard/TrainerCardSkeleton";


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
    return <>
     <h1 className="text-center lg:text-5xl mt-10 text-3xl font-title font-bold text-primary" >All Trainers</h1>
    <div className="flex flex-wrap 2xl:w-10/12 mx-auto my-10 justify-center gap-4 p-4">
      {[...Array(6)].map((_, index) => (
        <TrainerCardSkeleton key={index} />
      ))}
    </div>
    
    </>
  }

  
  return (
    <div className="2xl:w-10/12 mx-auto min-h-screen w-11/12 py-10" >

        <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary" >All Trainers</h1>

        {/* <h4 className="text-5xl" >{trainers.length}</h4> */}

        <div className="grid lg:grid-cols-3 my-8 2xl:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6 " >
            {
                trainers?.map(trainer=> <AllTrainerCard trainer={trainer} key={trainer._id} ></AllTrainerCard>)
            }
        </div>
     
     
    </div>
  );
};

export default AllTrainer;