const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true }, // to scope order to a restaurant
    orderId: { type: String, required: true }, // unique within restaurant
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'delivered', 'paid'],
        default: 'pending'
    },
    tableId: { type: String, required: true },
    customerId: { type: String },
    customerName: { type: String },
    customerPhone: { type: String },

    orderItems: [
        {
            itemId: { type: String, required: true },
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            status: {
                type: String,
                enum: ['pending', 'preparing', 'ready', 'delivered'],
                default: 'pending'
            }
        }
    ],

    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

orderSchema.index({ restaurantName: 1, orderId: 1 }, { unique: true });

module.exports = mongoose.model("Order", orderSchema);
