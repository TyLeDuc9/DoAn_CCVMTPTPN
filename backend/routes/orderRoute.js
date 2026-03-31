const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
router.get("/dashboard", orderController.getDashboardStats);
router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.get('/', verifyToken, verifyRole(['admin']), orderController.getAllOrders);
router.put('/:id/status', verifyToken, orderController.updateOrderStatus);

module.exports = router;