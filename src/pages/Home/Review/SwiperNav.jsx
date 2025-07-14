import React from 'react';
import { FaArrowLeft, FaArrowRight,  } from 'react-icons/fa';
import { useSwiper } from 'swiper/react';

const SwiperNav = () => {
    const swiper = useSwiper()
    return (
        <div className='flex justify-center mt-6 gap-36' >
            <button className='btn rounded-full p-3 bg-secondary hover:bg-white ' onClick={()=> swiper.slidePrev()} > <FaArrowLeft />
            </button>
            <button className='btn rounded-full p-3 bg-secondary hover:bg-white ' onClick={()=> swiper.slideNext()} > <FaArrowRight />
            </button>
            
        </div>
    );
};

export default SwiperNav;