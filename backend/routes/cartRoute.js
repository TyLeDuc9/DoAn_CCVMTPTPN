const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
router.get('/', verifyToken, cartController.getCartByUser);
router.get('/all',  cartController.getAllCarts);
router.post('/add', verifyToken, cartController.addToCart);
router.put('/update', verifyToken, cartController.updateCartItem);
router.delete('/remove/:productId', verifyToken, cartController.removeCartItem);

module.exports = router;