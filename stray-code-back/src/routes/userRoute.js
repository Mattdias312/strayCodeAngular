const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const encryptPassword = require('../middleware/encryptPassword');

router.get('/user/:id', authenticateJWT, userController.details);
router.put('/user/:id', authenticateJWT, encryptPassword, userController.updatePassword);
router.delete('/user/:id', authenticateJWT, userController.deleteUser);

module.exports = router;