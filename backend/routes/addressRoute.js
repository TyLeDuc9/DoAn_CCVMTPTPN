const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');

// CRUD
router.post('/', verifyToken, addressController.createAddress);
router.get('/all',  addressController.getAllAddresses);
router.get('/', verifyToken, addressController.getMyAddresses);
router.get('/:id', verifyToken, addressController.getAddressById);
router.put('/:id', verifyToken, addressController.updateAddress);
router.delete('/:id', verifyToken, addressController.deleteAddress);

// set default
router.put('/default/:id', verifyToken, addressController.setDefaultAddress);

module.exports = router;