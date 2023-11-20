'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { daysInWeek } from '@/lib/utils';

import { getWeatherDesc } from '@/lib/weathercodes';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { orbitron } from '@/components/ui/fonts';
import { useWeatherStore } from '@/store';

const LocationModal = ({ searchParams, params }) => {
    const router = useRouter();
    const saveUserLocation = useWeatherStore((store) => store.saveLocation);
    const savePrimaryLocation = useWeatherStore(
        (store) => store.saveAsPrimaryLocation
    );

    const [open, setOpen] = useState(true);
    const [weatherData, setWeatherData] = useState(null);

    const handleModal = () => {
        if (open) {
            setOpen(false);
            router.back();
        } else {
            setOpen(true);
        }
    };

    const { lat, lng, country, area, locationDetails } = searchParams;
    console.log('searchParams, params', lat, lng, params, locationDetails);

    useEffect(() => {
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
        };

        getData();
    }, [lat, lng]);

    // console.log('weather data', weatherData);

    if (!weatherData) {
        return;
    }

    console.log('weather dataaaaa', weatherData);

    const today = weatherData?.hourly?.time[0].slice(0, 10);
    const time = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        // hour12: false,
        hourCycle: 'h23',
        timeZone: weatherData.timezone,
    });
    // const day = new Date(today).getDay();
    const day = new Date(today)
        .toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'long',
            hourCycle: 'h23',
            timeZone: weatherData.timezone,
        })
        .slice(0, -5);

    console.log('today', today);
    console.log('day', day);

    const hour = time.slice(0, 2);
    const minute = '00';
    const dateTimeInIso = `${today}T${hour}:${minute}`;

    // const dateTimeInIso = convertDate(new Date());
    // console.log('dateTimeInIso', dateTimeInIso);

    const currentTimeIndex = weatherData?.hourly?.time?.indexOf(dateTimeInIso);
    // console.log('currentTimeIndex', currentTimeIndex);

    const currentTemp = Math.round(
        weatherData?.hourly?.temperature_2m[currentTimeIndex]
    );

    const currentApparentTemp = Math.round(
        weatherData?.hourly?.apparent_temperature[currentTimeIndex]
    );

    // console.log('currentApparentTemp', currentApparentTemp);

    const dayHigh = Math.round(weatherData?.daily?.temperature_2m_max[0]);
    const dayLow = Math.round(weatherData?.daily?.temperature_2m_min[0]);

    const sunrise = weatherData?.daily?.sunrise[0];
    const sunset = weatherData?.daily?.sunset[0];

    const dayWeatherCode = weatherData?.hourly?.weather_code[currentTimeIndex];
    const dayWeatherDesc = getWeatherDesc(dayWeatherCode);

    // console.log('currentTemp', currentTemp);

    const hourlyData = (hours) => {
        const data = [];

        for (let i = 1; i <= hours; i++) {
            const temp = Math.round(
                weatherData?.hourly?.temperature_2m[currentTimeIndex + i]
            );

            const apparentTemp = Math.round(
                weatherData?.hourly?.apparent_temperature[currentTimeIndex + i]
            );

            const weatherCode =
                weatherData?.hourly?.weather_code[currentTimeIndex + i];

            const hourData = {
                time: weatherData?.hourly?.time[currentTimeIndex + i],
                temp: temp,
                apparentTemp: apparentTemp,
                weatherCode: weatherCode,
                dayWeatherDesc: getWeatherDesc(weatherCode),
            };
            data.push(hourData);
        }

        return data;
    };

    const nextTweleveHours = hourlyData(16);

    console.log('dayWeatherDesc::', dayWeatherDesc);

    const details = JSON.parse(locationDetails);

    const saveLocation = () => {
        saveUserLocation({
            coordinates: {
                lat,
                lng,
            },
            locationDetails: {
                ...details,
            },
        });
    };

    const saveAsPrimary = () => {
        savePrimaryLocation({
            coordinates: {
                lat,
                lng,
            },
            locationDetails: {
                ...details,
            },
        });
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={handleModal} className="">
                <DialogContent className="max-w-[75vw] p-10 pt-16 border border-white">
                    <ScrollArea className="h-[70vh] rounded-md border-none overflow-hidden">
                        <div>
                            <div className="flex flex-col items-center justify-center">
                                {country && (
                                    <div className="uppercase tracking-wider text-lg opacity-95">
                                        {country}
                                    </div>
                                )}
                                <h1 className=" text-9xl font-extrabold">
                                    {decodeURI(params.city)}
                                </h1>
                                {area && area !== 'undefined' && (
                                    <div className="uppercase tracking-wider opacity-80 mt-5">
                                        {area}
                                    </div>
                                )}
                            </div>

                            <div className="lg:max-w-[65vw] mx-auto mt-20">
                                <div className="border rounded-lg p-5 ">
                                    <Card className="bg-theme text-background rounded-3xl overflow-hidden min-w-[20%]">
                                        <CardTitle className="font-normal p-6 flex items-center justify-between bg-accent/10 gap-x-16">
                                            <span className="flex flex-col ">
                                                {day}
                                                <span className="text-sm tracking-wide opacity-50">
                                                    {/* {administrativeArea} */}
                                                </span>
                                            </span>
                                            <span className="flex flex-col">
                                                <span
                                                    className={`${orbitron.className} font-light tracking-normal`}>
                                                    {time}
                                                </span>
                                            </span>
                                        </CardTitle>
                                        <CardContent className={`pt-4`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col">
                                                    <span
                                                        className={`${orbitron.className} font-light text-8xl tracking-normal`}>
                                                        {currentTemp}
                                                        &deg;
                                                    </span>

                                                    <span className="mt-4 text-xl capitalize">
                                                        {dayWeatherDesc?.desc}
                                                    </span>
                                                </div>

                                                {dayWeatherDesc && (
                                                    <Image
                                                        src={
                                                            dayWeatherDesc?.icon
                                                        }
                                                        alt="Icon for the current weather"
                                                        className=" object-contain ml-4 w-auto"
                                                        width={100}
                                                        height={100}
                                                    />
                                                )}
                                            </div>

                                            <div className="mt-2">
                                                <span className=" opacity-70 text-sm">
                                                    Feels Like{' '}
                                                </span>
                                                <span
                                                    className={`${orbitron.className} font-light text-lg`}>
                                                    {currentApparentTemp}
                                                    &deg;
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
                                                            {dayHigh}
                                                            &deg;
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className=" opacity-70 text-sm">
                                                            Low:
                                                        </span>{' '}
                                                        <span
                                                            className={`${orbitron.className} font-light text-lg`}>
                                                            {dayLow}
                                                            &deg;
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
                                                            {sunrise?.slice(-5)}{' '}
                                                            AM
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className=" opacity-70 text-sm">
                                                            Sunset:
                                                        </span>{' '}
                                                        <span
                                                            className={`${orbitron.className} font-light text-lg tracking-wider`}>
                                                            {sunset?.slice(-5)}{' '}
                                                            PM
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <ScrollArea
                                    orientation="horizontal"
                                    className="whitespace-nowrap">
                                    <div className="flex gap-4 pb-5 mt-8">
                                        {nextTweleveHours.map((hour) => {
                                            const time = hour?.time
                                                ?.slice(-5)
                                                .slice(0, 2);
                                            const formatedTime = () => {
                                                const ampm =
                                                    time < 12 ? 'A M' : 'P M';
                                                let formated = time;

                                                if (time === '00') {
                                                    formated = 12;
                                                } else if (time < 10) {
                                                    formated = time.slice(1);
                                                }

                                                return `${
                                                    formated % 12 || 12
                                                } ${ampm}`;
                                            };
                                            return (
                                                <Card
                                                    className="flex flex-col bg-card-foreground/5 rounded-3xl overflow-hidden min-w-[150px]"
                                                    key={hour.time}>
                                                    <CardTitle className="font-normal p-3 flex justify-center bg-accent/20 text-base">
                                                        <span
                                                            className={`${orbitron.className} font-light tracking-normal`}>
                                                            {formatedTime()}
                                                        </span>
                                                    </CardTitle>
                                                    <CardContent
                                                        className={`pt-4 px-6 py-6 flex flex-col gap-y-2 items-center justify-between h-full`}>
                                                        <Image
                                                            src={
                                                                hour
                                                                    .dayWeatherDesc
                                                                    .icon
                                                            }
                                                            alt="Icon for the current weather"
                                                            className=" object-contain w-auto"
                                                            width={30}
                                                            height={30}
                                                        />

                                                        <div className="flex flex-col items-center">
                                                            <span
                                                                className={`${orbitron.className} mt-3 font-light text-3xl tracking-normal block relative`}>
                                                                {hour.temp}
                                                                <span className="absolute -right-5 top-0 block">
                                                                    &deg;
                                                                </span>
                                                            </span>

                                                            <span className="mt-4 text-sm capitalize text-foreground/60">
                                                                feels like{' '}
                                                                {
                                                                    hour?.apparentTemp
                                                                }
                                                                &deg;
                                                            </span>
                                                            <span className="text-sm capitalize text-foreground/40">
                                                                {
                                                                    hour
                                                                        ?.dayWeatherDesc
                                                                        ?.desc
                                                                }
                                                            </span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                    <ScrollBar
                                        className=" cursor-grab"
                                        orientation="horizontal"
                                    />
                                </ScrollArea>

                                <div className="mt-8">
                                    {weatherData?.daily?.time?.map(
                                        (date, index) => {
                                            const formattedDate = date
                                                .split('-')
                                                .join('/');
                                            const maxTemp =
                                                weatherData.daily
                                                    .temperature_2m_max[index];
                                            const minTemp =
                                                weatherData.daily
                                                    .temperature_2m_min[index];
                                            const weatherCode =
                                                weatherData.daily.weather_code[
                                                    index
                                                ];
                                            const icon =
                                                getWeatherDesc(
                                                    weatherCode
                                                ).icon;
                                            const desc =
                                                getWeatherDesc(
                                                    weatherCode
                                                ).desc;

                                            return (
                                                <Card
                                                    className=" rounded-xl py-2 px-6 overflow-hidden mb-4"
                                                    key={date}>
                                                    <CardContent
                                                        className={`p-0 flex items-center justify-between`}>
                                                        <span
                                                            className={`font-light tracking-normal flex-grow w-1/5`}>
                                                            {daysInWeek[
                                                                new Date(
                                                                    formattedDate
                                                                ).getDay()
                                                            ].slice(0, 3)}
                                                        </span>

                                                        <div className="flex-grow flex  w-1/5">
                                                            <Image
                                                                src={icon}
                                                                alt="Icon for the current weather"
                                                                className=" object-contain w-auto"
                                                                width={30}
                                                                height={30}
                                                            />
                                                        </div>

                                                        <span className="text-sm capitalize text-foreground/60 flex-grow flex justify-center w-1/5">
                                                            {desc}
                                                        </span>

                                                        <div className="text-center flex-grow w-2/5">
                                                            <div className="flex justify-end items-center">
                                                                <span
                                                                    className={`${orbitron.className} font-light tracking-normal text-xl`}>
                                                                    {Math.round(
                                                                        minTemp
                                                                    )}
                                                                    &deg;
                                                                </span>

                                                                <span className=" h-[2px] w-10 bg-foreground/30 rounded-lg mx-4"></span>

                                                                <span
                                                                    className={`${orbitron.className} font-light text-xl tracking-normal block relative`}>
                                                                    {Math.round(
                                                                        maxTemp
                                                                    )}
                                                                    &deg;
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        {/* <DialogTrigger asChild> */}
                        <Button variant="outline" onClick={saveLocation}>
                            SAVE LOCATION
                        </Button>
                        <Button variant="outline" onClick={saveAsPrimary}>
                            SAVE AS FEATURED LOCATION
                        </Button>
                        {/* </DialogTrigger> */}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LocationModal;
