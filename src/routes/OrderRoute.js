const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

router.post('/place_order', orderController.placeOrder);
router.get('/order_history/:user_id', orderController.getOrderHistory);
router.get('/order_products/:order_id', orderController.getOrderProducts);

module.exports = router;
