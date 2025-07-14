import React from 'react';
import Hero from './HomeComponents/Hero';
import Newsletter from './HomeComponents/Newsletter';
import ReviewSection from './Review/ReviewSection';
import TeamSection from './HomeComponents/TeamSection';
import LatestCommunity from './LatestCommunity/LatestCommunity';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';



const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            
            <FeaturedClasses></FeaturedClasses>
            <ReviewSection></ReviewSection>
            <LatestCommunity></LatestCommunity>
            <TeamSection></TeamSection>
            <Newsletter></Newsletter>
            
        </div>
    );
};

export default HomePage;