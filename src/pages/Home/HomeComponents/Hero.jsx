import React from 'react';
import hero from '../../../assets/svg/hero1.png'

const Hero = () => {
    return (
        <div className='bg-minor lg:py-16 py-10 flex items-center flex-col justify-center'>
             <h1 className="  lg:text-8xl text-5xl md:text-7xl mt-10 text-center  font-title  lg:mb-30 ">
        <span className="relative inline-block font-extrabold text-transparent hero-text">
          Supercharge 
        </span>
      </h1>
      <h2 className=" text-white font-extrabold text-7xl md:text-[140px]   lg:text-[270px] font-title text-center  lg:leading-1.5">
        {" "}
       your fitness
      </h2>
            <img className='md:w-[800px] w-92 -mt-10 md:-mt-20 pb-8' src={hero} alt="hero" />
            <span className='h-10 w-full -mt-7 shadow-[4px_-32px_57px_50px_#1f102f]' >
            </span>
        </div>
    );
};

export default Hero;