const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController');

router.get('/tutoriais', (req, res) => {
  tutorialController.listarTutoriais(req, res);
});

router.get('/tutoriais/:id', (req, res) => {
  tutorialController.obterTutorialPorId(req, res);
});

module.exports = router;

