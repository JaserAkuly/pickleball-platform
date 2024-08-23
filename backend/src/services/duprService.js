// src/services/duprService.js
const axios = require('axios');

const DUPR_API_URL = process.env.DUPR_API_URL;
const DUPR_CLIENT_KEY = process.env.DUPR_CLIENT_KEY;
const DUPR_CLIENT_SECRET = process.env.DUPR_CLIENT_SECRET;

let accessToken = null;
let tokenExpiration = null;

const getAccessToken = async () => {
  if (accessToken && tokenExpiration > Date.now()) {
    return accessToken;
  }

  const auth = Buffer.from(`${DUPR_CLIENT_KEY}:${DUPR_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(`${DUPR_API_URL}/auth/v1.0/token`, null, {
      headers: {
        'x-authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error('Error getting DUPR access token:', error);
    throw error;
  }
};

exports.updateRatings = async (matchData) => {
  try {
    const token = await getAccessToken();
    const response = await axios.post(`${DUPR_API_URL}/v1.0/matches`, matchData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating DUPR ratings:', error);
    throw error;
  }
};

exports.getPlayerRating = async (playerId) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${DUPR_API_URL}/v1.0/players/${playerId}/rating`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching player rating:', error);
    throw error;
  }
};