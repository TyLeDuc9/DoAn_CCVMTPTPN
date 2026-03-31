const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  products: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    quantity: { 
      type: Number, 
      default: 1 
    },
    price: Number
  }],
  total_amount: Number,
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  shippingAddressId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Address' 
  },
  payment_method: { 
    type: String, 
    enum: ['Code', 'VNPAY'], 
    default: 'Code' 
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);