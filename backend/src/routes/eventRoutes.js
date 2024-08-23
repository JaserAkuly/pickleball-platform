// src/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/tournament', eventsController.createTournament);
router.get('/tournaments', eventsController.getTournaments);
router.post('/club', eventsController.createClub);
router.get('/clubs', eventsController.getClubs);
router.post('/league', eventsController.createLeague);
router.get('/leagues', eventsController.getLeagues);
router.post('/signup', eventsController.signUpForEvent);

module.exports = router;