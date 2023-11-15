'use server';

import { Suspense } from 'react';
import FeaturedLocationWeather from './FeaturedLocationWeather';
import Locations from './Locations';

const WeatherOverview = ({ className }) => {
    return (
        <div className={`${className}`}>
            <FeaturedLocationWeather className="" />

            <div className="mt-16">
                <Locations className="mt-5" />
            </div>
        </div>
    );
};

export default WeatherOverview;
