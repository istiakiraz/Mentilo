import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../assets/svg/action-card.png";
import img2 from "../../assets/svg/Personal Trainer-amico.svg";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import AvailableSlots from "./AvailableSlots";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: trainer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center min-h-screen text-primary py-10 text-xl">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center min-h-screen text-primary py-10 text-xl">
        Something went wrong.
      </p>
    );

  return (
    <div className="w-11/12 mx-auto lg:max-w-9/12">
      <h1 className="text-center lg:text-5xl text-3xl my-8 font-title font-bold text-primary">
        {trainer.name} Details{" "}
      </h1>

      <div className="border-b-2 flex flex-col items-center justify-between lg:flex-row  border-primary/50 lg:py-10 border-dashed">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <img
            className="rounded-2xl border-2 shadow-[-8px_-7px_0px_0px_#432365] object-cover border-primary"
            src={trainer.photo}
            alt={trainer.name}
          />
          <div className="w-11/12 mx-0 lg:w-full">
            <h1 className="text-2xl font-bold"> Name : {trainer.name}</h1>
            <span className=" flex items-center gap-6">
              {" "}
              <h3 className="lg:text-xl "> Age : {trainer.age}</h3>
              <h3 className="lg:text-xl ">
                {" "}
                Experience : {trainer.experience}
              </h3>
            </span>

            <h3 className="lg:text-xl mb-8"> Email : {trainer.email}</h3>
            <h3 className="text-xl flex items-center gap-3 mb-2">
              {" "}
              Skills :{" "}
              {trainer.skills.map((skill, index) => (
                <p
                  className="text-[16px] py-1 cursor-pointer hover:bg-primary/60 duration-300  hover:text-black bg-primary/50 text-white px-3 rounded-2xl border border-primary"
                  key={index}
                >
                  {skill}
                </p>
              ))}{" "}
            </h3>
            <p className="lg:w-11/12 hyphens-auto text-left leading-relaxed selection:bg-primary/30">
              {" "}
              <span className="underline font-bold">
                {" "}
                About {trainer.name}
              </span>{" "}
              : {trainer.otherInfo}
            </p>
          </div>
        </div>
        <div className="flex items-center w-11/12 mx-auto flex-col">
          <h1 className="text-center text-3xl font-title mb-6 mt-8 lg:mt-0 font-bold text-primary">
            Book A Slot
          </h1>
          <motion.span
            className="mb-2"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowDownLong size={30} color="#432365" />
          </motion.span>
          <h3 className="text-center text-xl font-title mb-3 mt-8 lg:mt-0 font-bold text-primary">
            Available slots
          </h3>
          <AvailableSlots email={trainer?.email}></AvailableSlots>
          <div className="w-full">
            <h2 className="flex gap-2 items-center justify-center flex-wrap my-4 ">
              <span className="font-bold  ">Available Days :</span> {" "}
              {trainer.availableDays.map((day, index) => (
                <p key={index} className="bg-secondary px-2">
                  {" "}
                  {day}{" "}
                </p>
              ))}{" "}
            </h2>
          </div>
        </div>
      </div>

      {/* call to action section  */}
      <div className="my-12 relative  p-8 py-10 mx-auto flex flex-col md:flex-row items-center justify-center rounded-3xl bg-minor ">
        <div className="md:w-7/12 relative z-10 *:text-base-200">
          <h1 className="lg:text-4xl text-3xl text-white font-title md:w-10/12 lg:w-9/12 mb-6 font-bold ">
            Share Your Expertise, Inspire Others, and Build Your Career as a
            Trainer on Mentilo
          </h1>
          <p className="opacity-70 text-white text-sm md:w-10/12 lg:w-8/12 mb-6">
            Join a growing community of trainers and start earning by doing what
            you love. Mentilo makes it easy to teach, connect, and grow.
          </p>
          <Link to="/be-a-trainer">
            <a className="relative inline-block text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title  text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                  Become a Trainer
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </Link>
        </div>
        <img className="lg:w-80 w-65  " src={img2} alt="location img " />
        <img className="absolute top-0 z-0  " src={img1} alt="svg " />
      </div>
    </div>
  );
};

export default TrainerDetails;
