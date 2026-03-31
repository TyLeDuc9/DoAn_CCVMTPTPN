const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
router.get("/me", verifyToken, userController.getMeUser);
router.get("/", verifyToken,verifyRole('admin'), userController.getAllUsers);
router.put('/change-password', verifyToken, userController.changePassword);
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;