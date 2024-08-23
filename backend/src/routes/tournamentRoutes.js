// src/routes/tournamentRoutes.js
const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

router.post('/create', tournamentController.createTournament);
router.get('/:tournament_id', tournamentController.getTournamentDetails);
router.put('/:tournament_id', tournamentController.updateTournament);
router.post('/:tournament_id/register', tournamentController.registerPlayer);

module.exports = router;