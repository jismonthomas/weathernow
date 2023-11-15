'use client';
import { useRef } from 'react';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useWeatherStore } from '@/store';
import { useRouter } from 'next/navigation';

const PlacesAutoComplete = () => {
    const router = useRouter();
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: 'isLoaded',
        requestOptions: {
            /* Define search scope here */
            types: ['(regions)'],
            // types: ['(cities)'],
        },
        debounce: 300,
    });

    const saveUserLocation = useWeatherStore((store) => store.saveLocation);

    const ref = useRef();

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
        () => {
            // When the user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({ address: description }).then((results) => {
                // console.log('results', results);

                const { lat, lng } = getLatLng(results[0]);

                let locationDetails = {};

                results[0]?.address_components.forEach((address) => {
                    if (address.types.includes('country')) {
                        locationDetails = {
                            ...locationDetails,
                            country: address,
                        };
                    }

                    if (address.types.includes('locality')) {
                        locationDetails = {
                            ...locationDetails,
                            locality: address,
                        };
                    }

                    if (address.types.includes('administrative_area_level_1')) {
                        locationDetails = {
                            ...locationDetails,
                            administrative_area_level_1: address,
                        };
                    }
                });

                console.log('locationDetails ', lat, lng, locationDetails);

                // saveUserLocation({
                //     coordinates: {
                //         lat,
                //         lng,
                //     },
                //     locationDetails,
                // });

                let locality = locationDetails.locality?.long_name
                    ? locationDetails.locality.long_name
                    : locationDetails.administrative_area_level_1?.long_name;

                if (!locality) {
                    locality = locationDetails.country?.long_name;
                }

                const country = locationDetails.country?.long_name;
                const area =
                    locationDetails.administrative_area_level_1?.long_name;

                const allDetails = JSON.stringify(locationDetails);

                router.push(
                    `weather/${locality}?lat=${lat}&lng=${lng}&country=${country}&area=${area}&locationDetails=${allDetails}`
                );

                // console.log('📍 Coordinates: ', { lat, lng });
            });
        };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <div
                    className="px-2 py-1.5 rounded-sm hover:text-accent-foreground hover:bg-black/20 cursor-pointer"
                    key={place_id}
                    onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </div>
            );
        });

    return (
        <div
            ref={ref}
            className="border rounded-lg  shadow-md relative min-w-[min(50vw,1500px)]">
            <div className="flex items-center h-11 px-3 ">
                <Search className="h-4 opacity-50" />
                <Input
                    className="border-none py-3 focus-visible:ring-0 bg-transparent rounded-none focus-visible:ring-offset-0"
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search location..."
                />
            </div>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === 'OK' && (
                <div className="flex flex-col px-2 py-1.5 -mt-[1px] border-t w-full absolute z-10 bg-accent rounded-lg shadow-lg top-12">
                    <span className="font-medium text-xs text-muted-foreground py-1.5">
                        Suggestions
                    </span>
                    {renderSuggestions()}
                </div>
            )}
        </div>
    );
};

export default PlacesAutoComplete;
