const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
router.post('/', verifyToken, verifyRole(['admin']), supplierController.createSupplier);
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', verifyToken, verifyRole(['admin']), supplierController.updateSupplier);
router.delete('/:id',  verifyToken, verifyRole(['admin']), supplierController.deleteSupplier);

module.exports = router;