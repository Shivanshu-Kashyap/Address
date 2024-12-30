const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['home', 'office', 'other'],
  },
  label: {
    type: String,
    required: function () { return this.type === 'other'; }
  },
  street: { type: String, required: true },
  area: { type: String, required: true },
  details: { type: String, default: '' },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Address', addressSchema);
