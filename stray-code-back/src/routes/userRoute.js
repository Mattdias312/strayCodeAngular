const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateJWT = require('../middleware/authenticateJWT')

router.get('/login/:id', authenticateJWT, userController.details);
router.put('/login/:id', authenticateJWT, userController.updatePassword);
router.delete('/login/:id', authenticateJWT, userController.deleteUser);

module.exports = router;