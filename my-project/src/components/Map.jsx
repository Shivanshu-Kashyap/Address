import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useAddressStore } from '../store/useAddressStore';
import { GOOGLE_MAPS_API_KEY } from '../config/maps';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 40.7128,  // Default latitude (New York City)
  lng: -74.0060  // Default longitude (New York City)
};

export const Map = ({ onLocationSelect }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const currentLocation = useAddressStore((state) => state.currentLocation);

  // On map load, set the map instance
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  // On map unload, clean up the state
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Handle map click event and place a marker
  const handleMapClick = (e) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setMarker(location);
      onLocationSelect(location);  // Pass the location to the parent component
    }
  };

  // Get the current location from the browser's geolocation API
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setMarker(location);
        onLocationSelect(location);  // Pass the location to parent component
        if (map) {
          map.panTo(location);  // Center the map on the new location
        }
      }, (error) => {
        console.error(error);
        alert('Error getting location. Please try again.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Update the map if currentLocation is available in the store
  useEffect(() => {
    if (currentLocation && map) {
      map.panTo(currentLocation);
      setMarker(currentLocation);
      onLocationSelect(currentLocation);  // Pass the location to parent component
    }
  }, [currentLocation, map, onLocationSelect]);

  // Error handling for Google Maps loading failure
  if (loadError) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error loading Google Maps. Please check your API key configuration.
      </div>
    );
  }

  // Wait until the map is loaded
  if (!isLoaded) {
    return (
      <div className="p-4 text-gray-600">
        Loading map...
      </div>
    );
  }

  return (
    <div>
      <button 
        onClick={handleGetLocation} 
        style={{ margin: '10px', padding: '10px' }}>
        Get Current Location
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || defaultCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};
