// src/controllers/matchController.js
const supabase = require('../config/supabase');
const duprService = require('../services/duprService');

exports.createMatch = async (req, res) => {
  const { player1_id, player2_id, tournament_id } = req.body;
  try {
    const { data, error } = await supabase
      .from('matches')
      .insert({ player1_id, player2_id, tournament_id, status: 'scheduled' });
    
    if (error) throw error;
    
    res.status(201).json({ message: 'Match created successfully', match: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMatchResult = async (req, res) => {
  const { match_id } = req.params;
  const { winner_id, score } = req.body;
  try {
    const { data, error } = await supabase
      .from('matches')
      .update({ winner_id, score, status: 'completed' })
      .eq('id', match_id);
    
    if (error) throw error;
    
    // Update DUPR ratings
    await duprService.updateRatings(data);
    
    res.status(200).json({ message: 'Match result updated successfully', match: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMatchDetails = async (req, res) => {
  const { match_id } = req.params;
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*, player1:player1_id(*), player2:player2_id(*)')
      .eq('id', match_id)
      .single();
    
    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};