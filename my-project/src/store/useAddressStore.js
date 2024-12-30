import { create } from 'zustand';

export const useAddressStore = create((set) => ({
  addresses: [],
  currentLocation: null,
  selectedAddress: null,

  // Add a new address to the store
  addAddress: (address) => set((state) => ({
    addresses: [...state.addresses, { ...address, id: crypto.randomUUID() }]
  })),

  // Update an existing address by its ID
  updateAddress: (id, updatedAddress) => set((state) => ({
    addresses: state.addresses.map((addr) =>
      addr.id === id ? { ...addr, ...updatedAddress } : addr
    )
  })),

  // Delete an address by its ID
  deleteAddress: (id) => set((state) => ({
    addresses: state.addresses.filter((addr) => addr.id !== id)
  })),

  // Set the current location
  setCurrentLocation: (location) => set({ currentLocation: location }),

  // Set the selected address
  setSelectedAddress: (address) => set({ selectedAddress: address }),

  // Toggle the favorite status of an address
  toggleFavorite: (id) => set((state) => ({
    addresses: state.addresses.map((addr) =>
      addr.id === id ? { ...addr, isFavorite: !addr.isFavorite } : addr
    )
  }))
}));
