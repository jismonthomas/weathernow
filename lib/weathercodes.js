import clearSky from '../components/ui/icons/clear-sky.png';
import cloudy from '../components/ui/icons/cloudy.png';

import rainLight from '../components/ui/icons/rain-light.png';
import rainModerate from '../components/ui/icons/rain-modarate.png';
import rainHigh from '../components/ui/icons/rain-high.png';

import snow from '../components/ui/icons/snow.png';
import freezingRain from '../components/ui/icons/freezing-rain.png';
import fog from '../components/ui/icons/fog.png';
import thunderstorm from '../components/ui/icons/thunderstorm.png';

export const getWeatherDesc = (weatherCode) => {
    const codes = {
        0: {
            desc: 'Clear sky',
            icon: clearSky,
        },
        1: {
            desc: 'Mainly clear',
            icon: clearSky,
        },
        2: {
            desc: 'partly cloudy',
            icon: cloudy,
        },
        3: {
            desc: 'overcast',
            icon: cloudy,
        },
        45: {
            desc: 'Fog',
            icon: fog,
        },
        48: {
            desc: 'Depositing Rime Fog',
            icon: fog,
        },
        51: {
            desc: 'Light Drizzle',
            icon: rainLight,
        },
        53: {
            desc: 'Moderate Drizzle',
            icon: rainModerate,
        },
        55: {
            desc: 'Dense Drizzle',
            icon: rainHigh,
        },
        56: {
            desc: 'Light Freezing Drizzle',
            icon: rainLight,
        },
        57: {
            desc: 'Dense Freezing Drizzle',
            icon: rainHigh,
        },
        61: {
            desc: 'Slight Rain',
            icon: rainHigh,
        },
        63: {
            desc: 'Moderate Rain',
            icon: rainModerate,
        },
        65: {
            desc: 'Heavy Rain',
            icon: rainHigh,
        },
        66: {
            desc: 'Light Freezing Rain',
            icon: freezingRain,
        },
        67: {
            desc: 'Heavy Freezing Rain',
            icon: freezingRain,
        },
        71: {
            desc: 'Slight Snow Fall',
            icon: snow,
        },
        73: {
            desc: 'Moderate Snow Fall',
            icon: snow,
        },
        75: {
            desc: 'Heavy Snow Fall',
            icon: snow,
        },
        77: {
            desc: 'Snow Grains',
            icon: snow,
        },
        80: {
            desc: 'Slight Rain Showers',
            icon: rainLight,
        },
        81: {
            desc: 'Moderate Rain Showers',
            icon: rainModerate,
        },
        82: {
            desc: 'Violent Rain Showers',
            icon: rainHigh,
        },
        85: {
            desc: 'Slight Snow Showers',
            icon: snow,
        },
        86: {
            desc: 'Heavy Snow Showers',
            icon: snow,
        },
        95: {
            desc: 'Thunderstorm',
            icon: thunderstorm,
        },
        96: {
            desc: 'Thunderstorm & Slight Hail',
            icon: thunderstorm,
        },
        99: {
            desc: 'Thunderstorm & Heavy Hail',
            icon: thunderstorm,
        },
    };

    return codes[weatherCode];
};
