import React from 'react';
import Hero from './HomeComponents/Hero';
import Newsletter from './HomeComponents/Newsletter';
import ReviewSection from './Review/ReviewSection';
import TeamSection from './HomeComponents/TeamSection';


const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <ReviewSection></ReviewSection>
            <TeamSection></TeamSection>
            <Newsletter></Newsletter>
            
        </div>
    );
};

export default HomePage;