const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const authenticateJWT = require('../middleware/authenticateJWT')

router.post('/login', loginController.login);
router.post('/create', loginController.create);
router.get('/login/:id', authenticateJWT, loginController.details);
router.put('/login/:id', authenticateJWT, loginController.updatePassword);
router.delete('/login/:id', authenticateJWT, loginController.deleteLogin);

module.exports = router;