import React, { useState, useCallback } from 'react';
import { MapPin, List } from 'lucide-react';
import { LocationPermissionModal } from './components/LocationPermissionModal';
import { Map } from './components/Map';
import { AddressForm } from './components/AddressForm';
import { AddressList } from './components/AddressList';
import { useAddressStore } from './store/useAddressStore';

function App() {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);  // No type annotation in JS
  
  const setCurrentLocation = useAddressStore((state) => state.setCurrentLocation);

  const handleEnableLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          setShowPermissionModal(false);
        },
        () => {
          // Handle error or rejection
          setShowPermissionModal(false);
        }
      );
    }
  }, [setCurrentLocation]);

  const handleManualSearch = useCallback(() => {
    setShowPermissionModal(false);
  }, []);

  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location);
    setShowAddressForm(true);
  }, []);

  const handleSaveAddress = useCallback(() => {
    setShowAddressForm(false);
    setSelectedLocation(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Address Manager
            </h1>
            <button
              onClick={() => setShowAddressList(!showAddressList)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <List className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Map onLocationSelect={handleLocationSelect} />
          
          {showAddressForm && selectedLocation && (
            <div className="p-6">
              <AddressForm
                location={selectedLocation}
                onSave={handleSaveAddress}
              />
            </div>
          )}
        </div>

        {showAddressList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <button
                    onClick={() => setShowAddressList(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <AddressList />
              </div>
            </div>
          </div>
        )}
      </main>

      {showPermissionModal && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onManualSearch={handleManualSearch}
        />
      )}
    </div>
  );
}

export default App;
