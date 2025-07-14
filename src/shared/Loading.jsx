import Lottie from 'lottie-react';
import React from 'react';
import load from '../assets/jsonFile/loading (2).json'

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center mx-auto'>
            <Lottie className='lg:w-72 md:w-40 w-32 ' animationData={load} />
        </div>
    );
};

export default Loading;