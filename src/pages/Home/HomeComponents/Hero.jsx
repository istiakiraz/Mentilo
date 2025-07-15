import React from "react";
import hero from "../../../assets/svg/hero1.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-minor lg:min-py-20 min-py-10 flex items-center flex-col justify-center">
      <motion.h1 
       initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.1
        }}
      className="  lg:text-8xl text-5xl md:text-7xl mt-10 text-center  font-title  lg:mb-30 ">
        <span className="relative inline-block font-extrabold text-transparent hero-text">
          Supercharge
        </span>
      </motion.h1>
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.1
        }}
        className=" text-white font-extrabold z-10 text-7xl md:text-[140px]   lg:text-[270px] font-title text-center  lg:leading-1.5"
      >
        {" "}
        your fitness
      </motion.h2>
      <img
        className="md:w-[800px] w-92 z-40 -mt-10 md:-mt-20 pb-8"
        src={hero}
        alt="hero"
      />
      <span className="h-10 lg:w-full w-72 z-40 mb-4 -mt-7 overflow-x-hidden shadow-[4px_-32px_57px_50px_#1f102f]"></span>
    </div>
  );
};

export default Hero;
