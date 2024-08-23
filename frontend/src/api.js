// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

export const signup = async (userData) => {
  const response = await api.post('/user/signup', userData)
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/user/login', { email, password })
  return response.data
}

export const getProfile = async () => {
  const response = await api.get('/user/profile')
  return response.data
}

export const connectDUPR = async () => {
  const response = await api.post('/user/connect-dupr')
  return response.data
}

export const createTournament = async (tournamentData) => {
  const response = await api.post('/event/tournament', tournamentData)
  return response.data
}

export const getTournaments = async () => {
  const response = await api.get('/event/tournaments')
  return response.data
}

export const createClub = async (clubData) => {
  const response = await api.post('/event/club', clubData)
  return response.data
}

export const getClubs = async () => {
  const response = await api.get('/event/clubs')
  return response.data
}

export const createLeague = async (leagueData) => {
  const response = await api.post('/event/league', leagueData)
  return response.data
}

export const getLeagues = async () => {
  const response = await api.get('/event/leagues')
  return response.data
}

export const signUpForEvent = async (eventData) => {
  const response = await api.post('/event/signup', eventData)
  return response.data
}