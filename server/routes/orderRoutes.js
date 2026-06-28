const express = require('express');
const router = express.Router();
const { getOrders, updateStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.put('/:id', updateStatus);

module.exports = router;