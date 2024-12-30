import axios from 'axios';

const API_URL = 'http://localhost:5000/api/addresses';

export const saveAddress = async (address) => {
  try {
    const response = await axios.post(API_URL, address);
    return response.data;
  } catch (err) {
    console.error('Failed to save address:', err);
    throw err;
  }
};

export const fetchAddresses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch addresses:', err);
    throw err;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error('Failed to delete address:', err);
    throw err;
  }
};
