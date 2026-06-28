const Order = require('../models/Order');

// 1. Saare orders fetch karne ke liye (Admin Dashboard)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Orders fetch karne mein galti hui" });
    }
};

// 2. Order status update karne ke liye (Dropdown change par)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true } // Ye updated object wapas bhejta hai
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order nahi mila" });
        }

        res.json({ message: "Status update ho gaya!", order: updatedOrder });
    } catch (err) {
        res.status(500).json({ error: "Status update karne mein galti hui" });
    }
};