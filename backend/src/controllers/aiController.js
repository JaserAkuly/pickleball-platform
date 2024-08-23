// src/controllers/aiController.js
const openaiService = require('../services/openaiService');
const supabase = require('../config/supabase');

exports.generateMatchReport = async (req, res) => {
  const { match_id } = req.params;
  try {
    // Fetch match details
    const { data: matchData, error: matchError } = await supabase
      .from('matches')
      .select('*, player1:player1_id(*), player2:player2_id(*)')
      .eq('id', match_id)
      .single();
    
    if (matchError) throw matchError;

    // Generate report using OpenAI
    const report = await openaiService.generateMatchReport(matchData);

    // Save report to database
    const { data: reportData, error: reportError } = await supabase
      .from('match_reports')
      .insert({ match_id, report });

    if (reportError) throw reportError;

    res.status(200).json({ message: 'Match report generated successfully', report: reportData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMatchReport = async (req, res) => {
  const { match_id } = req.params;
  try {
    const { data, error } = await supabase
      .from('match_reports')
      .select('*')
      .eq('match_id', match_id)
      .single();
    
    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};