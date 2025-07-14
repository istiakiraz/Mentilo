import React from 'react';
import Hero from './HomeComponents/Hero';
import Newsletter from './HomeComponents/Newsletter';
import ReviewSection from './Review/ReviewSection';


const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <ReviewSection></ReviewSection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;