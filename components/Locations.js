'use client';

import { useWeatherStore } from '@/store';
import LocationCard from './LocationCard';

const Locations = ({ className }) => {
    const allLocations = useWeatherStore((store) => store.locations);

    console.log('locations', allLocations.slice(1));

    if (allLocations.length < 2) {
        return;
    }

    return (
        <>
            <h1 className="text-2xl">Other Cities</h1>
            <div className={`flex gap-8 ${className}`}>
                {allLocations.slice(1).map((location) => {
                    return (
                        <LocationCard
                            className={`flex-grow`}
                            key={location.id}
                            location={location}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Locations;
