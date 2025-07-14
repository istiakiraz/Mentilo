import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeamSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["recentTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers/recent");
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
    <div className="lg:w-6/12 mx-auto   my-20">
      <h1 className=" lg:text-5xl text-3xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
          Mentilo’s
        </span>
      </h1>
      <h2 className=" font-black text-primary text-5xl  lg:text-7xl font-title text-center uppercase leading-none">
        {" "}
        Fitness Champions{" "}
      </h2>
      <div className="grid grid-cols-2 my-6 ">
        {trainers?.map((trainer, index) => (
          <div
            key={trainer._id}
            className={`p-6  ${index === 0 ? "  col-span-2" : ""}`}
          >
            <img
              src={trainer.photo}
              alt={trainer.name}
              className={` cursor-grab border-8 z-10   shadow-[0px_1px_1px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.12),0px_4px_4px_0px_rgba(0,0,0,0.12),0px_8px_8px_0px_rgba(0,0,0,0.12),0px_16px_16px_0px_rgba(0,0,0,0.12)] border-primary  ${
                index === 0
                  ? " md:w-72 md:h-72 w-50 h-50  hover:scale-110 duration-600 rounded-full object-cover mx-auto mb-4"
                  : "md:w-60 md:h-60 w-40 h-40 z-0 md:-mt-20 -mt-5 hover:scale-110 duration-600 rounded-full object-cover mx-auto mb-4"
              }`}
            />

            <div className="bg-secondary p-2  -mt-12 z-40 relative w-fit mx-auto shadow-[5px_5px_0px_0px_#432365] rounded">
              <h2
                className={`font-title text-primary font-bold text-center mb-1" ${
                  index === 0 ? " px-4 lg:text-xl" : " px-2 "
                }`}
              >
                {trainer.name}
              </h2>
              <p className="text-center font-title text-sm">
                {trainer.age} years old, {trainer.experience} yrs exp.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
