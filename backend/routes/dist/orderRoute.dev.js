"use strict";

var express = require('express');

var router = express.Router();

var orderController = require('../controllers/orderController');

var _require = require('../middlewares/authMiddleware'),
    verifyToken = _require.verifyToken,
    verifyRole = _require.verifyRole;

router.get("/dashboard", orderController.getDashboardStats);
router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.get('/', verifyToken, verifyRole(['admin']), orderController.getAllOrders);
router.put('/:id/status', verifyToken, orderController.updateOrderStatus);
module.exports = router;