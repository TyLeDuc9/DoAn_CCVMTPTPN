const express = require('express');
const router = express.Router();
const uploadProduct = require("../middlewares/uploadProduct");
const productController = require('../controllers/productController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
router.post('/',verifyToken, verifyRole(['admin']),  uploadProduct.single("image_url"), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.get('/latest', productController.getLatestProduct);
router.get('/four/:categorySlug', productController.getFourProductsByCategorySlug);
router.get('/category/:categorySlug', productController.getProductByCategory);
router.get('/supplier/:supplierSlug', productController.getProductsBySupplierSlug);
router.get('/:slug', productController.getProductBySlug);
router.get('/:id', verifyToken, verifyRole(['admin']),  productController.getProductById);
router.put('/:id', verifyToken, verifyRole(['admin']),uploadProduct.single("image_url"), productController.updateProduct);
router.delete('/:id', verifyToken, verifyRole(['admin']), productController.deleteProduct);

module.exports = router;