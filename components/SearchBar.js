'use client';
import { useJsApiLoader } from '@react-google-maps/api';
import PlacesAutoComplete from './PlacesAutocomplete';

const libraries = ['places'];
const SearchBar = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY,
        libraries: libraries,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <PlacesAutoComplete />;
};

export default SearchBar;
