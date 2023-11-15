import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const daysInWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

//converts time to open meteo api format
export const convertDate = (dateObj) => {
    if (!dateObj) {
        return;
    }
    const year = dateObj?.getFullYear();
    const month = (dateObj?.getMonth() + 1).toString().padStart(2, '0');
    const date = dateObj?.getDate().toString().padStart(2, '0');
    const hour = dateObj?.getHours().toString().padStart(2, '0');
    const minute = '00';
    return `${year}-${month}-${date}T${hour}:${minute}`;
};

//weather code from open meteo api
export const getWeatherDescription = (weatherCode) => {
    const codes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'partly cloudy',
        3: 'overcast',
        45: 'Fog',
        48: 'depositing rime fog',
        51: 'Drizzle: Light intensity',
        53: 'Drizzle: moderate intensity',
        55: 'Drizzle: dense intensity',
        56: 'Freezing Drizzle: Light intensity',
        57: 'Freezing Drizzle: dense intensity',
        61: 'Rain: Slight intensity',
        63: 'Rain: moderate intensity',
        65: 'Rain: heavy intensity',
        66: 'Freezing Rain: Light intensity',
        67: 'Freezing Rain: heavy intensity',
        71: 'Snow fall: Slight intensity',
        73: 'Snow fall: moderate intensity',
        75: 'Snow fall: heavy intensity',
        77: 'Snow Grains',
        80: 'Rain showers: Slight',
        81: 'Rain showers: moderate',
        82: 'Rain showers: violent',
        85: 'Snow showers slight',
        86: 'Snow showers heavy',
        95: 'Thunderstorm: Slight or moderate',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };

    return codes[weatherCode];
};
