const express = require('express')
const router = express.Router()

const questionarioController = require('../controller/questionarioController');

router.get('/questionario', questionarioController.getquestionario);
router.post('/questionario', questionarioController.create);
router.get('/questionario/:id', questionarioController.details);
router.put('/questionario/:id', questionarioController.updatequestionario);
router.delete('/questionario/:id', questionarioController.deletequestionario);

module.exports = router;