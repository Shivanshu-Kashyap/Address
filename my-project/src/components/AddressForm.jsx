import React, { useState } from 'react';
import { Home, Building2, MapPin } from 'lucide-react';
import { useAddressStore } from '../store/useAddressStore';
import { saveAddress } from '../api/addressApi';
export const AddressForm = ({ location, onSave }) => {
    const addAddress = useAddressStore((state) => state.addAddress);
    const [formData, setFormData] = useState({
      type: 'home',
      label: '',
      street: '',
      area: '',
      details: '',
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const newAddress = await saveAddress({
          ...formData,
          lat: location.lat,
          lng: location.lng,
          isFavorite: false,
        });
        addAddress(newAddress);  // Update state with new address
        onSave();  // Call onSave callback
      } catch (error) {
        console.error('Error saving address', error);
      }
    };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'home', icon: Home, label: 'Home' },
            { value: 'office', icon: Building2, label: 'Office' },
            { value: 'other', icon: MapPin, label: 'Other' },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, type: value }))}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${
                formData.type === value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {formData.type === 'other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., Friend's House"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          required
          value={formData.street}
          onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Street name, House number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Area/Locality
        </label>
        <input
          type="text"
          required
          value={formData.area}
          onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Area, City"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <textarea
          value={formData.details}
          onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Apartment number, landmark, etc."
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Address
      </button>
    </form>
  );
};
