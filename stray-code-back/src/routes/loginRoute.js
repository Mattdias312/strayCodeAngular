const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');
const encryptPassword = require('../middleware/encryptPassword');

router.post('/login', loginController.login);
router.post('/register', loginController.create);

module.exports = router;