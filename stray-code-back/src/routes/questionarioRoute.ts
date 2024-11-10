import express from 'express';
import questionarioController from '../controller/questionarioController';
import authenticateJWT from '../middleware/authenticateJWT';

const router = express.Router();

router.get('/questionario', authenticateJWT, questionarioController.getQuestionario);
router.post('/questionario', authenticateJWT, questionarioController.create);
router.get('/questionario/:id', authenticateJWT, questionarioController.details);
router.put('/questionario/:id', authenticateJWT, questionarioController.updateQuestionario);
router.delete('/questionario/:id', authenticateJWT, questionarioController.deleteQuestionario);

export default router;


// const express = require('express')
// const router = express.Router()

// const questionarioController = require('../controller/questionarioController');
// const authenticateJWT = require('../middleware/authenticateJWT');

// router.get('/questionario', authenticateJWT, questionarioController.getquestionario);
// router.post('/questionario', authenticateJWT, questionarioController.create);
// router.get('/questionario/:id', authenticateJWT, questionarioController.details);
// router.put('/questionario/:id', authenticateJWT, questionarioController.updatequestionario);
// router.delete('/questionario/:id', authenticateJWT, questionarioController.deletequestionario);

// module.exports = router;