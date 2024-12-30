import React, { useEffect, useState } from 'react';
import { Home, Building2, MapPin, Star, Trash2 } from 'lucide-react';
import { fetchAddresses, deleteAddress as deleteAddressApi } from '../api/addressApi';

export const AddressList = () => {
  const [addresses, setAddresses] = useState([]);  // State to store addresses fetched from API

  // Fetch addresses from the API when the component mounts
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const fetchedAddresses = await fetchAddresses();
        setAddresses(fetchedAddresses);  // Set addresses in state
      } catch (error) {
        console.error('Error fetching addresses', error);
      }
    };
    loadAddresses();
  }, []);

  // Define the getIcon function for address types
  const getIcon = (type) => {
    switch (type) {
      case 'home':
        return Home;
      case 'office':
        return Building2;
      default:
        return MapPin;  // Default to MapPin for other types
    }
  };

  // Handle address deletion
  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddressApi(id); // Call API to delete address
      // Remove from state after successful deletion
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  // Handle toggling the favorite status of an address
  const toggleFavorite = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, isFavorite: !address.isFavorite } // Toggle the favorite status
          : address
      )
    );
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const Icon = getIcon(address.type);

        return (
          <div
            key={address.id}
            className="bg-white rounded-lg shadow p-4 flex items-start gap-4"
          >
            <div className="flex-shrink-0">
              <Icon className="w-6 h-6 text-gray-500" />
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <h3 className="font-medium capitalize">
                  {address.type === 'other' ? address.label : address.type}
                </h3>
                {address.isFavorite && (
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                )}
              </div>

              <p className="text-gray-600 text-sm mt-1">{address.street}</p>
              <p className="text-gray-600 text-sm">{address.area}</p>
              {address.details && (
                <p className="text-gray-500 text-sm mt-1">{address.details}</p>
              )}
            </div>

            <div className="flex-shrink-0 space-x-2">
              {/* Star button to toggle favorite status */}
              <button
                onClick={() => toggleFavorite(address.id)} // Toggle favorite status
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Star
                  className={`w-5 h-5 ${
                    address.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Delete button */}
              <button
                onClick={() => handleDeleteAddress(address.id)} // Use the delete handler
                className="p-2 hover:bg-gray-100 rounded-full text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}

      {addresses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No saved addresses yet</p>
        </div>
      )}
    </div>
  );
};
