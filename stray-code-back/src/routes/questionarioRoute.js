const express = require('express')
const router = express.Router()

const questionarioController = require('../controller/questionarioController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/questionario', authenticateJWT, questionarioController.getquestionario);
router.post('/questionario', authenticateJWT, questionarioController.create);
router.get('/questionario/:id', authenticateJWT, questionarioController.details);
router.put('/questionario/:id', authenticateJWT, questionarioController.updatequestionario);
router.delete('/questionario/:id', authenticateJWT, questionarioController.deletequestionario);

module.exports = router;