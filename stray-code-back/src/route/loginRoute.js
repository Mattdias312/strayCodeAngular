const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController');

router.get('/login', loginController.getLogin);
router.post('/login', loginController.create);
router.get('/login/:id', loginController.details);
router.put('/login/:id', loginController.updatePassword);
router.delete('/login/:id', loginController.deleteLogin);

module.exports = router;