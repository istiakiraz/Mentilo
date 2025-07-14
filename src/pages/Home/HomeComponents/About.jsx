import React from 'react'
import about from '../../../assets/svg/about.svg'

const About = () => {
    return (
        <div className='lg:w-8/12 mx-auto my-20 w-11/12 flex items-center flex-col lg:flex-row-reverse'>
              <img  className='flex-1 lg:w-96' src={about} alt="about photo" />
            <div className='flex-1'>

                 <h1 className="  text-3xl text-center font-title   uppercase leading-none">
        <span className="relative inline-block font-extrabold text-transparent stroke-text">
          The Story
        </span>
      </h1>
      <h2 className=" font-black text-primary text-4xl  lg:text-6xl font-title text-center uppercase leading-none">
        {" "}
       Behind Mentilo
      </h2>
                <p className='mt-4 text-gray-500  lg:first-letter:text-2xl' >Mentilo is a modern fitness platform designed to connect users with certified trainers for personalized training experiences. Whether you're a beginner or an advanced fitness enthusiast, our platform offers a wide range of classes tailored to your needs — from yoga to weight training.</p>
                <p className='mt-4 text-gray-500' >We’re more than just workouts — Mentilo is a community that motivates, educates, and supports your health journey. With easy booking, expert guidance, and real progress tracking, you’re always one step closer to becoming your best self.</p>

            </div>
          

        </div>
    );
};

export default About;