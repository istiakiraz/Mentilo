import React from 'react';
import { FaArrowLeft, FaArrowRight,  } from 'react-icons/fa';
import { useSwiper } from 'swiper/react';

const SwiperNav = () => {
    const swiper = useSwiper()
    return (
        <div className='flex justify-center mt-6 gap-36' >
            <button className='rounded-full p-3 bg-secondary border-2 border-primary hover:bg-primary/50 cursor-pointer duration-500 hover:scale-105 mb-2' onClick={()=> swiper.slidePrev()} > <FaArrowLeft />
            </button>
            <button className='rounded-full p-3 bg-secondary border-2 border-primary hover:bg-primary/50 cursor-pointer duration-500 hover:scale-105 mb-2 ' onClick={()=> swiper.slideNext()} > <FaArrowRight />
            </button>
            
        </div>
    );
};

export default SwiperNav;