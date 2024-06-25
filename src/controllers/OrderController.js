const model = require('../models/OrderModel');

exports.placeOrder = async (req, res) => {
    console.log(req.body);
    const { product_id, user_id} = req.body;
    if (!product_id || !user_id) {
        res.status(400).json({
            status: 'error',
            message: 'Please provide all required fields'
        });
    } else {
        try {
            const result = await model.placeOrder(product_id, user_id, new Date());
            res.status(201).json({ message: `Order successfully placed` });
        } catch (err) {
            res.status(400).json({ message: 'Error placing order' });
        }
    }
};

exports.getOrderHistory = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const result = await model.getOrderHistory(user_id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching order history' });
    }
};

exports.getOrderProducts = async (req, res) => {
    const order_id = req.params.order_id;
    try {
        const result = await model.getOrderProducts(order_id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: 'Error fetching order products' });
    }
};

