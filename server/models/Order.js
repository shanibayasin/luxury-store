const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  // Naya field yahan add kiya hai
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);