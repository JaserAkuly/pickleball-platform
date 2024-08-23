// src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/create', matchController.createMatch);
router.put('/:match_id/result', matchController.updateMatchResult);
router.get('/:match_id', matchController.getMatchDetails);

module.exports = router;