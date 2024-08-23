// src/controllers/tournamentController.js
const supabase = require('../config/supabase');

exports.createTournament = async (req, res) => {
  const { name, start_date, end_date, location, organizer_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .insert({ name, start_date, end_date, location, organizer_id });
    
    if (error) throw error;
    
    res.status(201).json({ message: 'Tournament created successfully', tournament: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTournamentDetails = async (req, res) => {
  const { tournament_id } = req.params;
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*, organizer:organizer_id(*), matches(*)')
      .eq('id', tournament_id)
      .single();
    
    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTournament = async (req, res) => {
  const { tournament_id } = req.params;
  const { name, start_date, end_date, location } = req.body;
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .update({ name, start_date, end_date, location })
      .eq('id', tournament_id);
    
    if (error) throw error;
    
    res.status(200).json({ message: 'Tournament updated successfully', tournament: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerPlayer = async (req, res) => {
  const { tournament_id } = req.params;
  const { player_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('tournament_players')
      .insert({ tournament_id, player_id });
    
    if (error) throw error;
    
    res.status(201).json({ message: 'Player registered successfully', registration: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};