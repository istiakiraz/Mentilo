import React from 'react';
import Hero from './HomeComponents/Hero';
import Newsletter from './HomeComponents/Newsletter';
import ReviewSection from './Review/ReviewSection';
import TeamSection from './HomeComponents/TeamSection';
import LatestCommunity from './LatestCommunity/LatestCommunity';
import FeaturedClasses from './FeaturedClasses/FeaturedClasses';
import About from './HomeComponents/About';
import FeaturedSection from './HomeComponents/FeaturedSection';



const HomePage = () => {
    return (
        <div>
            <Hero></Hero>
            <FeaturedSection></FeaturedSection>
            <About></About>
            <FeaturedClasses></FeaturedClasses>
            <ReviewSection></ReviewSection>
            <LatestCommunity></LatestCommunity>
            <TeamSection></TeamSection>
            <Newsletter></Newsletter>
            
        </div>
    );
};

export default HomePage;