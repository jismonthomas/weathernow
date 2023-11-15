import { Suspense, useEffect, useState } from 'react';
import { getWeatherDesc } from '@/lib/weathercodes';
import { convertDate, daysInWeek, getWeatherDescription } from '@/lib/utils';
import { orbitron } from './ui/fonts';

import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from './ui/card';
import Image from 'next/image';
const LocationCard = ({ location, className }) => {
    const [weatherData, setWeatherData] = useState(null);
    const { lat, lng } = location.coordinates;

    useEffect(() => {
        if (location.length === 0 && !lat && !lng) {
            return;
        }

        // console.log('use effect running', locations.length, lat, lng);

        const getData = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_DOMAIN}/api/weather/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        latitude: lat,
                        longitude: lng,
                    }),
                }
            );

            if (!res.ok) {
                return;
            }

            const data = await res.json();
            setWeatherData(data);
            return;
        };

        getData();
    }, [lat, lng, location]);

    if (!weatherData || !(weatherData.daily.time.length > 0)) {
        return;
    }

    const today = weatherData?.daily.time[0];

    const date = new Date();
    const time = date?.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        // hour12: false,
        hourCycle: 'h23',
        timeZone: weatherData?.timezone,
    });

    const dateTimeInIso = `${today}T${time.slice(0, 2)}:00`;

    const currentTimeIndex = weatherData?.hourly.time.indexOf(dateTimeInIso);

    const currentTemp = Math.round(
        weatherData?.hourly.temperature_2m[currentTimeIndex]
    );

    const dayHigh = Math.round(weatherData?.daily.temperature_2m_max[0]);
    const dayLow = Math.round(weatherData?.daily.temperature_2m_min[0]);

    const dayWeatherCode = weatherData?.hourly.weather_code[currentTimeIndex];
    const dayWeatherDesc = getWeatherDesc(dayWeatherCode);

    // console.log('weatherDataweatherData:::', weatherData);
    // console.log('location:::', location.locationDetails.country.long_name);

    // console.log('today:::', today);
    // console.log('Location time:::', time);
    // console.log(
    //     'dateTimeInIso',
    //     `${today}T${time.slice(0, 2)}:00`,
    //     `2023-11-12T09:00`
    // );
    // console.log('currentTimeIndex:::', currentTimeIndex);
    // console.log('currentTemp:::', currentTemp);

    // console.log('dayHigh:::', dayHigh);
    // console.log('dayLow:::', dayLow);

    // console.log('dayWeatherCode:::', dayWeatherCode);
    // console.log('dayWeatherDesc:::', dayWeatherDesc);

    // console.log('-------------');

    const locality = location.locationDetails.locality?.long_name;
    const country = location.locationDetails.country?.long_name;

    return (
        <>
            <Card
                className={`flex bg-card-foreground/5 rounded-3xl overflow-hidden min-w-[150px] ${className}`}>
                <CardContent className={`pt-4 flex justify-between w-full`}>
                    <div className="flex flex-col justify-between">
                        <span className="flex flex-col ">
                            <span className="text-md tracking-wide opacity-50">
                                {country}
                            </span>
                            <span className="text-2xl">{locality}</span>
                        </span>
                        <span className="mt-8 block text-sm capitalize">
                            {dayWeatherDesc?.desc}
                        </span>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                        <span
                            className={`${orbitron.className} font-light text-3xl tracking-normal`}>
                            {currentTemp}&deg;
                        </span>
                        <span className="mt-8 block text-sm capitalize">
                            H: {dayHigh}&deg; L: {dayLow}&deg;
                        </span>
                    </div>
                    {/* <Image
                            src={dayWeatherDesc?.icon}
                            alt="Icon for the current weather"
                            className=" object-contain ml-4 w-auto"
                            width={50}
                            height={50}
                        /> */}
                </CardContent>
            </Card>
        </>
    );
};

export default LocationCard;
