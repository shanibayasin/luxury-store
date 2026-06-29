const express = require('express');
const verify = require('../middleware/authMiddleware');
const router = express.Router();
const { getOrders, createOrder, updateStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', verify, updateStatus);

module.exports = router;