import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from './ui/card';
import { daysInWeek } from '@/lib/utils';

import { orbitron } from './ui/fonts';
import { getWeatherDesc } from '@/lib/weathercodes';
import Image from 'next/image';

const WeekCard = ({ weatherData, className }) => {
    const MotionCard = motion(Card);

    return (
        <div className={`flex justify-between ${className}`}>
            {weatherData.daily.time.map((date, index) => {
                const formattedDate = date.split('-').join('/');
                const maxTemp = weatherData.daily.temperature_2m_max[index];
                const minTemp = weatherData.daily.temperature_2m_min[index];
                const weatherCode = weatherData.daily.weather_code[index];
                const icon = getWeatherDesc(weatherCode).icon;
                const desc = getWeatherDesc(weatherCode).desc;

                return (
                    <MotionCard
                        className="flex flex-col bg-card-foreground/5 rounded-3xl overflow-hidden flex-grow"
                        key={date}>
                        <CardTitle className="font-normal p-5 flex justify-center bg-accent/20 text-lg">
                            <span className={`font-light tracking-normal`}>
                                {daysInWeek[
                                    new Date(formattedDate).getDay()
                                ].slice(0, 3)}
                            </span>
                        </CardTitle>
                        <CardContent
                            className={`pt-4 flex flex-col items-center justify-between h-full`}>
                            <Image
                                src={icon}
                                alt="Icon for the current weather"
                                className=" object-contain mt-4 w-auto"
                                width={50}
                                height={50}
                            />

                            <div className="text-center mt-3">
                                <span className="text-sm capitalize text-foreground/60 mt-4 mb-2">
                                    {desc}
                                </span>

                                <div className="flex justify-between items-center">
                                    <span
                                        className={`${orbitron.className} font-light tracking-normal text-xl`}>
                                        {Math.round(minTemp)}
                                        &deg;
                                    </span>

                                    <span className=" h-[2px] w-10 bg-foreground/30 rounded-lg mx-4"></span>

                                    <span
                                        className={`${orbitron.className} font-light text-xl tracking-normal block relative`}>
                                        {Math.round(maxTemp)}
                                        &deg;
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </MotionCard>
                );
            })}
        </div>
    );
};

export default WeekCard;
