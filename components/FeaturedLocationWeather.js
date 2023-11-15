'use client';
import { useWeatherStore } from '@/store';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from './ui/card';
import { convertDate, daysInWeek, getWeatherDescription } from '@/lib/utils';

import { orbitron } from './ui/fonts';
import { getWeatherDesc } from '@/lib/weathercodes';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

import WeekCard from './WeekCard';

const FeaturedLocationWeather = ({ className }) => {
    const locations = useWeatherStore((store) => store.locations);
    const [weatherData, setWeatherData] = useState(null);
    const primaryLocation = locations[0];

    // const { lat = 0, lng = 0 } = primaryLocation?.coordinates;

    const lat = primaryLocation?.coordinates.lat;
    const lng = primaryLocation?.coordinates.lng;

    useEffect(() => {
        if (locations.length === 0 && !lat && !lng) {
            return;
        }

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
    }, [lat, lng, locations]);

    if (!weatherData || !primaryLocation) {
        return;
    }

    // console.log('WEATHER DATA:::', weatherData);

    const locationName = primaryLocation.locationDetails.locality.long_name;
    const administrativeArea =
        primaryLocation.locationDetails.administrative_area_level_1.long_name;

    const today = new Date();
    const time = today.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        // hour12: false,
        hourCycle: 'h23',
        timeZone: weatherData.timezone,
    });
    const day = today.getDay();

    // console.log('day', day);

    const dateTimeInIso = convertDate(today);
    // console.log('dateTimeInIso', dateTimeInIso);

    const currentTimeIndex = weatherData?.hourly?.time?.indexOf(dateTimeInIso);
    // console.log('currentTimeIndex', currentTimeIndex);

    const currentTemp = Math.round(
        weatherData?.hourly.temperature_2m[currentTimeIndex]
    );

    const currentApparentTemp = Math.round(
        weatherData?.hourly.apparent_temperature[currentTimeIndex]
    );

    // console.log('currentApparentTemp', currentApparentTemp);

    const dayHigh = Math.round(weatherData?.daily.temperature_2m_max[0]);
    const dayLow = Math.round(weatherData?.daily.temperature_2m_min[0]);

    const sunrise = weatherData?.daily.sunrise[0];
    const sunset = weatherData?.daily.sunset[0];

    const dayWeatherCode = weatherData?.hourly.weather_code[currentTimeIndex];
    const dayWeatherDesc = getWeatherDesc(dayWeatherCode);

    // console.log('currentTemp', currentTemp);

    const hourlyData = (hours) => {
        const data = [];

        for (let i = 1; i <= hours; i++) {
            const temp = Math.round(
                weatherData?.hourly.temperature_2m[currentTimeIndex + i]
            );

            const apparentTemp = Math.round(
                weatherData?.hourly.apparent_temperature[currentTimeIndex + i]
            );

            const weatherCode =
                weatherData?.hourly.weather_code[currentTimeIndex + i];

            const hourData = {
                time: weatherData?.hourly.time[currentTimeIndex + i],
                temp: temp,
                apparentTemp: apparentTemp,
                weatherCode: weatherCode,
                dayWeatherDesc: getWeatherDesc(weatherCode),
            };
            data.push(hourData);
        }

        return data;
    };

    const nextTweleveHours = hourlyData(12);

    // console.log('nextTweleveHours::', nextTweleveHours);

    const MotionCard = motion(Card);

    return (
        <>
            <h1 className="text-2xl mt-16">Featured Location</h1>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border rounded-[2.5rem] p-5 pb-0 mt-8 ${className}`}>
                <ScrollArea
                    orientation="horizontal"
                    className="whitespace-nowrap">
                    <motion.div className="flex w-max gap-8 pb-5">
                        <Card className="bg-theme text-background rounded-3xl overflow-hidden min-w-[20%]">
                            <CardTitle className="font-normal p-6 flex items-center justify-between bg-accent/10 gap-x-16">
                                <span className="flex flex-col ">
                                    <span>{locationName}</span>
                                    <span className="text-sm tracking-wide opacity-50">
                                        {administrativeArea}
                                    </span>
                                </span>
                                <span className="flex flex-col">
                                    <span
                                        className={`${orbitron.className} font-light tracking-normal`}>
                                        {time}
                                    </span>
                                    <span className="text-sm tracking-wide opacity-50">
                                        {daysInWeek[day]}
                                    </span>
                                </span>
                            </CardTitle>
                            <CardContent className={`pt-4`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col">
                                        <span
                                            className={`${orbitron.className} font-light text-8xl tracking-normal`}>
                                            {currentTemp}&deg;
                                        </span>

                                        <span className="mt-4 text-xl capitalize">
                                            {dayWeatherDesc?.desc}
                                        </span>
                                    </div>

                                    <Image
                                        src={dayWeatherDesc?.icon}
                                        alt="Icon for the current weather"
                                        className=" object-contain ml-4 w-auto"
                                        width={100}
                                        height={100}
                                    />
                                </div>

                                <div className="mt-2">
                                    <span className=" opacity-70 text-sm">
                                        Feels Like{' '}
                                    </span>
                                    <span
                                        className={`${orbitron.className} font-light text-lg`}>
                                        {currentApparentTemp}&deg;
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <div>
                                            <span className=" opacity-70 text-sm">
                                                High:
                                            </span>{' '}
                                            <span
                                                className={`${orbitron.className} font-light text-lg`}>
                                                {dayHigh}&deg;
                                            </span>
                                        </div>

                                        <div>
                                            <span className=" opacity-70 text-sm">
                                                Low:
                                            </span>{' '}
                                            <span
                                                className={`${orbitron.className} font-light text-lg`}>
                                                {dayLow}&deg;
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <span className=" opacity-70 text-sm">
                                                Sunrise:
                                            </span>{' '}
                                            <span
                                                className={`${orbitron.className} font-light text-lg tracking-wider`}>
                                                {sunrise?.slice(-5)} AM
                                            </span>
                                        </div>

                                        <div>
                                            <span className=" opacity-70 text-sm">
                                                Sunset:
                                            </span>{' '}
                                            <span
                                                className={`${orbitron.className} font-light text-lg tracking-wider`}>
                                                {sunset?.slice(-5)} PM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {nextTweleveHours.map((hour) => {
                            const time = hour?.time?.slice(-5).slice(0, 2);
                            const formatedTime = () => {
                                const ampm = time < 12 ? 'A M' : 'P M';
                                let formated = time;

                                if (time === '00') {
                                    formated = 12;
                                } else if (time < 10) {
                                    formated = time.slice(1);
                                }

                                return `${formated % 12 || 12} ${ampm}`;
                            };
                            return (
                                <MotionCard
                                    className="flex flex-col bg-card-foreground/5 rounded-3xl overflow-hidden min-w-[150px]"
                                    key={hour.time}>
                                    <CardTitle className="font-normal p-5 flex justify-center bg-accent/20 text-base">
                                        <span
                                            className={`${orbitron.className} font-light tracking-normal`}>
                                            {formatedTime()}
                                        </span>
                                    </CardTitle>
                                    <CardContent
                                        className={`pt-4 px-12 py-6 flex flex-col gap-y-2 items-center justify-between h-full`}>
                                        <Image
                                            src={hour?.dayWeatherDesc?.icon}
                                            alt="Icon for the current weather"
                                            className=" object-contain mt-4 w-auto"
                                            width={60}
                                            height={60}
                                        />

                                        <div className="flex flex-col items-center">
                                            <span
                                                className={`${orbitron.className} mt-3 font-light text-5xl tracking-normal block relative`}>
                                                {hour.temp}
                                                <span className="absolute -right-5 top-0 block">
                                                    &deg;
                                                </span>
                                            </span>

                                            <span className="mt-4 text-sm capitalize text-foreground/60">
                                                feels like {hour?.apparentTemp}
                                                &deg;
                                            </span>
                                            <span className="text-sm capitalize text-foreground/40">
                                                {hour?.dayWeatherDesc?.desc}
                                            </span>
                                        </div>
                                    </CardContent>
                                </MotionCard>
                            );
                        })}
                    </motion.div>
                    <ScrollBar
                        className=" cursor-grab"
                        orientation="horizontal"
                    />
                </ScrollArea>
            </motion.div>

            <WeekCard weatherData={weatherData} className="mt-6 gap-8" />
        </>
    );
};

export default FeaturedLocationWeather;
