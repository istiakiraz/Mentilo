import React from 'react';
import Hero from './HomeComponents/Hero';
import Newsletter from './HomeComponents/Newsletter';
import ReviewSection from './Review/ReviewSection';
import TeamSection from './HomeComponents/TeamSection';
import LatestCommunity from './LatestCommunity/LatestCommunity';


const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <ReviewSection></ReviewSection>
            <LatestCommunity></LatestCommunity>
            <TeamSection></TeamSection>
            <Newsletter></Newsletter>
            
        </div>
    );
};

export default HomePage;