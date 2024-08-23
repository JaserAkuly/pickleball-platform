// src/controllers/userController.js
const supabase = require('../config/supabase');

exports.signup = async (req, res) => {
  const { email, password, name, accountType } = req.body;
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    
    const { data, error: profileError } = await supabase
      .from('profiles')
      .insert({ 
        user_id: user.id, 
        name, 
        account_type: accountType,
        dupr_connected: false
      });
    
    if (profileError) throw profileError;
    
    res.status(201).json({ message: 'User created successfully', user: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (profileError) throw profileError;

    res.status(200).json({ message: 'Login successful', user: {...data.user, ...profile} });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { user, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name } = req.body; // Add any other fields you want to allow updating

    const { data, error } = await supabase
      .from('profiles')
      .update({ name })
      .eq('user_id', user.id)
      .select();
    
    if (error) throw error;
    
    res.status(200).json({ message: 'Profile updated successfully', profile: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { user, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) throw profileError;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.connectDUPR = async (req, res) => {
  try {
    const { user, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Here you would typically integrate with the DUPR API
    // For now, we'll just update the profile to indicate it's connected

    const { data, error: updateError } = await supabase
      .from('profiles')
      .update({ dupr_connected: true })
      .eq('user_id', user.id)
      .select();
    
    if (updateError) throw updateError;
    
    res.status(200).json({ message: 'DUPR connected successfully', profile: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};