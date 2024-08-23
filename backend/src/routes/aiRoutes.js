// src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/report/:match_id', aiController.generateMatchReport);
router.get('/report/:match_id', aiController.getMatchReport);

module.exports = router;