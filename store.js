import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const defaultState = [
    // {
    //     coordinates: { lat: 49.2628382, lng: -122.7810708 },
    //     locationDetails: {
    //         locality: {
    //             long_name: 'Port Coquitlam',
    //             short_name: 'Port Coquitlam',
    //             types: ['locality', 'political'],
    //         },
    //         administrative_area_level_1: {
    //             long_name: 'British Columbia',
    //             short_name: 'BC',
    //             types: ['administrative_area_level_1', 'political'],
    //         },
    //         country: {
    //             long_name: 'Canada',
    //             short_name: 'CA',
    //             types: ['country', 'political'],
    //         },
    //     },
    //     id: '6e0d57e0-5b31-4368-8733-98fece38bee9',
    // },
    // {
    //     coordinates: { lat: 25.2048493, lng: 55.2707828 },
    //     locationDetails: {
    //         locality: {
    //             long_name: 'Dubai',
    //             short_name: 'Dubai',
    //             types: ['locality', 'political'],
    //         },
    //         administrative_area_level_1: {
    //             long_name: 'Dubai',
    //             short_name: 'Dubai',
    //             types: ['administrative_area_level_1', 'political'],
    //         },
    //         country: {
    //             long_name: 'United Arab Emirates',
    //             short_name: 'AE',
    //             types: ['country', 'political'],
    //         },
    //     },
    //     id: '5e3dc1a9-495c-4ab3-bdae-b48c3313af6d',
    // },
    // {
    //     coordinates: { lat: 10.1710193, lng: 76.4468254 },
    //     locationDetails: {
    //         locality: {
    //             long_name: 'Kalady',
    //             short_name: 'Kalady',
    //             types: ['locality', 'political'],
    //         },
    //         administrative_area_level_1: {
    //             long_name: 'Kerala',
    //             short_name: 'KL',
    //             types: ['administrative_area_level_1', 'political'],
    //         },
    //         country: {
    //             long_name: 'India',
    //             short_name: 'IN',
    //             types: ['country', 'political'],
    //         },
    //     },
    //     id: '9475f612-4b51-497f-92a1-9853db902ec4',
    // },
    // {
    //     coordinates: { lat: -43.5320214, lng: 172.6305589 },
    //     locationDetails: {
    //         locality: {
    //             long_name: 'Christchurch',
    //             short_name: 'Christchurch',
    //             types: ['locality', 'political'],
    //         },
    //         administrative_area_level_1: {
    //             long_name: 'Canterbury',
    //             short_name: 'Canterbury',
    //             types: ['administrative_area_level_1', 'political'],
    //         },
    //         country: {
    //             long_name: 'New Zealand',
    //             short_name: 'NZ',
    //             types: ['country', 'political'],
    //         },
    //     },
    //     id: '45bc4e67-bb6e-4ac4-8cb4-49dacb24d447',
    // },
    // {
    //     coordinates: { lat: 25.354826, lng: 51.183884 },
    //     locationDetails: {
    //         country: {
    //             long_name: 'Qatar',
    //             short_name: 'QA',
    //             types: ['country', 'political'],
    //         },
    //     },
    //     id: '9caa5ab1-d9ca-4e95-8ffe-d668fce891c7',
    // },
];

export const useWeatherStore = create((set) => ({
    locations: [...defaultState],
    saveLocation: (location) =>
        set((state) => ({
            locations: [...state.locations, { ...location, id: uuidv4() }],
        })),
    saveAsPrimaryLocation: (location) =>
        set((state) => ({
            locations: [{ ...location, id: uuidv4() }, ...state.locations],
        })),
}));
