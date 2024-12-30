const express = require('express');
const router = express.Router();
const { saveAddress, getAddresses, deleteAddress } = require('../controllers/addressController');

// Save address
router.post('/', saveAddress);

// Get all addresses
router.get('/', getAddresses);

// Delete address
router.delete('/:id', deleteAddress);

module.exports = router;
