const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');

router.post('/',verifyToken, verifyRole(['admin']),   categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', verifyToken, verifyRole(['admin']), categoryController.updateCategory);
router.delete('/:id', verifyToken, verifyRole(['admin']), categoryController.deleteCategory);

module.exports = router;