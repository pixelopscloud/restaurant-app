const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true },
  items: [{ 
    menuItemId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered'], default: 'pending' },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);