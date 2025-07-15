import React from "react";
import Marquee from "react-fast-marquee";
import { FaUserShield, FaCreditCard, FaChalkboardTeacher, FaComments } from "react-icons/fa";
import { MdOutlineFitnessCenter } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";


const features = [
  {
    icon: <MdOutlineFitnessCenter size={40} />,
    title: "Fitness Classes",
    desc: "Explore a variety of fitness programs designed for every level, from yoga to high-intensity training.",
  },
  {
    icon: <FaChalkboardTeacher size={40} />,
    title: "Expert Trainers",
    desc: "Learn from certified professionals who guide you with personalized workout and diet plans.",
  },
  {
    icon: <FaCreditCard size={40} />,
    title: "Secure Payments",
    desc: "Enjoy seamless and secure online payments with integrated Stripe checkout.",
  },
  {
    icon: <IoMdNotificationsOutline size={40} />,
    title: "Stay Updated",
    desc: "Subscribe to our newsletter and get notified about new classes, trainers, and offers.",
  },
  {
    icon: <FaComments size={40} />,
    title: "Community Forums",
    desc: "Engage with like-minded fitness enthusiasts, ask questions, and share your journey.",
  },
  {
    icon: <FaUserShield size={40} />,
    title: "Safe & Private",
    desc: "Your data and payments are protected with top-grade security measures.",
  },
];

const FeaturedSection = () => {
  return (
    <div className="lg:w-10/12 w-full mx-auto lg:mt-40 md:mt-30 mt-20 lg:mb-10">


        
      <div className="text-center w-11/12 mx-auto ">
          <h1 className="  text-2xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
           Key Highlights
        </span>
      </h1>
      <h2  className=" font-black text-primary text-3xl  lg:text-6xl font-title text-center uppercase leading-none">
        {" "}
        Why Choose Mentilo?
      </h2>
      </div>

      <Marquee pauseOnHover speed={40} gradient={true}>
        <div className="flex gap-2 md:gap-4 lg:gap-6 px-2 lg:px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                relative overflow-hidden
                bg-secondary/70 
                text-primary
                 rounded-xl shadow-lg 
                flex flex-col items-center text-center 
                lg:w-[300px] w-40
                transition-all duration-500 ease-in-out transform hover:-translate-y-2
                group 
                my-10
                lg:px-10 lg:p-6 p-3
                cursor-grab
              "
            >

              <div className="
                absolute bottom-0 left-0 w-full h-0 
                bg-[radial-gradient(200%_100%_at_50%_0%,rgba(255,255,255,0)_10%,rgba(67,35,101,1)_95%)]
                transition-all duration-500 ease-in-out 
                group-hover:h-full
              "></div>

              <div className="relative my-auto z-10">
                <div className="lg:mb-4 mb-2 w-fit text-center  mx-auto ">{feature.icon}</div>
                <h3 className="font-bold font-title text-[14px] lg:text-xl">{feature.title}</h3>
                <p className="lg:text-[12px] text-[10px] mt-2  lg:mt-3">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default FeaturedSection;

