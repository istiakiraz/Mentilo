import React from 'react';
import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router';

const AllTrainerCard = ({trainer}) => {

    console.log(trainer);

    return (
        <div className='bg-secondary shadow-[5px_5px_0px_0px_#432365]  pb-6 rounded-2xl '>
            <img className='w-full h-50 rounded-t-2xl object-cover' src={trainer.photo} alt={trainer.name} />
            <div className='px-6 pt-3'>
               <div className='flex flex-wrap items-center justify-between' >
                 <h1 className='text-2xl font-bold' >{trainer.name}</h1>
                 <span className='flex gap-1 items-center'>
                    <Link><IoLogoFacebook size={20} color='#432365' /></Link>
                 <Link><FaInstagram size={20} color='#432365'/></Link>
                 </span>
               </div>
            <h1> Years of Experience : {trainer.experience}</h1>
            <p className='flex items-center mt-1 gap-2' >Skills :   {trainer.skills.map((skill, index) => (
          <p className='text-sm cursor-pointer hover:bg-primary/70 duration-300 bg-primary/50 text-white px-2 rounded-2xl border border-primary' key={index}>{skill}</p>
        ))} </p>
        <p className='flex items-center  text-sm mt-2 gap-2'>Available In : {trainer.availableDays.map((day, index)=> <p key={index} > {day} </p> )} </p>
            </div>
            <Link to={`/trainer-details/${trainer._id}`} className='px-6 flex -mt-4 justify-end ' >
                 <button className="relative inline-block mt-4 cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                 See Details
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </button>
            </Link>
        </div>
    );
};

export default AllTrainerCard;