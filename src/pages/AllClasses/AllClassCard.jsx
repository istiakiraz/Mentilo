import React from "react";
import { Link } from "react-router";
import { FaArrowUpLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const AllClassCard = ({ classCard }) => {
  return (
    <div className="bg-secondary   shadow-[9px_9px_0px_0px_#432365] pb-6">
      <img
        className="h-60 object-cover w-full"
        src={classCard.classPhoto}
        alt={classCard.title}
      />
      <div className="px-6 pt-4 *:text-primary bg-secondary w-full ">
        <div className=" flex items-start justify-between">
          <span>
            <h1 className="text-2xl font-bold font-title">{classCard.title}</h1>
            <h3>
              <span className="font-bold">Difficulty</span> :{" "}
              {classCard.difficulty}
            </h3>
            <h3>
              {" "}
              <span className="font-bold text-sm lg:text-[16px] flex items-start">
                Benefits:
              </span>{" "}
              {classCard.benefits.map((benefit, index) => (
                <li
                  className="lg:text-sm text-[12px] md:text-[10px]  "
                  key={index}
                >
                  {benefit}
                </li>
              ))}
            </h3>
          </span>

          <div className="grid grid-cols-3 gap-2 items-center ">
            <span className="col-span-3 text-sm font-bold">
              {" "}
              Associated Trainers :
            </span>{" "}
            {classCard.trainers.map((trainer, index) => (
              <Link to={`/trainer-details/${trainer._id}`} key={index}>
                <img
                  className="size-10 object-cover border-2 border-primary rounded-full"
                  src={trainer.photo}
                  alt={trainer.email}
                />
              </Link>
            ))}
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="col-span-3 mx-auto  text-center"
            >
              {" "}
              <FaArrowUpLong color="#432365" />
            </motion.span>
            <span className="col-span-3 font-bold font-title text-center">
              Book Your Slot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClassCard;


