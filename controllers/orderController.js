const orderService = require('../services/orderService.js');

exports.ordering = async (req, res) => {
    try {
        const order = await orderService.ordering(req.body, req.restaurantName); // ✅ Pass context
        res.status(201).json(order);
    } catch (error) {
        console.log("error in ordering ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getAllorder = async (req, res) => {
    try {
        const orders = await orderService.getAllorder(req.restaurantName); // ✅ Scoped fetch
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.customerorder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) return res.status(400).json({ message: "Missing orderId" });

        const order = await orderService.getCustomerorder(orderId, req.restaurantName); // ✅ Scoped
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;
        if (!orderId || !updateData) return res.status(400).json({ message: "Missing data" });

        const updatedOrder = await orderService.updateOrder(orderId, updateData, req.restaurantName); // ✅ Scoped
        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!orderId) return res.status(400).json({ message: "Missing orderId" });

        const deletedOrder = await orderService.deleteOrder(orderId, req.restaurantName); // ✅ Scoped
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        console.error("Error deleting order:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

    