const Address = require('../models/Address');

// Save a new address
const saveAddress = async (req, res) => {
  try {
    const { type, label, street, area, details, lat, lng, isFavorite } = req.body;
    const newAddress = new Address({ type, label, street, area, details, lat, lng, isFavorite });
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save address' });
  }
};

// Get all addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch addresses' });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Address deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete address' });
  }
};

module.exports = { saveAddress, getAddresses, deleteAddress };
