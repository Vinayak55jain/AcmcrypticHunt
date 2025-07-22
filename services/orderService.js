const Order = require("../model/order");

exports.ordering = async (data, restaurantName) => {
  if (!data) {
    throw new Error("No order data received");
  }

  const {
    tableId,
    customerId,
    customerName,
    customerPhone,
    orderItems,
    totalAmount,
    status
  } = data;

  if (!tableId || !orderItems || !totalAmount) {
    throw new Error("Missing required fields");
  }

  const order = new Order({
    orderId: `order-${Math.floor(1000 + Math.random() * 9000)}`,
    tableId,
    customerId,
    customerName,
    customerPhone,
    orderItems,
    totalAmount,
    status: status || "pending",
    restaurantName // ✅ restaurant scoping
  });

  await order.save();
  return {
    message: "Order placed successfully",
    order
  };
};


exports.getAllorder = async (restaurantName) => {
    try {
        const orders = await Order.find({ restaurantName });
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw new Error('Internal server error');
    }
};


exports.getCustomerorder = async (orderId, restaurantName) => {
    try {
        const order = await Order.findOne({ orderId, restaurantName });
        return order;
    } catch (error) {
        console.error('Error fetching order:', error.message);
        throw new Error('Failed to fetch order');
    }
};

exports.updateOrder = async (orderId, updateData, restaurantName) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId, restaurantName },
            updateData,
            { new: true }
        );
        return updatedOrder;
    } catch (error) {
        console.error("Error updating order:", error.message);
        throw new Error('Failed to update order');
    }
};

exports.deleteOrder = async (orderId, restaurantName) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId, restaurantName });
        if (!deletedOrder) {
            throw new Error('Order not found');
        }
        return deletedOrder;
    } catch (error) {
        console.error("Error deleting order:", error.message);
        throw new Error('Failed to delete order');
    }
};
