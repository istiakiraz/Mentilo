import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import FeaturedClassCard from "./FeaturedClassCard";
import ClassCardSkeleton from "../../AllClasses/Loading/ClassCardSkeleton";

const FeaturedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <>
       <h1 className=" lg:text-5xl text-3xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
          Featured
        </span>
      </h1>
      <h2 className=" font-black text-primary text-5xl  lg:text-7xl font-title text-center uppercase leading-none">
        {" "}
        Classes
      </h2>

        <div className="flex flex-wrap 2xl:w-10/12 mx-auto mt-10 justify-center gap-6 p-4">
      {[...Array(6)].map((_, index) => (
        <ClassCardSkeleton key={index} />
      ))}
    </div>
      </>
    );
  }

  return (
    <div className="w-11/12 mx-auto  my-20" >

        <h1 className=" lg:text-5xl text-3xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
          Featured
        </span>
      </h1>
      <h2 className=" font-black text-primary text-5xl  lg:text-7xl font-title text-center uppercase leading-none">
        {" "}
        Classes
      </h2>

      <div data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-8 2xl:w-10/12 mx-auto">
        {classes?.map((classCard) => (
          <FeaturedClassCard key={classCard._id} classCard={classCard} />
        ))}
      </div>
      <Link to='/all-classes'  >
                   <div className='text-center'>
                      <button className="relative inline-block cursor-pointer text-lg group">
                    <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                      <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                      <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                        {" "}
                         See All Classes
                      </span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
                  </button>
                   </div>
              </Link>
    </div>
  );
};

export default FeaturedClasses;
